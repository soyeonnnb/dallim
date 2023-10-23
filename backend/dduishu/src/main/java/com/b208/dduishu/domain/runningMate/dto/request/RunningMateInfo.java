package com.b208.dduishu.domain.runningMate.dto.request;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RunningMateInfo {
    private String imageUrl;
    private LocalDateTime createdAt;
    private int averageSpeed;
    private int totalDistance;
    private int totalTime;

    @Builder
    public RunningMateInfo(RunningRecord runningRecord) {
        this.imageUrl = null;
        this.createdAt = runningRecord.getCreatedAt();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.totalDistance = runningRecord.getTotalDistance();
        this.totalTime = runningRecord.getTotalTime();
    }
}
