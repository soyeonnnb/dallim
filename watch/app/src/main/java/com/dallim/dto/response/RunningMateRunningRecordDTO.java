package com.dallim.dto.response;

import java.util.List;

public class RunningMateRunningRecordDTO {
    private Double averagePace;
    private List<Double> distance;
    private Long totalTime;

    public RunningMateRunningRecordDTO() {
    }

    public Double getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(Double averagePace) {
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
