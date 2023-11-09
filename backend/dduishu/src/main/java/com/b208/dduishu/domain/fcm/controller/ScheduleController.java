package com.b208.dduishu.domain.fcm.controller;

import com.b208.dduishu.domain.fcm.dto.ScheduleInfo;
import com.b208.dduishu.domain.fcm.dto.UpdateScheduleInfo;
import com.b208.dduishu.domain.fcm.entity.FcmMessageId;
import com.b208.dduishu.domain.fcm.service.JobService;
import com.b208.dduishu.domain.follow.dto.request.FollowerInfo;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
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

    private final GetUser getUser;

    @PostMapping("/api/v1/schedule")
    public ApiResponse<?> createSchedule(@RequestBody ScheduleInfo req){
        try {

            User user = getUser.getUser();

            jobService.scheduleJob(req.getTargetToken(), user.getUserId(), req.getDay(), req.getHour(),req.getMinute());

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/schedule")
    public ApiResponse<?> getSchedule(){
        try {
            List<FcmMessageId> scheduleJob = jobService.getScheduleJob();

            return ApiResponse.createSuccess(scheduleJob);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @DeleteMapping("/api/v1/schedule")
    public ApiResponse<?> deleteSchedule(@RequestBody ScheduleInfo req){
        try {

            jobService.deleteScheduleJob(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @PatchMapping("/api/v1/schedule")
    public ApiResponse<?> updateSchedule(@RequestBody UpdateScheduleInfo req){
        try {

            jobService.updateSchedule(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
