package com.b208.dduishu.domain.runningRecord.service;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDetail;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.runningRecordDistance.document.RunningRecordDistance;
import com.b208.dduishu.domain.runningRecordDistance.repository.RunningRecordDistanceRepository;
import com.b208.dduishu.domain.runningRecordHeartRate.repository.RunningRecordHeartRateRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class RunningRecordService {

    private static final String FIND_MY_RECORD = "me";
    private static final String FIND_FOLLOWER_RECORD = "follow";
    private final GetUser getUser;
    private final RunningRecordRepository runningRecordRepository;
    private final UserRepository userRepository;
    private final CharacterRepository characterRepository;
    @Transactional
    public void createRunningRecord(RunningRecordInfo req) {
        saveRunningRecord(req);
    }

    public void saveRunningRecord(RunningRecordInfo req) {
        // user, character, rivalRunningRecord 가져오기
        User user = userRepository.findByUserId(req.getUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Character character = characterRepository.findById(req.getCharacterId()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        RunningRecord rivalRunningRecord = null;
        if (req.getRivalRecordId() != null) {
            rivalRunningRecord = runningRecordRepository.findById(req.getRivalRecordId()).orElseThrow(() -> {
                throw new NullPointerException();
            });
        }
        // .totalTime(10)
        // .totalDistance(100)
        // .averageSpeed(0)
        // .averageCalory(0)

        // 총 시간, 총 이동거리, 평균 속도, 평균 칼로리 계싼
        user.addCumulativeDistance(1111);

        // 경험치 정산
        user.addExp(10);

        // 포인트 정산
        user.addPoint(100);

        // dto to entity
        RunningRecord res = req.toRunningRecord(user, character, rivalRunningRecord);

        // runningRecord 저장
        runningRecordRepository.save(res);

    }

    public List<RunningRecordOverview> getRunningRecordFor30Days(String type, Long userId) {

        User user = getUser.getUser();

        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findByCreatedAtGreaterThanEqualAndUserUserId(thirtyDaysAgo, user.getUserId());
        } else {
            res = runningRecordRepository.findByCreatedAtGreaterThanEqualAndUserUserId(thirtyDaysAgo, userId);
        }
        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10RecentRunningRecord(String type, Long userId) {

        User user = getUser.getUser();
        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByCreatedAtLessThanEqualAndUserUserIdOrderByCreatedAtDesc(LocalDateTime.now(), user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByCreatedAtLessThanEqualAndUserUserIdOrderByCreatedAtDesc(LocalDateTime.now(), userId);
        }
        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10TimeRunningRecord(String type, Long userId) {
        User user = getUser.getUser();

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalTimeDesc(user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalTimeDesc(userId);
        }

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10DistanceRunningRecord(String type, Long userId) {
        User user = getUser.getUser();

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalDistanceDesc(user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalDistanceDesc(userId);
        }

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10SpeedRunningRecord(String type, Long userId) {
        User user = getUser.getUser();

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByAverageSpeedDesc(user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByAverageSpeedDesc(userId);
        }

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public RunningRecordDetail getRunningRecordDetail(ObjectId id) {

        System.out.println(id);

        RunningRecord res = runningRecordRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        System.out.println(res.getId());

        return RunningRecordDetail.builder()
                .id(res.getId())
                .user(res.getUser())
                .character(res.getCharacter())
                .rivalRecord(res.getRivalRecord())
                .type(res.getType())
                .runningRecordDistanceInfos(res.getRunningRecordDistanceInfos())
                .runningRecordHeartRateInfos(res.getRunningRecordHeartRateInfos())
                .totalTime(res.getTotalTime())
                .totalDistance(res.getTotalDistance())
                .averageSpeed(res.getAverageSpeed())
                .averageCalory(res.getAverageCalory())
                .createdAt(res.getCreatedAt())
                .build();
    }


//    private void saveRunningRecordDistance(RunningRecordInfo req) {
//        List<RunningRecordDistance> collect = req.getRunningRecordDistanceInfos()
//                .stream()
//                .map(o -> {
//                    return RunningRecordDistance.builder()
//                            .second(o.getSecond())
//                            .distance(o.getDistance())
//                            .build();
//                })
//                .collect(toList());
//        // 초당 움직인 거리 뭉탱이 저장
//        runningRecordDistanceRepository.saveAll(collect);
//    }

}
