package com.runapp.dto;

import com.runapp.model.RunDetail;

import java.util.List;

public class RunningDataDTO {
    private Long userId;
    private Long date;
    private String formattedDate;
    private float totalDistance;
    private Long totalTime;
    private int characterId;
    private float stepCounter;
    private String averagePace;
    private float averageSpeed;
    private float averageHeartRate;
    private String type;
    private Long rivalRecordId;
    private List<RunDetail> runningRecordInfos;

    // 기본 생성자
    public RunningDataDTO() {}

    // 모든 필드를 파라미터로 가지는 생성자 (선택적 사용)
    public RunningDataDTO(Long userId, Long date, String formattedDate, float totalDistance, Long totalTime, int characterId, float stepCounter, String averagePace, float averageSpeed, float averageHeartRate, String type, Long rivalRecordId, List<RunDetail> runningRecordInfos) {
        this.userId = userId;
        this.date = date;
        this.formattedDate = formattedDate;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.characterId = characterId;
        this.stepCounter = stepCounter;
        this.averagePace = averagePace;
        this.averageSpeed = averageSpeed;
        this.averageHeartRate = averageHeartRate;
        this.type = type;
        this.rivalRecordId = rivalRecordId;
        this.runningRecordInfos = runningRecordInfos;
    }




    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public String getFormattedDate() {
        return formattedDate;
    }

    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }

    public float getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(float totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    public int getCharacterId() {
        return characterId;
    }

    public void setCharacterId(int characterId) {
        this.characterId = characterId;
    }

    public float getStepCounter() {
        return stepCounter;
    }

    public void setStepCounter(float stepCounter) {
        this.stepCounter = stepCounter;
    }

    public String getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(String averagePace) {
        this.averagePace = averagePace;
    }

    public float getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(float averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public float getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(float averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getRivalRecordId() {
        return rivalRecordId;
    }

    public void setRivalRecordId(Long rivalRecordId) {
        this.rivalRecordId = rivalRecordId;
    }

    public List<RunDetail> getRunningRecordInfos() {
        return runningRecordInfos;
    }

    public void setRunningRecordInfos(List<RunDetail> runningRecordInfos) {
        this.runningRecordInfos = runningRecordInfos;
    }

    @Override
    public String toString() {
        return "RunningDataDTO{" +
                ", userId=" + userId +
                ", date=" + date +
                ", formattedDate='" + formattedDate + '\'' +
                ", totalDistance=" + totalDistance +
                ", totalTime=" + totalTime +
                ", characterId=" + characterId +
                ", stepCounter=" + stepCounter +
                ", averagePace='" + averagePace + '\'' +
                ", averageSpeed=" + averageSpeed +
                ", averageHeartRate=" + averageHeartRate +
                ", type='" + type + '\'' +
                ", rivalRecordId=" + rivalRecordId +
                ", runningRecordInfos=" + runningRecordInfos +
                '}';
    }
}
