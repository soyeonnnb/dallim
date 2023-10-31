package com.runapp.model;

public class RunDetail {
    private Long second;   // 해당 기록이 기록된 시간
    private float speed; // 속도(m/s)
    private String pace; // 페이스(m/k)
    private float distance; // 거리(m)
    private float heartRate; // 심박수
    private String state; // 상태
    private float latitude; // 위도
    private float longitude; // 경도

    public Long getSecond() {
        return second;
    }

    public void setSecond(Long second) {
        this.second = second;
    }

    public float getSpeed() {
        return speed;
    }

    public void setSpeed(float speed) {
        this.speed = speed;
    }

    public String getPace() {
        return pace;
    }

    public void setPace(String pace) {
        this.pace = pace;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public float getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(float heartRate) {
        this.heartRate = heartRate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
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
