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
    private Long characterIndex;
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
    public RunningRecordInfo(Long userId, WatchOrMobile watchOrMobile, LocalDateTime date, String formattedDate, Long characterIndex, RunningType type, ObjectId rivalRecordId, int totalTime, double totalDistance, double averageSpeed, double averageHeartRate, double averagePace, double stepCount, double initLatitude, double initLongitude, WinOrLose winOrLose, List<RunningRecordOverallInfo> runningRecordInfos) {
        this.userId = userId;
        this.watchOrMobile = watchOrMobile;
        this.date = date;
        this.formattedDate = formattedDate;
        this.characterIndex = characterIndex;
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
                .location(addressName)
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
}
