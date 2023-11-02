package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.document.RunningType;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SocialRunningRecordOverview {
    // 위치 정보
    private String id;
    private String location;
    private RunningType type;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private LocalDateTime createdAt;
    private boolean isRegistration;

    public SocialRunningRecordOverview(RunningRecord runningRecord, List<RunningMate> runningMates) {
        this.id = runningRecord.getId().toString();
        this.location = "서울, 석촌호수";
        this.type = runningRecord.getType();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.createdAt = runningRecord.getCreatedAt();
        this.isRegistration = runningMates.stream()
                .anyMatch(o -> o.getRivalRecord().getId().equals(runningRecord.getId().toString()));
    }
}
