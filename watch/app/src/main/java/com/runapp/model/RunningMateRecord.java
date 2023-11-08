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
    @ColumnInfo(name = "location")
    private String location;
    @ColumnInfo(name = "watch_or_mobile")
    private String watchOrMobile;
    @ColumnInfo(name = "second_per_speed")
    private List<Double> secondPerSpeed;
    @ColumnInfo(name = "heart_rate")
    private HeartRate heartRate;
    @ColumnInfo(name = "pace")
    private Pace pace;
    @ColumnInfo(name = "step_count")
    private double stepCount;
    @ColumnInfo(name = "user")
    private User user;
    @ColumnInfo(name = "character")
    private Character character;
    @ColumnInfo(name = "type")
    private String type;
    @ColumnInfo(name = "running_record_infos")
    private List<RunningRecordInfos> runningRecordInfos;
    @ColumnInfo(name = "total_time")
    private int totalTime;
    @ColumnInfo(name = "total_distance")
    private double totalDistance;
    @ColumnInfo(name = "average_speed")
    private double averageSpeed;
    @ColumnInfo(name = "created_at")
    private LocalDateTime createdAt;

    public RunningMateRecord() {
    }

    public RunningMateRecord toEntity(RunningMateRunningRecordDTO runningMateRunningRecordDTO){

        RunningMateRecord runningMateRecord = new RunningMateRecord();
        runningMateRecord.setLocation(runningMateRunningRecordDTO.getLocation());
        runningMateRecord.setWatchOrMobile(runningMateRunningRecordDTO.getWatchOrMobile());
        runningMateRecord.setSecondPerSpeed(runningMateRunningRecordDTO.getSecondPerSpeed());
        runningMateRecord.setHeartRate(runningMateRunningRecordDTO.getHeartRate());
        runningMateRecord.setPace(runningMateRunningRecordDTO.getPace());
        runningMateRecord.setStepCount(runningMateRunningRecordDTO.getStepCount());
        runningMateRecord.setUser(runningMateRunningRecordDTO.getUser());
        runningMateRecord.setCharacter(runningMateRunningRecordDTO.getCharacter());
        runningMateRecord.setType(runningMateRunningRecordDTO.getType());
        runningMateRecord.setRunningRecordInfos(runningMateRunningRecordDTO.getRunningRecordInfos());
        runningMateRecord.setTotalDistance(runningMateRunningRecordDTO.getTotalDistance());
        runningMateRecord.setTotalTime(runningMateRunningRecordDTO.getTotalTime());
        runningMateRecord.setAverageSpeed(runningMateRunningRecordDTO.getAverageSpeed());
        runningMateRecord.setCreatedAt(runningMateRunningRecordDTO.getCreatedAt());

        return runningMateRecord;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWatchOrMobile() {
        return watchOrMobile;
    }

    public void setWatchOrMobile(String watchOrMobile) {
        this.watchOrMobile = watchOrMobile;
    }

    public List<Double> getSecondPerSpeed() {
        return secondPerSpeed;
    }

    public void setSecondPerSpeed(List<Double> secondPerSpeed) {
        this.secondPerSpeed = secondPerSpeed;
    }

    public HeartRate getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(HeartRate heartRate) {
        this.heartRate = heartRate;
    }

    public Pace getPace() {
        return pace;
    }

    public void setPace(Pace pace) {
        this.pace = pace;
    }

    public double getStepCount() {
        return stepCount;
    }

    public void setStepCount(double stepCount) {
        this.stepCount = stepCount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<RunningRecordInfos> getRunningRecordInfos() {
        return runningRecordInfos;
    }

    public void setRunningRecordInfos(List<RunningRecordInfos> runningRecordInfos) {
        this.runningRecordInfos = runningRecordInfos;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "RunningMateRecord{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", watchOrMobile='" + watchOrMobile + '\'' +
                ", secondPerSpeed=" + secondPerSpeed +
                ", heartRate=" + heartRate +
                ", pace=" + pace +
                ", stepCount=" + stepCount +
                ", user=" + user +
                ", character=" + character +
                ", type='" + type + '\'' +
                ", runningRecordInfos=" + runningRecordInfos +
                ", totalTime=" + totalTime +
                ", totalDistance=" + totalDistance +
                ", averageSpeed=" + averageSpeed +
                ", createdAt=" + createdAt +
                '}';
    }
}
