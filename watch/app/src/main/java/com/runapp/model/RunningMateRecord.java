package com.runapp.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.runapp.dto.response.RunningMateRunningRecordDTO;
import com.runapp.model.runningMate.Character;
import com.runapp.model.runningMate.HeartRate;
import com.runapp.model.runningMate.Pace;
import com.runapp.model.runningMate.RunningRecordInfos;
import com.runapp.model.runningMate.User;

import java.lang.annotation.Native;
import java.time.LocalDateTime;
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
