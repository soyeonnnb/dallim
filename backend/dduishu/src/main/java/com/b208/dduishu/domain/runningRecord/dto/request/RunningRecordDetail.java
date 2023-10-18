package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordDetail {

    private ObjectId id;
    private User user;
    private Character character;
    private RunningType type;
    private RunningRecord rivalRecord;
    private List<RunningRecordDistanceInfo> runningRecordDistanceInfos;
    private List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos;
    private int totalTime;
    private int totalDistance;
    private int averageSpeed;
    private int averageCalory;
    private LocalDateTime createdAt;

    @Builder
    public RunningRecordDetail(ObjectId id, User user, Character character, RunningType type, RunningRecord rivalRecord, List<RunningRecordDistanceInfo> runningRecordDistanceInfos, List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos, int totalTime, int totalDistance, int averageSpeed, int averageCalory, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.character = character;
        this.type = type;
        this.rivalRecord = rivalRecord;
        this.runningRecordDistanceInfos = runningRecordDistanceInfos;
        this.runningRecordHeartRateInfos = runningRecordHeartRateInfos;
        this.totalTime = totalTime;
        this.totalDistance = totalDistance;
        this.averageSpeed = averageSpeed;
        this.averageCalory = averageCalory;
        this.createdAt = createdAt;
    }
}
