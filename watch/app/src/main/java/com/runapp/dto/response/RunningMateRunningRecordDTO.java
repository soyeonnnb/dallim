package com.runapp.dto.response;

import com.runapp.model.runningMate.Character;
import com.runapp.model.runningMate.HeartRate;
import com.runapp.model.runningMate.Pace;
import com.runapp.model.runningMate.RunningRecordInfos;
import com.runapp.model.runningMate.User;

import java.time.LocalDateTime;
import java.util.List;

public class RunningMateRunningRecordDTO {
    private String id;
    private String location;
    private String watchOrMobile;
    private List<Double> secondPerSpeed;
    private HeartRate heartRate;
    private Pace pace;
    private double stepCount;
    private User user;
    private Character character;
    private String type;
    private List<RunningRecordInfos> runningRecordInfos;
    private int totalTime;
    private double totalDistance;
    private double averageSpeed;
    private LocalDateTime createdAt;

    public RunningMateRunningRecordDTO() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
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
        return "RunningMateRunningRecordDTO{" +
                "id='" + id + '\'' +
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
