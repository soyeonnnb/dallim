package com.dallim.dto.response;

public class OneRunningDataResponseDTO {
    private Double total_distance;
    private int total_time;
    private Double average_pace;
    private Double average_heart_rate;

    public Double getTotal_distance() {
        return total_distance;
    }

    public void setTotal_distance(Double total_distance) {
        this.total_distance = total_distance;
    }

    public int getTotal_time() {
        return total_time;
    }

    public void setTotal_time(int total_time) {
        this.total_time = total_time;
    }

    public Double getAverage_pace() {
        return average_pace;
    }

    public void setAverage_pace(Double average_pace) {
        this.average_pace = average_pace;
    }

    public Double getAverage_heart_rate() {
        return average_heart_rate;
    }

    public void setAverage_heart_rate(Double average_heart_rate) {
        this.average_heart_rate = average_heart_rate;
    }
}
