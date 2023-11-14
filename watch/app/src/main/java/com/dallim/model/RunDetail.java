package com.dallim.model;

public class RunDetail {
    private Long second;   // 해당 기록이 기록된 시간
    private double speed; // 속도(m/s)
    private double pace; // 페이스(m/k)
    private double distance; // 거리(m)
    private double heartRate; // 심박수
    private String state; // 상태

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

    public double getPace() {
        return pace;
    }

    public void setPace(double pace) {
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

    @Override
    public String toString() {
        return "RunDetail{" +
                "second=" + second +
                ", speed=" + speed +
                ", pace=" + pace +
                ", distance=" + distance +
                ", heartRate=" + heartRate +
                ", state='" + state + '\'' +
                '}';
    }
}
