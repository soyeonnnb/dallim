package com.b208.dduishu.domain.runningRecord.dto.request;

import com.b208.dduishu.domain.runningRecord.entity.RunningOrWalk;
import lombok.Builder;
import lombok.Data;

@Data
public class RunningRecordOverallInfo {

    private int second;
    private float heartRate;
    private float cumulativeDistance;
    private float speed;
    private RunningOrWalk type;

    @Builder
    public RunningRecordOverallInfo(int second, float heartRate, float cumulativeDistance, float speed, RunningOrWalk type) {
        this.second = second;
        this.heartRate = heartRate;
        this.cumulativeDistance = cumulativeDistance;
        this.speed = speed;
        this.type = type;
    }
}
