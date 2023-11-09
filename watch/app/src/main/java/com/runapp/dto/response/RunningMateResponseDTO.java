package com.runapp.dto.response;

import com.google.gson.annotations.SerializedName;

import java.time.LocalDateTime;

public class RunningMateResponseDTO {
    private String runningMateId;
    private String runningRecordId;
    private Long userId;
    private String nickName;
    private int characterIndex;
    private int evolutionStage;
    private int planetIndex;
    private int level;
    private double averagePace;
    private double totalDistance;
    private double totalTime;
    @SerializedName("clear")
    private boolean isClear;
    private LocalDateTime createdAt;


    public RunningMateResponseDTO() {
    }

    public String getRunningMateId() {
        return runningMateId;
    }

    public void setRunningMateId(String runningMateId) {
        this.runningMateId = runningMateId;
    }

    public String getRunningRecordId() {
        return runningRecordId;
    }

    public void setRunningRecordId(String runningRecordId) {
        this.runningRecordId = runningRecordId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getCharacterIndex() {
        return characterIndex;
    }

    public void setCharacterIndex(int characterIndex) {
        this.characterIndex = characterIndex;
    }

    public int getPlanetIndex() {
        return planetIndex;
    }

    public void setPlanetIndex(int planetIndex) {
        this.planetIndex = planetIndex;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public double getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(double averagePace) {
        this.averagePace = averagePace;
    }

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public double getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(double totalTime) {
        this.totalTime = totalTime;
    }

    public boolean isClear() {
        return isClear;
    }

    public void setClear(boolean clear) {
        isClear = clear;
    }

    public int getEvolutionStage() {
        return evolutionStage;
    }

    public void setEvolutionStage(int evolutionStage) {
        this.evolutionStage = evolutionStage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "RunningMateResponseDTO{" +
                "runningMateId='" + runningMateId + '\'' +
                ", runningRecordId='" + runningRecordId + '\'' +
                ", userId=" + userId +
                ", nickName='" + nickName + '\'' +
                ", characterIndex=" + characterIndex +
                ", evolutionStage=" + evolutionStage +
                ", planetIndex=" + planetIndex +
                ", level=" + level +
                ", averagePace=" + averagePace +
                ", totalDistance=" + totalDistance +
                ", totalTime=" + totalTime +
                ", clear=" + isClear +
                ", createdAt=" + createdAt +
                '}';
    }
}
