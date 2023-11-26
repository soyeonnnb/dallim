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

    //private double stepCount;
    private double averagePace;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private double averageHeartRate;
    private LocalDateTime createdAt;
    private String formattedDate;
    private WinOrLose winOrLose;

    @Builder
    public RunningRecord(UserInfo user, WinOrLose winOrLose, String location, WatchOrMobile watchOrMobile, CharacterRecordInfo character, LocalDateTime createdAt, double averagePace, double averageHeartRate, String formattedDate, RunningType type, RivalRunningRecordInfo rivalRecord, List<RunningRecordOverallInfo> runningRecordInfos, int totalTime, double totalDistance, double averageSpeed) {
        this.user = user;
        this.winOrLose = winOrLose;
        this.location = location;
        this.watchOrMobile = watchOrMobile;
//        this.secondPerSpeed = secondPerSpeed;
//        this.pace = pace;
//        this.heartRate = heartRate;
        this.character = character;
        this.type = type;
        this.rivalRecord = rivalRecord;
        this.runningRecordInfos = runningRecordInfos;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        //this.stepCount = stepCount;
        this.averagePace = averagePace;
        this.averageHeartRate = averageHeartRate;
        this.formattedDate = formattedDate;
        this.averageSpeed = averageSpeed;
        this.createdAt = createdAt;
    }
}
