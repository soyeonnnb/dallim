package com.b208.dduishu.domain.runningRecord.service;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.repository.PlanetRepository;
import com.b208.dduishu.domain.runningRecord.document.*;
import com.b208.dduishu.domain.runningRecord.dto.CharacterRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RivalRunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverallInfo;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.entity.UserLevel;
import com.b208.dduishu.domain.user.repository.UserRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Random;
import java.util.stream.IntStream;

@SpringBootTest
class RunningRecordServiceTest {

    @Autowired
    private RunningRecordRepository runningRecordRepository;

    @Autowired
    private CharacterRepository characterRepository;

    @Autowired
    private PlanetRepository planetRepository;

    @Autowired
    private UserRepository userRepository;
    @Test
    void saveRunningRecord() {

        int size = 14400 * 5;
        List<RunningRecordOverallInfo> runningRecordOverallInfos = new ArrayList<>();
        Random random = new Random();

        double distance = 0.0;
        double lastSpeed = 2; // 초기 속도 설정
        double lastHeartRate = 100;

        for (int i = 0; i < size; i++) {
            // 속도 변경을 더 부드럽게 만들기 위해 이전 속도에 랜덤 값을 일부만 혼합
            double randomChange = (random.nextDouble() - 0.5) * 0.1; // -0.05 ~ 0.05 사이의 변화량
            BigDecimal formattedRandomDistance = new BigDecimal(randomChange).setScale(2, RoundingMode.HALF_UP);
            double distanceChange = formattedRandomDistance.doubleValue();
            double heartRateChange = randomChange * 20; // 속도 변화량에 20을 곱하여 심박수 변화량을 결정

            double speed = lastSpeed + distanceChange;
            double heartRate = lastHeartRate + heartRateChange;

            // 속도가 0 이하가 되지 않도록 하고, 5를 초과하지 않도록 조정
            speed = Math.max(0, Math.min(5, speed));
            heartRate = Math.max(60, Math.min(180, heartRate));

            lastSpeed = speed; // 다음 루프를 위해 마지막 속도 업데이트
            lastHeartRate = heartRate;

            distance += speed;

            BigDecimal formattedDistance = new BigDecimal(distance).setScale(2, RoundingMode.HALF_UP);

//            // distance가 증가할수록 speed와 heartRate도 증가하도록 모델링
//            double speed = distanceChange;
//            int heartRate = (int) (80 + (distanceChange * 100));

            double pace = 0.0;
            if ( speed != 0) {
                pace = (1000 / speed);
            }

            BigDecimal formattedPace = new BigDecimal(pace).setScale(2, RoundingMode.HALF_UP);
            double formattedPaceVal = formattedPace.doubleValue();

            RunningState state = null;
            if (speed <= 0.4) {
                state = RunningState.STOP;
            } else if (speed <= 1.5) {
                state = RunningState.WALK;
            } else if (speed <= 3.0) {
                state = RunningState.RACEWALK;
            } else {
                state = RunningState.RUN;
            }

            RunningRecordOverallInfo info = RunningRecordOverallInfo.builder()
                    .second(i)
                    .heartRate(heartRate)
                    .pace(formattedPaceVal)
                    .speed(speed)
                    .distance(formattedDistance.doubleValue())
                    .build();
            runningRecordOverallInfos.add(info);
        }

        int targetSize = 200; // 줄이고 싶은 개수 (200개로 설정)
        int step = (int) Math.floor(runningRecordOverallInfos.size() / targetSize);
        int totalTime = size;

        List<RunningRecordOverallInfo> reducedRunningRecordOverallInfos = IntStream.range(0, runningRecordOverallInfos.size())
                .filter(i -> i % step == 0 || i == runningRecordOverallInfos.size() - 1) // 규칙적인 간격으로 필터링
                .mapToObj(runningRecordOverallInfos::get) // 인덱스를 기반으로 요소 가져오기
                .collect(toList());
        size = reducedRunningRecordOverallInfos.size();

//        List<RunningRecordOverallInfo> reducedRunningRecordOverallInfos = runningRecordOverallInfos;

        BigDecimal totalDistance = new BigDecimal(reducedRunningRecordOverallInfos.get(size-1).getDistance()).setScale(2, RoundingMode.HALF_UP);
        BigDecimal averageSpeed = new BigDecimal(reducedRunningRecordOverallInfos.stream()
                .mapToDouble(RunningRecordOverallInfo::getSpeed).average().orElse(0.0)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal averageHeartRate = new BigDecimal(reducedRunningRecordOverallInfos.stream()
                .mapToDouble(RunningRecordOverallInfo::getHeartRate).average().orElse(0.0)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal averagePace = new BigDecimal(reducedRunningRecordOverallInfos.stream()
                .mapToDouble(RunningRecordOverallInfo::getPace).average().orElse(0.0)).setScale(2, RoundingMode.HALF_UP);

        RunningRecordInfo runningRecordInfo = new RunningRecordInfo();
        runningRecordInfo.setTotalTime(totalTime);
        runningRecordInfo.setTotalDistance(totalDistance.doubleValue());

//        List<Double> secondPerSpeed = runningRecordInfo.getSecondPerSpeed(reducedRunningRecordOverallInfos);
//        PaceInfo paceInfo = runningRecordInfo.getPaceInfo(reducedRunningRecordOverallInfos);
//        HeartRateInfo heartRateInfo = runningRecordInfo.getHeartRateInfo(reducedRunningRecordOverallInfos);

        User user = userRepository.findByUserId(20L).orElse(null);
        Character character = characterRepository.findById(32L).orElse(null);
        Planet planet = planetRepository.findById(47L).orElse(null);
        UserInfo userInfo = new UserInfo(user);
        CharacterRecordInfo characterInfo = new CharacterRecordInfo(character,planet);

//        RunningRecord rivalRecord = runningRecordRepository.findById(new ObjectId("654ce890ee843068f886b2a1")).orElse(null);
//        RivalRunningRecordInfo rivalRunningRecordInfo = new RivalRunningRecordInfo(rivalRecord);

        RunningRecord res = RunningRecord.builder()
                .watchOrMobile(WatchOrMobile.MOBILE)
                .location("대전 유성구 덕명동")
                .user(userInfo)
                .character(characterInfo)
                .type(RunningType.ALONE)
                .rivalRecord(null)
                .runningRecordInfos(reducedRunningRecordOverallInfos)
//                .secondPerSpeed(secondPerSpeed)
//                .pace(paceInfo)
//                .heartRate(heartRateInfo)
                .averagePace(averagePace.doubleValue())
                .totalTime(totalTime)
                .totalDistance(totalDistance.doubleValue())
                .averageSpeed(averageSpeed.doubleValue())
                .averageHeartRate(averageHeartRate.doubleValue())
                .createdAt(LocalDateTime.now())
                .build();

        runningRecordRepository.save(res);

    }
}