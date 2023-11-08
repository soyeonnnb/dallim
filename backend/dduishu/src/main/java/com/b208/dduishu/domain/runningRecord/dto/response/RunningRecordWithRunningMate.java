package com.b208.dduishu.domain.runningRecord.dto.response;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
public class RunningRecordWithRunningMate {

    private String id;
    private LocalDateTime createdAt;
    private List<Double> mySpeed;
    private List<Double> rivalSpeed;
    private int totalTime;
    private double totalDistance;
    private double averageHeartRate;

    public RunningRecordWithRunningMate(RunningRecord runningRecord, RunningRecord rivalRecord) {
        this.id = runningRecord.getId().toString();
        this.createdAt = runningRecord.getCreatedAt();
        this.mySpeed = getSpeed(runningRecord);
        this.rivalSpeed = getSpeed(rivalRecord);
        this.totalTime = runningRecord.getTotalTime();
        this.totalDistance = runningRecord.getTotalDistance();
        this.averageHeartRate = runningRecord.getAverageHeartRate();
    }

    public List<Double> getSpeed(RunningRecord runningRecord) {
        return runningRecord.getRunningRecordInfos().stream()
                .map(o -> o.getSpeed())
                .collect(toList());
    }
}
