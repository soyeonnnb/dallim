package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.document.RunningType;
import com.b208.dduishu.domain.runningRecord.document.WatchOrMobile;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RunningRecordOverview {

    // 위치 정보
    private String id;
    private String location;
    private WatchOrMobile watchOrMobile;
    private RunningType type;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private LocalDateTime createdAt;

    public RunningRecordOverview(RunningRecord runningRecord) {
        this.id = runningRecord.getId().toString();
        this.location = runningRecord.getLocation();
        this.watchOrMobile = runningRecord.getWatchOrMobile();
        this.type = runningRecord.getType();
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageSpeed = runningRecord.getAverageSpeed();
        this.createdAt = runningRecord.getCreatedAt();
    }
}
