package com.dallim.dto;

import com.dallim.model.RunDetail;

import java.time.LocalDateTime;
import java.util.List;

public class RunningDataDTO {
    private Long userId;
    private LocalDateTime date;
    private String watchOrMobile;
    private String formattedDate;
    private double totalDistance;
    private Long totalTime;
    private Long characterIndex;
    private double stepCount;
    private double averagePace;
    private double averageSpeed;
    private double averageHeartRate;
    private String type;
    private String rivalRecordId;
    private double initLatitude; // 위도
    private double initLongitude; // 경도
    private String winOrLose;
    private List<RunDetail> runningRecordInfos;

    // 기본 생성자
    public RunningDataDTO() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
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

    public Long getCharacterIndex() {
        return characterIndex;
    }

    public void setCharacterIndex(Long characterIndex) {
        this.characterIndex = characterIndex;
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

    public double getInitLatitude() {
        return initLatitude;
    }

    public void setInitLatitude(double initLatitude) {
        this.initLatitude = initLatitude;
    }

    public double getInitLongitude() {
        return initLongitude;
    }

    public void setInitLongitude(double initLongitude) {
        this.initLongitude = initLongitude;
    }

    public String getWinOrLose() {
        return winOrLose;
    }

    public void setWinOrLose(String winOrLose) {
        this.winOrLose = winOrLose;
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
                ", characterIndex=" + characterIndex +
                ", stepCount=" + stepCount +
                ", averagePace=" + averagePace +
                ", averageSpeed=" + averageSpeed +
                ", averageHeartRate=" + averageHeartRate +
                ", type='" + type + '\'' +
                ", rivalRecordId='" + rivalRecordId + '\'' +
                ", initLatitude=" + initLatitude +
                ", initLongitude=" + initLongitude +
                ", winOrLose='" + winOrLose + '\'' +
                ", runningRecordInfos=" + runningRecordInfos +
                '}';
    }
}
