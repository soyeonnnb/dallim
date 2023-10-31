package com.b208.dduishu.domain.user.service;

import com.b208.dduishu.domain.follow.entity.FollowState;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.dto.request.UserRankingInfo;
import com.b208.dduishu.domain.user.dto.response.AllUserRankingInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class UserRankingService {

    private final UserRepository userRepository;
    private final GetUser getUser;
    private final RunningRecordRepository runningRecordRepository;

    public List<RunningRecord> findRunningRecord(List<User> users) {

        List<Long> userIds = users
                .stream()
                .map(o -> {
                    return o.getUserId();
                })
                .collect(toList());

        // 나 + 모든 유저 달리기 기록 가져오기
        // 현재 날짜와 시간 가져오기
        LocalDateTime currentDateTime = LocalDateTime.now();
        // 현재 시간에서 7일을 뺀 LocalDateTime 계산
        LocalDateTime sevenDaysAgo = currentDateTime.minus(7, ChronoUnit.DAYS);
        // 이번 주의 시작일 (일요일) 계산
        LocalDateTime start = sevenDaysAgo.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY)).withHour(0).withMinute(0).withSecond(0);
        // 이번 주의 종료일 (토요일) 계산
        LocalDateTime end = sevenDaysAgo.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY)).withHour(23).withMinute(59).withSecond(59);

        System.out.println(sevenDaysAgo);
        System.out.println(start);
        System.out.println(end);
        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserIdInAndCreatedAtBetween(userIds,start,end);

        return findRunningRecord;
    }

    public Map<Long, User> getUserInfoMap(List<User> users) {
        Map<Long, User> ret = new HashMap<>();
        users.stream()
                .forEach(o -> {
                    ret.put(o.getUserId(), o);
                });
        return ret;
    }

    public Map<Long, UserRankingInfo> computeUserRankingInfo(List<RunningRecord> findRunningRecord, Map<Long, User> users, List<User> findFollower) {
        Map<Long, UserRankingInfo> userIdToInfoMap = new HashMap<>();
        findRunningRecord
                .stream()
                .forEach(record -> {
                    Long userId = record.getUser().getUserId();
                    UserRankingInfo userRankingInfo = userIdToInfoMap.get(userId);

                    if (userRankingInfo == null) {
                        // userId가 없는 경우, 새 UserRankingInfo 객체를 만들어 Map에 추가
                        User one = users.get(record.getUser().getUserId());
                        if (findFollower == null) {
                            userRankingInfo = new UserRankingInfo(record, one);
                        } else {
                            userRankingInfo = new UserRankingInfo(record, one, findFollower);
                        }
                        userIdToInfoMap.put(userId, userRankingInfo);
                    } else {
                        // userId가 있는 경우, cumulativeDistance를 업데이트
                        userRankingInfo.setCumulativeDistance(userRankingInfo.getCumulativeDistance() + record.getTotalDistance());
                    }
                });
        return userIdToInfoMap;
    }

    public AllUserRankingInfo getWeeklyRankingWithAll() {
        User user = getUser.getUser();
        List<User> res = userRepository.findAll();
        Map<Long, User> users = getUserInfoMap(res);

        List<RunningRecord> findRunningRecord = findRunningRecord(res);

        List<User> findFollower = userRepository.getUserByFollowerUserId(user.getUserId(), FollowState.accept);

        Map<Long, UserRankingInfo> userIdToInfoMap = computeUserRankingInfo(findRunningRecord, users, findFollower);

        List<UserRankingInfo> rankingInfos = new ArrayList<>(userIdToInfoMap.values());
        rankingInfos.sort(Comparator.comparing(UserRankingInfo::getCumulativeDistance).reversed());
        // 나 + 모든 유저 달리기 기록 가져오기
        // 현재 월 가져오기, 현재 주차 계산
        // 현재 LocalDateTime 객체 생성
        LocalDateTime now = LocalDateTime.now();

        // 현재 월 가져오기
        int month = now.getMonthValue();

        // 해당 월의 첫 번째 날짜 가져오기
        LocalDate firstDayOfMonth = LocalDate.of(now.getYear(), month, 1);

        // 현재 날짜와 첫 번째 날짜 간의 차이 계산
        int week = (now.getDayOfMonth() - firstDayOfMonth.getDayOfMonth()) / 7 + 1;

        return AllUserRankingInfo.builder()
                .month(month)
                .week(week)
                .rankingInfos(rankingInfos)
                .build();
    }

    public AllUserRankingInfo getWeeklyRankingWithFollower() {

        User user = getUser.getUser();

        List<User> res = userRepository.getUserIdAndFollowerId(user.getUserId());
        Map<Long, User> users = getUserInfoMap(res);

        List<RunningRecord> findRunningRecord = findRunningRecord(res);

        Map<Long, UserRankingInfo> userIdToInfoMap = computeUserRankingInfo(findRunningRecord, users, null);

        List<UserRankingInfo> rankingInfos = new ArrayList<>(userIdToInfoMap.values());
        rankingInfos.sort(Comparator.comparing(UserRankingInfo::getCumulativeDistance).reversed());
        // 현재 월 가져오기, 현재 주차 계산
        LocalDateTime currentDateTime = LocalDateTime.now();
        int month = currentDateTime.getMonthValue();
        LocalDate firstDayOfMonth = LocalDate.of(currentDateTime.getYear(), month, 1);
        int week = (currentDateTime.getDayOfMonth() + firstDayOfMonth.getDayOfWeek().getValue() - 2) / 7 + 1;
        return AllUserRankingInfo.builder()
                .month(month)
                .week(week)
                .rankingInfos(rankingInfos)
                .build();
    }

}
