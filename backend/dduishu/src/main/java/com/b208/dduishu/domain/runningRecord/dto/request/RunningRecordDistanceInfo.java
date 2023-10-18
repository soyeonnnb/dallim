package com.b208.dduishu.domain.runningRecord.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RunningRecordDistanceInfo {

    private int second;
    private int distance;
}
