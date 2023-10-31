package com.b208.dduishu.domain.runningRecord.service;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningMate.repository.RunningMateRepository;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDetail;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.entity.UserState;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

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
    private final RunningMateRepository runningMateRepository;


    @Transactional
    public void createRunningRecord(RunningRecordInfo req) {
        updateUserState(false);
        saveRunningRecord(req);
    }
    public void updateUserState(boolean run){
        if(run){
            getUser.getUser().setState(UserState.running);
        }else{
            getUser.getUser().setState(UserState.standard);
        }
    }


    @Transactional
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

        // 유저 평균 스피드 정산, 누적 운동 날짜 정산
        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserId(user.getUserId());
        AtomicReference<Float> averageSpeedSum = new AtomicReference<>((float) 0.0);
        AtomicBoolean hasRunningRecord = new AtomicBoolean(false);
        findRunningRecord.stream()
                .forEach(o -> {
                    if (LocalDateTime.now().toLocalDate().equals(o.getCreatedAt().toLocalDate())) {
                        hasRunningRecord.set(true);
                    }
                    averageSpeedSum.updateAndGet(v -> new Float((float) (v + (o.getAverageSpeed()))));
                });
        if (hasRunningRecord.get() == false) {
            user.addCumulativeDay(1);
        }
        if (findRunningRecord.size() == 0) {
            user.updateAverageSpeed(req.getAverageSpeed());
        } else {
            user.updateAverageSpeed(averageSpeedSum.get()/findRunningRecord.size());
        }

        // 유저 누적시간, 누적이동거리, 누적칼로리 계산
        user.addCumulativeDistance(req.getTotalDistance());
        user.addCumulativeRunningTime(req.getTotalTime());
        //user.addCumulativeCalorie(req.);

        // 경험치 정산 - 이동거리
        character.getCharacterLevel().addExp(req.getTotalDistance());
        user.getUserLevel().addExp(req.getTotalDistance());

        // 포인트 정산 - 이동 거리 + a
        user.addPoint(req.getTotalDistance());

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

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o, findRunningMates))
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

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o, findRunningMates))
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

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o, findRunningMates))
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

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o, findRunningMates))
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

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new RunningRecordOverview(o, findRunningMates))
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
                .runningRecordInfos(res.getRunningRecordInfos())
                .totalTime(res.getTotalTime())
                .totalDistance(res.getTotalDistance())
                .averageSpeed(res.getAverageSpeed())
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
