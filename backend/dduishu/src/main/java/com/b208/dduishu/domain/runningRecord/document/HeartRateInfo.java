package com.b208.dduishu.domain.runningRecord.document;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class HeartRateInfo {

    private double averageHeartRate;
    private double maxHeartRate;
    private List<Integer> secondPerHeartRateSection;

    @Builder
    public HeartRateInfo(double averageHeartRate, double maxHeartRate, List<Integer> secondPerHeartRateSection) {
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.secondPerHeartRateSection = secondPerHeartRateSection;
    }
}
