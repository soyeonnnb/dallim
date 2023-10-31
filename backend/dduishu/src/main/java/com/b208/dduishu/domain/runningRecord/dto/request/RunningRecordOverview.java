package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.document.RunningType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordOverview {

    // 위치 정보
    private RunningType type;
    private int totalTime;
    private float totalDistance;
    private float averageSpeed;
    private LocalDateTime createdAt;

    @JsonProperty("isRegistration")
    private boolean isRegistration;

    public RunningRecordOverview(RunningRecord runningRecord, List<RunningMate> runningMates) {
        this.type = runningRecord.getType();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.createdAt = runningRecord.getCreatedAt();
        this.isRegistration = runningMates.stream()
                .anyMatch(o -> o.getRivalRecord().getId().equals(runningRecord.getId().toString()));
    }

}
