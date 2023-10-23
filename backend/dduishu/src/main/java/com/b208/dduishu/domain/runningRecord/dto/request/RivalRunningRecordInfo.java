package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RivalRunningRecordInfo {

    private String id;
    private UserInfo user;
    private CharacterInfo character;
    private RunningType type;
    private List<RunningRecordDistanceInfo> runningRecordDistanceInfos;
    private List<RunningRecordHeartRateInfo> runningRecordHeartRateInfos;
    private int totalTime;
    private int totalDistance;
    private int averageSpeed;
    private int averageCalory;
    private LocalDateTime createdAt;

    @Builder
    public RivalRunningRecordInfo(RunningRecord runningRecord) {
        this.id = runningRecord.getId().toString();
        this.user = runningRecord.getUser();
        this.character = runningRecord.getCharacter();
        this.type = runningRecord.getType();
        this.runningRecordDistanceInfos = runningRecord.getRunningRecordDistanceInfos();
        this.runningRecordHeartRateInfos = runningRecord.getRunningRecordHeartRateInfos();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.averageCalory = runningRecord.getAverageCalory();
        this.createdAt = runningRecord.getCreatedAt();
    }
}
