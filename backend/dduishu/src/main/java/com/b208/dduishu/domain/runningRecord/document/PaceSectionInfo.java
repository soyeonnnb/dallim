package com.b208.dduishu.domain.runningRecord.document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaceSectionInfo {

    private int startTime;
    private int finishTime;
    private double pace;

    public PaceSectionInfo(int startTime, int finishTime, double pace) {
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.pace = pace;
    }
}
