package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningRecord.entity.RunningOrWalk;
import lombok.Builder;
import lombok.Data;

@Data
public class RunningRecordOverallInfo {

    private int second;
    private float heartRate;
    private float distance;
    private float speed;
    private String pace;

    @Builder
    public RunningRecordOverallInfo(int second, float heartRate, float distance, float speed, String pace) {
        this.second = second;
        this.heartRate = heartRate;
        this.distance = distance;
        this.speed = speed;
        this.pace = pace;
    }
}
