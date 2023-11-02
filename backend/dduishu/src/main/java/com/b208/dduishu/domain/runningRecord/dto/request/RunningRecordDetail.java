package com.b208.dduishu.domain.runningRecord.dto.request;


import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.runningRecord.document.HeartRateInfo;
import com.b208.dduishu.domain.runningRecord.document.PaceInfo;
import com.b208.dduishu.domain.runningRecord.document.RunningType;
import com.b208.dduishu.domain.runningRecord.dto.CharacterRecordInfo;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordDetail {

    private String id;
    private String location;
    private List<Integer> secondPerSpeed;
    private HeartRateInfo heartRate;
    private PaceInfo pace;
    private double stepCount;
    private UserInfo user;
    private CharacterRecordInfo character;
    private RunningType type;
    private RivalRunningRecordInfo rivalRecord;
    private List<RunningRecordOverallInfo> runningRecordInfos;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private int averageCalory;
    private LocalDateTime createdAt;

    @Builder
    public RunningRecordDetail(ObjectId id, String location, List<Integer> secondPerSpeed, HeartRateInfo heartRate, PaceInfo pace, double stepCount, UserInfo user, CharacterRecordInfo character, RunningType type, RivalRunningRecordInfo rivalRecord, List<RunningRecordOverallInfo> runningRecordInfos, int totalTime, double totalDistance, double averageSpeed, int averageCalory, LocalDateTime createdAt) {
        this.id = id.toString();
        this.location = location;
        this.secondPerSpeed = secondPerSpeed;
        this.heartRate = heartRate;
        this.pace = pace;
        this.stepCount = stepCount;
        this.user = user;
        this.character = character;
        this.type = type;
        this.rivalRecord = rivalRecord;
        this.runningRecordInfos = runningRecordInfos;
        this.totalTime = totalTime;
        this.totalDistance = totalDistance;
        this.averageSpeed = averageSpeed;
        this.averageCalory = averageCalory;
        this.createdAt = createdAt;
    }
}
