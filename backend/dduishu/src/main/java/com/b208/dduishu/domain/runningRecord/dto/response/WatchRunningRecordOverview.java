package com.b208.dduishu.domain.runningRecord.dto.response;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverallInfo;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Data
public class WatchRunningRecordOverview {
    private double averagePace;
    private List<Double> distance;
    private int totalTime;

    @Builder
    public WatchRunningRecordOverview(RunningRecord runningRecord) {
        this.averagePace = runningRecord.getAveragePace();
        this.distance = runningRecord.getRunningRecordInfos().stream()
                .map(RunningRecordOverallInfo::getDistance).collect(toList());
        this.totalTime = runningRecord.getTotalTime();
    }
}
