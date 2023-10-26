package com.runapp.model;

public class RunDetail {
    private long time;   // 해당 기록이 기록된 시간
    private float pace; // 속도(m/k)
    private float distance; // 거리(m)
    private float heartRate; // 심박수

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    public float getPace() {
        return pace;
    }

    public void setPace(float pace) {
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

    @Override
    public String toString() {
        return "RunDetail{" +
                "time=" + time +
                ", pace=" + pace +
                ", distance=" + distance +
                ", heartRate=" + heartRate +
                '}';
    }
}
