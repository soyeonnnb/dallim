package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.entity.RunningType;
import com.b208.dduishu.domain.user.dto.request.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RivalRunningRecordInfo {

    private String id;
    private UserInfo user;
    private CharacterOverview character;
    private RunningType type;
    private List<RunningRecordOverallInfo> runningRecordInfos;
    private float totalTime;
    private float totalDistance;
    private float averageSpeed;
    private LocalDateTime createdAt;

    @Builder
    public RivalRunningRecordInfo(RunningRecord runningRecord) {
        this.id = runningRecord.getId().toString();
        this.user = runningRecord.getUser();
        this.character = runningRecord.getCharacter();
        this.type = runningRecord.getType();
        this.runningRecordInfos = runningRecord.getRunningRecordInfos();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.createdAt = runningRecord.getCreatedAt();
    }
}
