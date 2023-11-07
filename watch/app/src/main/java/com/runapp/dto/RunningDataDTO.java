package com.runapp.dto;

import com.runapp.model.RunDetail;

import java.util.List;

public class RunningDataDTO {
    private Long userId;
    private Long date;
    private String watchOrMobile;
    private String formattedDate;
    private double totalDistance;
    private Long totalTime;
    private Long characterId;
    private double stepCount;
    private double averagePace;
    private double averageSpeed;
    private double averageHeartRate;
    private String type;
    private String rivalRecordId;
    private List<RunDetail> runningRecordInfos;

    // 기본 생성자
    public RunningDataDTO() {}

    // 모든 필드를 파라미터로 가지는 생성자 (선택적 사용)
    public RunningDataDTO(Long userId, Long date, String formattedDate, double totalDistance, Long totalTime, Long characterId, double stepCount, double averagePace, double averageSpeed, double averageHeartRate, String type, String rivalRecordId, List<RunDetail> runningRecordInfos) {
        this.userId = userId;
        this.date = date;
        this.formattedDate = formattedDate;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.characterId = characterId;
        this.stepCount = stepCount;
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

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Long totalTime) {
        this.totalTime = totalTime;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }

    public double getStepCount() {
        return stepCount;
    }

    public void setStepCount(double stepCount) {
        this.stepCount = stepCount;
    }

    public double getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(double averagePace) {
        this.averagePace = averagePace;
    }

    public double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public double getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(double averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRivalRecordId() {
        return rivalRecordId;
    }

    public void setRivalRecordId(String rivalRecordId) {
        this.rivalRecordId = rivalRecordId;
    }

    public List<RunDetail> getRunningRecordInfos() {
        return runningRecordInfos;
    }

    public void setRunningRecordInfos(List<RunDetail> runningRecordInfos) {
        this.runningRecordInfos = runningRecordInfos;
    }

    public String getWatchOrMobile() {
        return watchOrMobile;
    }

    public void setWatchOrMobile(String watchOrMobile) {
        this.watchOrMobile = watchOrMobile;
    }

    @Override
    public String toString() {
        return "RunningDataDTO{" +
                "userId=" + userId +
                ", date=" + date +
                ", watchOrMobile='" + watchOrMobile + '\'' +
                ", formattedDate='" + formattedDate + '\'' +
                ", totalDistance=" + totalDistance +
                ", totalTime=" + totalTime +
                ", characterId=" + characterId +
                ", stepCount=" + stepCount +
                ", averagePace=" + averagePace +
                ", averageSpeed=" + averageSpeed +
                ", averageHeartRate=" + averageHeartRate +
                ", type='" + type + '\'' +
                ", rivalRecordId=" + rivalRecordId +
                ", runningRecordInfos=" + runningRecordInfos +
                '}';
    }
}
