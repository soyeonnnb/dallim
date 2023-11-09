package com.b208.dduishu.domain.runningRecord.document;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.runningRecord.dto.CharacterRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RivalRunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverallInfo;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "runningRecord")
@ToString
public class RunningRecord {

    @Id
    private ObjectId id;

    @Enumerated(EnumType.STRING)
    private WatchOrMobile watchOrMobile;
    private String location;
    private UserInfo user;
    private CharacterRecordInfo character;
    private RunningType type;
    private RivalRunningRecordInfo rivalRecord;
    private List<RunningRecordOverallInfo> runningRecordInfos;

    private List<Double> secondPerSpeed;
    private HeartRateInfo heartRate;
    private PaceInfo pace;

    private double stepCount;
    private double averagePace;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private double averageHeartRate;
    private LocalDateTime createdAt;
    private String formattedDate;
    private double initLatitude;
    private double initLongitude;

    @Builder
    public RunningRecord(UserInfo user, String location, double initLatitude, double initLongitude, WatchOrMobile watchOrMobile, List<Double> secondPerSpeed, HeartRateInfo heartRate, PaceInfo pace, CharacterRecordInfo character, LocalDateTime createdAt, double stepCount, double averagePace, double averageHeartRate, String formattedDate, RunningType type, RivalRunningRecordInfo rivalRecord, List<RunningRecordOverallInfo> runningRecordInfos, int totalTime, double totalDistance, double averageSpeed) {
        this.user = user;
        this.location = location;
        this.initLatitude = initLatitude;
        this.initLongitude = initLongitude;
        this.watchOrMobile = watchOrMobile;
        this.secondPerSpeed = secondPerSpeed;
        this.pace = pace;
        this.heartRate = heartRate;
        this.character = character;
        this.type = type;
        this.rivalRecord = rivalRecord;
        this.runningRecordInfos = runningRecordInfos;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.stepCount = stepCount;
        this.averagePace = averagePace;
        this.averageHeartRate = averageHeartRate;
        this.formattedDate = formattedDate;
        this.averageSpeed = averageSpeed;
        this.createdAt = createdAt;
    }

    private static LocalDateTime toLocalDateTime(Date date) {
        // Date를 LocalDateTime으로 변환 (서울 시간대)
        LocalDateTime localDateTime = date.toInstant()
                .atZone(ZoneId.of("Asia/Seoul"))
                .toLocalDateTime();

        System.out.println(localDateTime);

        return localDateTime;
    }
}
