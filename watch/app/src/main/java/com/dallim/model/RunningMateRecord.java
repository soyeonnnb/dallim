package com.dallim.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.List;

@Entity
public class RunningMateRecord {
    @PrimaryKey(autoGenerate = true)
    private Long id;
    @ColumnInfo(name = "distance")
    private List<Double> distance;
    @ColumnInfo(name = "average_pace")
    private double averagePace;
    @ColumnInfo(name = "total_time")
    private Long totalTime;

    public RunningMateRecord() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Double> getDistance() {
        return distance;
    }

    public void setDistance(List<Double> distance) {
        this.distance = distance;
    }

    public double getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(double averagePace) {
        this.averagePace = averagePace;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    @Override
    public String toString() {
        return "RunningMateRecord{" +
                "id=" + id +
                ", distance=" + distance +
                ", averagePace=" + averagePace +
                ", totalTime=" + totalTime +
                '}';
    }
}
