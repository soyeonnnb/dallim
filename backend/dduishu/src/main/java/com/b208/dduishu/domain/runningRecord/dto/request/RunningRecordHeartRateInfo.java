package com.b208.dduishu.domain.runningRecord.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RunningRecordHeartRateInfo {

    private int second;
    private int heartRate;
}
