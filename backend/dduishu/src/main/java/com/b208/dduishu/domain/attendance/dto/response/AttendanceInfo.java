package com.b208.dduishu.domain.attendance.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AttendanceInfo {
    private List<LocalDate> attendances;

    @Builder
    public AttendanceInfo(List<LocalDate> attendances) {
        this.attendances = attendances;
    }
}
