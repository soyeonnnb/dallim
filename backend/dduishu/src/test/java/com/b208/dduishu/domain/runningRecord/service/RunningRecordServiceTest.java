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

        int size = 7431;
        List<RunningRecordOverallInfo> runningRecordOverallInfos = new ArrayList<>();
        Random random = new Random();

        double distance = 0.0;

        for (int i = 0; i < size; i++) {
            double randomDistance = random.nextDouble() * 5 + 0.4; // 0 ~ 2 사이의 랜덤한 실수값 생성
            BigDecimal formattedRandomDistance = new BigDecimal(randomDistance).setScale(2, RoundingMode.HALF_UP);
            double distanceChange = formattedRandomDistance.doubleValue();

            distance += distanceChange;

            BigDecimal formattedDistance = new BigDecimal(distance).setScale(2, RoundingMode.HALF_UP);

            // distance가 증가할수록 speed와 heartRate도 증가하도록 모델링
            double speed = distanceChange;
            int heartRate = (int) (80 + (distanceChange * 10));

            double pace = (1000 / speed);
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
                    .state(state)
                    .distance(formattedDistance.doubleValue())
                    .latitude(36.355172)
                    .longitude(127.2979108)
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

        List<Double> secondPerSpeed = runningRecordInfo.getSecondPerSpeed(reducedRunningRecordOverallInfos);
        PaceInfo paceInfo = runningRecordInfo.getPaceInfo(reducedRunningRecordOverallInfos);
        HeartRateInfo heartRateInfo = runningRecordInfo.getHeartRateInfo(reducedRunningRecordOverallInfos);

        User user = userRepository.findByUserId(6L).orElse(null);
        Character character = characterRepository.findById(5L).orElse(null);
        Planet planet = planetRepository.findById(6L).orElse(null);
        UserInfo userInfo = new UserInfo(user);
        CharacterRecordInfo characterInfo = new CharacterRecordInfo(character,planet);

        RunningRecord rivalRecord = runningRecordRepository.findById(new ObjectId("6549f07f0b2dfc24659823df")).orElse(null);
        RivalRunningRecordInfo rivalRunningRecordInfo = new RivalRunningRecordInfo(rivalRecord);

        RunningRecord res = RunningRecord.builder()
                .watchOrMobile(WatchOrMobile.MOBILE)
                .location("대전 유성구 덕명동")
                .user(userInfo)
                .character(characterInfo)
                .type(RunningType.PAIR)
                .rivalRecord(rivalRunningRecordInfo)
                .runningRecordInfos(reducedRunningRecordOverallInfos)
                .secondPerSpeed(secondPerSpeed)
                .pace(paceInfo)
                .heartRate(heartRateInfo)
                .stepCount(0)
                .averagePace(averagePace.doubleValue())
                .totalTime(totalTime)
                .totalDistance(totalDistance.doubleValue())
                .averageSpeed(averageSpeed.doubleValue())
                .averageHeartRate(averageHeartRate.doubleValue())
                .createdAt(new Date())
                .build();

        runningRecordRepository.save(res);

    }
}