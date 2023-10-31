package com.b208.dduishu.domain.runningRecord.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
public class RunningRecordOverallInfo {

    private int second;
    private double heartRate;
    private double distance;
    private double speed;
    private String pace;

    @Builder
    public RunningRecordOverallInfo(int second, double heartRate, double distance, double speed, String pace) {
        this.second = second;
        this.heartRate = heartRate;
        this.distance = distance;
        this.speed = speed;
        this.pace = pace;
    }
}
