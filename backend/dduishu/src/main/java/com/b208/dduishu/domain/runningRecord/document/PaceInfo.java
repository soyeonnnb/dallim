package com.b208.dduishu.domain.runningRecord.document;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PaceInfo {

    private double averagePace;
    private double maxPace;
    private List<PaceSectionInfo> section;

    @Builder
    public PaceInfo(double averagePace, double maxPace, List<PaceSectionInfo> section) {
        this.averagePace = averagePace;
        this.maxPace = maxPace;
        this.section = section;
    }
}
