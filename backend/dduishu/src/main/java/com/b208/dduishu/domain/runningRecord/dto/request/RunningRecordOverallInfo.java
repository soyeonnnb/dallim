package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningRecord.document.RunningState;
import com.b208.dduishu.domain.runningRecord.document.RunningType;
import lombok.Builder;
import lombok.Data;

@Data
public class RunningRecordOverallInfo {

    private int second;
    private double heartRate;
    private double distance;
    private double speed;
    private double pace;
    private RunningState state;
    private double latitude;
    private double longitude;

    @Builder
    public RunningRecordOverallInfo(int second, double heartRate, double distance, double speed, double pace, RunningState state, double latitude, double longitude) {
        this.second = second;
        this.heartRate = heartRate;
        this.distance = distance;
        this.speed = speed;
        this.pace = pace;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
