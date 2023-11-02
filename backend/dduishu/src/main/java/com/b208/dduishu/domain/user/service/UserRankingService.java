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

import java.time.*;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class UserRankingService {

    private final UserRepository userRepository;
    private final GetUser getUser;
    private final RunningRecordRepository runningRecordRepository;

    public List<RunningRecord> findRunningRecord(List<User> users) {

        List<Long> userIds =  users.stream()
                .map(User::getUserId)
                .collect(toList());

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfWeek = now.minusWeeks(1).with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY)).with(LocalTime.MIN);
        LocalDateTime endOfWeek = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY)).with(LocalTime.MAX);
        LocalDateTime[] weekRange =  new LocalDateTime[]{startOfWeek, endOfWeek};

        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserIdInAndCreatedAtBetween(userIds,weekRange[0],weekRange[1]);

        return findRunningRecord;
    }

    public Map<Long, User> getUserInfoMap(List<User> users) {
        return users.stream()
                .collect(Collectors.toMap(User::getUserId, record -> record));
    }

    public Map<Long, UserRankingInfo> computeUserRankingInfo(List<RunningRecord> findRunningRecord, Map<Long, User> users, List<User> findFollower) {
        return findRunningRecord.stream()
                .collect(Collectors.toMap(
                        record -> record.getUser().getUserId(),
                        record -> computeRankingInfoForUser(record, users, findFollower),
                        (existingInfo, newRecord) -> updateExistingInfoWithNewRecord(existingInfo, newRecord)
                ));
    }

    private UserRankingInfo computeRankingInfoForUser(RunningRecord record, Map<Long, User> users, List<User> findFollower) {
        User user = users.get(record.getUser().getUserId());
        if (findFollower == null) {
            return new UserRankingInfo(record, user);
        } else {
            return new UserRankingInfo(record, user, findFollower);
        }
    }

    private UserRankingInfo updateExistingInfoWithNewRecord(UserRankingInfo existingInfo, UserRankingInfo newRecord) {
        existingInfo.setCumulativeDistance(existingInfo.getCumulativeDistance() + newRecord.getCumulativeDistance());
        return existingInfo;
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

        int[] currentMonthAndWeek = getCurrentMonthAndWeek();

        return AllUserRankingInfo.builder()
                .month(currentMonthAndWeek[0])
                .week(currentMonthAndWeek[1])
                .rankingInfos(rankingInfos)
                .build();
    }

    private int[] getCurrentMonthAndWeek() {
        LocalDateTime now = LocalDateTime.now();
        int month = now.getMonthValue();
        LocalDate firstDayOfMonth = LocalDate.of(now.getYear(), month, 1);
        int week = (now.getDayOfMonth() - firstDayOfMonth.getDayOfMonth()) / 7 + 1;
        return new int[]{month, week};
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
        int[] currentMonthAndWeek = getCurrentMonthAndWeek();

        return AllUserRankingInfo.builder()
                .month(currentMonthAndWeek[0])
                .week(currentMonthAndWeek[1])
                .rankingInfos(rankingInfos)
                .build();
    }

}
