package com.b208.dduishu.domain.runningRecord.controller;

import com.b208.dduishu.domain.runningRecord.dto.request.*;
import com.b208.dduishu.domain.runningRecord.dto.response.MonthRunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.response.RunningRecordWithRunningMate;
import com.b208.dduishu.domain.runningRecord.dto.response.WatchRunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.service.RunningRecordService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RunningRecordController {
    private final RunningRecordService runningRecordService;

    @GetMapping("/api/v1/running/{id}")
    public ApiResponse<?> getRunningRecordDetail(@PathVariable String id) {

        try {
            System.out.println(id);

            RunningRecordDetail res = runningRecordService.getRunningRecordDetail(id);
            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }

    }

    @GetMapping("/api/v1/running/overview/{id}")
    public ApiResponse<?> getRunningRecordOverview(@PathVariable String id) {

        try {

            System.out.println(id);

            WatchRunningRecordOverview res = runningRecordService.getRunningRecordOverview(id);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }

    }

    @GetMapping("/api/v1/running-record/running-mate/{id}")
    public ApiResponse<?> getRunningRecordWithRunningMate(@PathVariable ObjectId id) {

        try {

            System.out.println(id);

            List<RunningRecordWithRunningMate> res = runningRecordService.getRunningRecordWithRunningMate(id);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }

    }

    @PostMapping("/api/v1/running")
    public ApiResponse<?> createRunningRecord(@RequestBody RunningRecordInfo req) {
        try {
            log.info(req.toString());

            runningRecordService.createRunningRecord(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }



    @PostMapping("/api/v1/running/start")
    public ApiResponse<?> startRunning() {
        try {
            runningRecordService.updateUserState(true);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/me")
    public ApiResponse<?> getMyRunningRecordFor30Days(@RequestParam int year, @RequestParam int month) {
        try {
            MonthRunningRecord res =  runningRecordService.getMyRunningRecordFor30Days(year, month);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/me/all")
    public ApiResponse<?> getMyRunningRecordForAllDays() {
        try {
            List<MonthRunningRecord> res =  runningRecordService.getMyRunningRecordForAllDays();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/recent")
    public ApiResponse<?> getTop10RecentRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<SocialRunningRecordOverview> res =  runningRecordService.getTop10RecentRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/time")
    public ApiResponse<?> getTop10TimeRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<SocialRunningRecordOverview> res =  runningRecordService.getTop10TimeRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/distance")
    public ApiResponse<?> getTop10DistanceRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<SocialRunningRecordOverview> res =  runningRecordService.getTop10DistanceRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/speed")
    public ApiResponse<?> getTop10SpeedRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<SocialRunningRecordOverview> res =  runningRecordService.getTop10SpeedRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

}
