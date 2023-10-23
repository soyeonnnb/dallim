package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordDetail {

    private String id;
    private UserInfo user;
    private CharacterInfo character;
    private RunningType type;
    private RivalRunningRecordInfo rivalRecord;
    private List<RunningRecordDistanceInfo> runningRecordDistanceInfos;
    private List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos;
    private int totalTime;
    private int totalDistance;
    private int averageSpeed;
    private int averageCalory;
    private LocalDateTime createdAt;

    @Builder
    public RunningRecordDetail(ObjectId id, UserInfo user, CharacterInfo character, RunningType type, RivalRunningRecordInfo rivalRecord, List<RunningRecordDistanceInfo> runningRecordDistanceInfos, List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos, int totalTime, int totalDistance, int averageSpeed, int averageCalory, LocalDateTime createdAt) {
        this.id = id.toString();
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
