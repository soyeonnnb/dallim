package com.b208.dduishu.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
public class AttendanceInfo {
    private boolean isAttendance;

    @Builder
    public AttendanceInfo(boolean isAttendance) {
        this.isAttendance = isAttendance;
    }
}
