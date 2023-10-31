package com.runapp.model;

public class RunDetail {
    private Long second;   // 해당 기록이 기록된 시간
    private double speed; // 속도(m/s)
    private String pace; // 페이스(m/k)
    private double distance; // 거리(m)
    private double heartRate; // 심박수
    private String state; // 상태
    private double latitude; // 위도
    private double longitude; // 경도

    public Long getSecond() {
        return second;
    }

    public void setSecond(Long second) {
        this.second = second;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public String getPace() {
        return pace;
    }

    public void setPace(String pace) {
        this.pace = pace;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(double heartRate) {
        this.heartRate = heartRate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "RunDetail{" +
                "second=" + second +
                ", speed=" + speed +
                ", pace='" + pace + '\'' +
                ", distance=" + distance +
                ", heartRate=" + heartRate +
                ", state='" + state + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
