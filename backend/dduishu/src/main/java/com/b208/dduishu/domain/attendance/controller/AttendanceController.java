package com.b208.dduishu.domain.attendance.controller;

import com.b208.dduishu.domain.attendance.dto.response.AttendanceInfo;
import com.b208.dduishu.domain.attendance.service.AttendanceService;
import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/api/v1/attendance")
    public ApiResponse<?> getAllUserAttendance() {
        try {
            AttendanceInfo ret = attendanceService.getAllUserAttendance();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @PostMapping("/api/v1/attendance")
    public ApiResponse<?> markUserAttendance() {
        try {
            attendanceService.markUserAttendance();

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
