package com.runapp.dto.response;

import com.runapp.model.runningMate.Character;
import com.runapp.model.runningMate.HeartRate;
import com.runapp.model.runningMate.Pace;
import com.runapp.model.runningMate.RunningRecordInfos;
import com.runapp.model.runningMate.User;

import java.time.LocalDateTime;
import java.util.List;

public class RunningMateRunningRecordDTO {
    private Long averagePace;
    private List<Double> distance;
    private Long totalTime;

    public RunningMateRunningRecordDTO() {
    }

    public Long getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(Long averagePace) {
        this.averagePace = averagePace;
    }

    public List<Double> getDistance() {
        return distance;
    }

    public void setDistance(List<Double> distance) {
        this.distance = distance;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    @Override
    public String toString() {
        return "RunningMateRunningRecordDTO{" +
                "averagePace=" + averagePace +
                ", distance=" + distance +
                ", totalTime=" + totalTime +
                '}';
    }
}
