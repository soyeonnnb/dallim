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
    public void createRunningRecord(RunningRecordInfo req) {
        saveRunningRecord(req);
    }

    private void saveRunningRecord(RunningRecordInfo req) {
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

        // dto to entity
        RunningRecord res = req.toRunningRecord(user, character, rivalRunningRecord);

        System.out.println(res.toString());

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

    public List<RunningRecordOverview> getTop10RecentRunningRecord() {

        User user = getUser.getUser();

        List<RunningRecord> res = runningRecordRepository.findTop10ByCreatedAtLessThanEqualAndUserUserIdOrderByCreatedAtDesc(LocalDateTime.now(), user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10TimeRunningRecord() {
        User user = getUser.getUser();

        List<RunningRecord> res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalTimeDesc(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10DistanceRunningRecord() {
        User user = getUser.getUser();

        List<RunningRecord> res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalDistanceDesc(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public List<RunningRecordOverview> getTop10SpeedRunningRecord() {
        User user = getUser.getUser();

        List<RunningRecord> res = runningRecordRepository.findTop10ByUserUserIdOrderByAverageSpeedDesc(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());
    }

    public RunningRecordDetail getRunningRecordDetail(ObjectId id) {
        RunningRecord res = runningRecordRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

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
