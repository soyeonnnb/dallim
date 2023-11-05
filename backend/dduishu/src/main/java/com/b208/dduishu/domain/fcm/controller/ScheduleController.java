package com.b208.dduishu.domain.fcm.controller;

import com.b208.dduishu.domain.fcm.dto.ScheduleInfo;
import com.b208.dduishu.domain.fcm.service.JobService;
import com.b208.dduishu.domain.follow.dto.request.FollowerInfo;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ScheduleController {

    private final JobService jobService;

    @PostMapping("/api/v1/schedule")
    public ApiResponse<?> createSchedule(@RequestBody ScheduleInfo req){
        try {

            LocalDateTime localDateTime = LocalDateTime.of(2023, 11, 6, 0, 11);

            // LocalDateTime 객체를 Date 객체로 변환
            Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());

            // Date 객체를 Unix 타임스탬프로 변환
            long timestamp = date.getTime();

            System.out.println(timestamp); // Unix 타임스탬프 출력

            jobService.scheduleJob(req.getTargetToken(), req.getTitle(), req.getBody(),req.getScheduleTime());

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/schedule")
    public ApiResponse<?> getSchedule(){
        try {

            List<String> scheduleJob = jobService.getScheduleJob();

            return ApiResponse.createSuccess(scheduleJob);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @DeleteMapping("/api/v1/schedule")
    public ApiResponse<?> deleteSchedule(@RequestBody ScheduleInfo req){
        try {

            jobService.deleteScheduleJob(req.getTargetToken());

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
