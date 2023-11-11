package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.rawRunningRecord.document.RawRunningRecord;
import com.b208.dduishu.domain.runningRecord.document.*;
import com.b208.dduishu.domain.runningRecord.dto.CharacterRecordInfo;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.character.entity.Character;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
public class RunningRecordInfo {

    private static final double SLOW_WALK_THRESHOLD = (double) 6000 / 3600;
    private static final double FAST_WALK_THRESHOLD = (double) 9000 / 3600;

    private static final double HEART_RATE_SECTION_1 = 136;
    private static final double HEART_RATE_SECTION_2 = 150;
    private static final double HEART_RATE_SECTION_3 = 162;
    private static final double HEART_RATE_SECTION_4 = 175;


    private Long userId;
    private WatchOrMobile watchOrMobile;
    private LocalDateTime date;
    private String formattedDate;
    private Long characterId;
    private RunningType type;
    private ObjectId rivalRecordId;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private double averageHeartRate;
    private double averagePace;
    private double stepCount;
    private double initLatitude;
    private double initLongitude;
    private WinOrLose winOrLose;

    @Builder
    public RunningRecordInfo(Long userId, WatchOrMobile watchOrMobile, LocalDateTime date, String formattedDate, Long characterId, RunningType type, ObjectId rivalRecordId, int totalTime, double totalDistance, double averageSpeed, double averageHeartRate, double averagePace, double stepCount, double initLatitude, double initLongitude, WinOrLose winOrLose, List<RunningRecordOverallInfo> runningRecordInfos) {
        this.userId = userId;
        this.watchOrMobile = watchOrMobile;
        this.date = date;
        this.formattedDate = formattedDate;
        this.characterId = characterId;
        this.type = type;
        this.rivalRecordId = rivalRecordId;
        this.totalTime = totalTime;
        this.totalDistance = totalDistance;
        this.averageSpeed = averageSpeed;
        this.averageHeartRate = averageHeartRate;
        this.averagePace = averagePace;
        this.stepCount = stepCount;
        this.initLatitude = initLatitude;
        this.initLongitude = initLongitude;
        this.winOrLose = winOrLose;
        this.runningRecordInfos = runningRecordInfos;
    }

    private List<RunningRecordOverallInfo> runningRecordInfos;

        public RawRunningRecord toWatchRunningRecord(RunningRecord runningRecord, RunningRecordInfo req) {
            List<Double> distances = req.getRunningRecordInfos().stream()
                    .map(o -> o.getDistance())
                    .collect(toList());

            return RawRunningRecord.builder()
                    .runningRecordId(runningRecord.getId().toString())
                    .averagePace(runningRecord.getAveragePace())
                    .totalTime(runningRecord.getTotalTime())
                    .runningRecordInfos(distances)
                    .build();
        }

        public RunningRecord toRunningRecord(User user, Planet planet, String addressName, Character character, RunningRecord rivalRecord){

        UserInfo userInfo = new UserInfo(user);
        CharacterRecordInfo characterInfo = new CharacterRecordInfo(character, planet);
        RivalRunningRecordInfo rivalRunningRecordInfo = null;
        if (rivalRecord != null) {
            rivalRunningRecordInfo = new RivalRunningRecordInfo(rivalRecord);
        }

        List<RunningRecordOverallInfo> runningRecordOverallInfos = this.runningRecordInfos;

        int targetSize = 200; // 줄이고 싶은 개수 (200개로 설정)
        int step = runningRecordOverallInfos.size() > targetSize ? (int) Math.floor(runningRecordOverallInfos.size() / targetSize) : 1;

        List<RunningRecordOverallInfo> reducedRunningRecordOverallInfos = IntStream.range(0, runningRecordOverallInfos.size())
                .filter(i -> i % step == 0 || i == runningRecordOverallInfos.size() - 1) // 규칙적인 간격으로 필터링
                .mapToObj(runningRecordOverallInfos::get) // 인덱스를 기반으로 요소 가져오기
                .collect(toList());

        RunningRecord build = RunningRecord.builder()
                .user(userInfo)
                .watchOrMobile(this.watchOrMobile)
//                .pace(pace)
                .location(addressName)
//                .heartRate(heartRate)
//                .secondPerSpeed(secondPerSpeed)
                .character(characterInfo)
                .type(this.type)
                .rivalRecord(rivalRunningRecordInfo)
                .runningRecordInfos(reducedRunningRecordOverallInfos)
                .totalTime(this.totalTime)
                .totalDistance(this.totalDistance)
                .averageSpeed(this.averageSpeed)
                .averagePace(this.averagePace)
                .averageHeartRate(this.averageHeartRate)
                .createdAt(this.date)
                .formattedDate(this.formattedDate)
                .winOrLose(this.winOrLose)
                .build();

        return build;
    }

    public HeartRateInfo getHeartRateInfo(List<RunningRecordOverallInfo> runningRecordInfos) {
        Integer[] heartRate = {0, 0, 0, 0, 0}; // 각 속도 범주에 대한 초를 계산하기 위한 배열

        runningRecordInfos.forEach(record -> {
            double heartRatePerMinute = record.getHeartRate(); // getSpeed()가 km/h 단위의 속도를 반환한다고 가정

            if (heartRatePerMinute < HEART_RATE_SECTION_1) {
                heartRate[0]++;
            } else if (heartRatePerMinute < HEART_RATE_SECTION_2) {
                heartRate[1]++;
            } else if (heartRatePerMinute < HEART_RATE_SECTION_3) {
                heartRate[2]++;
            } else if (heartRatePerMinute < HEART_RATE_SECTION_4) {
                heartRate[3]++;
            } else {
                heartRate[4]++;
            }
        });

        HeartRateInfo heartRateInfo = new HeartRateInfo();

        double averageHeartRate = runningRecordInfos.stream()
                .filter(record -> record.getHeartRate() != 0.0)
                .mapToDouble(RunningRecordOverallInfo::getHeartRate)
                .average()
                .orElse(0);
        BigDecimal formattedAverage = new BigDecimal(averageHeartRate).setScale(2, RoundingMode.HALF_UP);

        heartRateInfo.setAverageHeartRate(formattedAverage.doubleValue());
        heartRateInfo.setMaxHeartRate(runningRecordInfos.stream().mapToDouble(RunningRecordOverallInfo::getHeartRate).max().orElse(0));
        heartRateInfo.setSecondPerHeartRateSection(Arrays.asList(heartRate));

        return heartRateInfo;
    }

    public PaceInfo getPaceInfo(List<RunningRecordOverallInfo> runningRecordInfos) {
        List<PaceSectionInfo> sectionPaces = new ArrayList<>();
        PaceSectionInfo currentSection = new PaceSectionInfo();
        double nextSectionDistance = 1000.0; // 다음 구간까지의 거리

        for (RunningRecordOverallInfo record : runningRecordInfos) {
            double currentDistance = record.getDistance();

            if (currentDistance >= nextSectionDistance) {
                // 현재 레코드가 새로운 구간의 끝을 나타냄
                currentSection.setFinishTime(record.getSecond());
                currentSection.setPace(currentSection.getFinishTime() - currentSection.getStartTime());
                sectionPaces.add(currentSection);

                // 새로운 구간을 시작
                currentSection = new PaceSectionInfo();
                currentSection.setStartTime(record.getSecond());

                // 다음 구간 거리 업데이트
                nextSectionDistance += 1000.0;
            }
        }

        // 마지막 구간 추가 (스트림이 끝났을 때 마지막 구간을 처리)
        if (currentSection.getStartTime() != runningRecordInfos.get(runningRecordInfos.size() - 1).getSecond()) {
            RunningRecordOverallInfo lastRecord = runningRecordInfos.get(runningRecordInfos.size() - 1);

            currentSection.setFinishTime(lastRecord.getSecond());

            double actualDistance = lastRecord.getDistance() - (nextSectionDistance - 1000.0);

            int timeSpentInSeconds = currentSection.getFinishTime() - currentSection.getStartTime();

            double paceInSecondsPerKm = (timeSpentInSeconds / actualDistance) * 1000.0;

            BigDecimal pace = new BigDecimal(paceInSecondsPerKm);
            pace = pace.setScale(2, RoundingMode.HALF_UP); // 소수점 두 자리까지 반올림
            currentSection.setPace(pace.doubleValue()); // double 값으로 설정

            sectionPaces.add(currentSection);
        }


        PaceInfo paceInfo = new PaceInfo();

        double averagePace = ( this.totalTime / this.totalDistance ) * 1000.0;
        BigDecimal formattedAverage = new BigDecimal(averagePace).setScale(2, RoundingMode.HALF_UP);

        paceInfo.setAveragePace(formattedAverage.doubleValue());
        paceInfo.setMaxPace(sectionPaces.stream().mapToDouble(PaceSectionInfo::getPace).min().orElse(0));
        paceInfo.setSection(sectionPaces);

        return paceInfo;
    }

    public List<Double> getSecondPerSpeed(List<RunningRecordOverallInfo> runningRecordInfos) {
        Double[] secondPerSpeed = {0.0, 0.0, 0.0}; // 각 속도 범주에 대한 초를 계산하기 위한 배열

        for (int i = 1; i < runningRecordInfos.size(); i++) {
            RunningRecordOverallInfo currentRecord = runningRecordInfos.get(i);
            RunningRecordOverallInfo previousRecord = runningRecordInfos.get(i - 1);

            double speedKmH = currentRecord.getSpeed(); // getSpeed()가 km/h 단위의 속도를 반환한다고 가정

            // 현재 레코드와 이전 레코드의 cumulativeDistance 차이를 구하여 해당 속도 범주의 초에 설정
            double distanceDifference = currentRecord.getDistance() - previousRecord.getDistance();

            if (speedKmH < SLOW_WALK_THRESHOLD) {
                secondPerSpeed[0] += distanceDifference;
            } else if (speedKmH < FAST_WALK_THRESHOLD) {
                secondPerSpeed[1] += distanceDifference;
            } else {
                secondPerSpeed[2] += distanceDifference;
            }
        }

        return Arrays.stream(secondPerSpeed)
                .map(speed -> new BigDecimal(speed).setScale(1, RoundingMode.HALF_UP))
                .map(o -> o.doubleValue())
                .collect(toList());
    }
}
