package com.b208.dduishu.domain.runningMate.dto.request;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RunningMateInfo {

    private String id;
    private String imageUrl;
    private LocalDateTime createdAt;
    private float averageSpeed;
    private float totalDistance;
    private float totalTime;

    @Builder
    public RunningMateInfo(RunningMate runningMate) {
        this.id = runningMate.getRivalRecord().getId();
        this.imageUrl = null;
        this.createdAt = runningMate.getCreatedAt();
        this.averageSpeed = runningMate.getRivalRecord().getAverageSpeed();
        this.totalDistance = runningMate.getRivalRecord().getTotalDistance();
        this.totalTime = runningMate.getRivalRecord().getTotalTime();
    }
}
