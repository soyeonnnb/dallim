package com.b208.dduishu.domain.runningRecord.dto.response;

import com.b208.dduishu.domain.rawRunningRecord.document.RawRunningRecord;
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
    public WatchRunningRecordOverview(RawRunningRecord rawRunningRecord) {
        this.averagePace = rawRunningRecord.getAveragePace();
        this.distance = rawRunningRecord.getRunningRecordInfos();
        this.totalTime = rawRunningRecord.getTotalTime();
    }
}
