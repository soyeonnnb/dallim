package com.b208.dduishu.domain.user.service;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.dto.request.UserRankingInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.S3.service.S3UploadService;
import com.b208.dduishu.util.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class UserRankingService {

    private final UserRepository userRepository;
    private final GetUser getUser;
    private final RunningRecordRepository runningRecordRepository;

    public List<UserRankingInfo> getWeeklyRankingWithAll(int year, int month, int week) {
        List<User> res = userRepository.findAll();
        Map<Long, User> users = new HashMap<>();
        res.stream()
                .forEach(o -> {
                    users.put(o.getUserId(), o);
                });

        List<Long> userIds = res
                .stream()
                .map(o -> {
                    return o.getUserId();
                })
                .collect(toList());

        // 나 + 모든 유저 달리기 기록 가져오기
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        start = start.with(TemporalAdjusters.firstInMonth(start.getDayOfWeek()));
        start = start.plusWeeks(week - 1);

        LocalDateTime end = start.plusWeeks(1);

        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserIdInAndCreatedAtBetween(userIds,start,end);

        Map<Long, UserRankingInfo> userIdToInfoMap = new HashMap<>();

        findRunningRecord.forEach(record -> {
            Long userId = record.getUser().getUserId();
            UserRankingInfo userRankingInfo = userIdToInfoMap.get(userId);

            if (userRankingInfo == null) {
                // userId가 없는 경우, 새 UserRankingInfo 객체를 만들어 Map에 추가
                User user = users.get(record.getUser().getUserId());
                userRankingInfo = new UserRankingInfo(record, user);
                userIdToInfoMap.put(userId, userRankingInfo);
            } else {
                // userId가 있는 경우, cumulativeDistance를 업데이트
                userRankingInfo.setCumulativeDistance(userRankingInfo.getCumulativeDistance() + record.getTotalDistance());
            }
        });

        List<UserRankingInfo> resultList = new ArrayList<>(userIdToInfoMap.values());
        resultList.sort(Comparator.comparing(UserRankingInfo::getCumulativeDistance).reversed());
        return resultList;

    }

    public List<UserRankingInfo> getWeeklyRankingWithFollower(int year, int month, int week) {

        User user = getUser.getUser();

        List<User> res = userRepository.getUserIdAndFollowerId(user.getUserId());
        Map<Long, User> users = new HashMap<>();
        res.stream()
                .forEach(o -> {
                    users.put(o.getUserId(), o);
                });

        List<Long> userIds = res
                .stream()
                .map(o -> {
                    return o.getUserId();
                })
                .collect(toList());

        // 나 + 팔로워 달리기 기록 가져오기
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        start = start.with(TemporalAdjusters.firstInMonth(start.getDayOfWeek()));
        start = start.plusWeeks(week - 1);

        LocalDateTime end = start.plusWeeks(1);

        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserIdInAndCreatedAtBetween(userIds,start,end);

        Map<Long, UserRankingInfo> userIdToInfoMap = new HashMap<>();

        findRunningRecord.forEach(record -> {
            Long userId = record.getUser().getUserId();
            UserRankingInfo userRankingInfo = userIdToInfoMap.get(userId);

            if (userRankingInfo == null) {
                // userId가 없는 경우, 새 UserRankingInfo 객체를 만들어 Map에 추가
                User one = users.get(record.getUser().getUserId());
                userRankingInfo = new UserRankingInfo(record, one);
                userIdToInfoMap.put(userId, userRankingInfo);
            } else {
                // userId가 있는 경우, cumulativeDistance를 업데이트
                userRankingInfo.setCumulativeDistance(userRankingInfo.getCumulativeDistance() + record.getTotalDistance());
            }
        });

        List<UserRankingInfo> resultList = new ArrayList<>(userIdToInfoMap.values());
        resultList.sort(Comparator.comparing(UserRankingInfo::getCumulativeDistance).reversed());
        return resultList;
    }

}
