package com.b208.dduishu.domain.runningRecord.controller;

import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDetail;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.service.RunningRecordService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RunningRecordController {
    private final RunningRecordService runningRecordService;

    @GetMapping("/api/v1/running/{id}")
    public ApiResponse<?> getRunningRecordDetail(@PathVariable ObjectId id) {

        try {

            System.out.println(id);

            RunningRecordDetail res = runningRecordService.getRunningRecordDetail(id);

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

    @GetMapping("/api/v1/running")
    public ApiResponse<?> getRunningRecordFor30Days(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getRunningRecordFor30Days(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/recent")
    public ApiResponse<?> getTop10RecentRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10RecentRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/time")
    public ApiResponse<?> getTop10TimeRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10TimeRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/distance")
    public ApiResponse<?> getTop10DistanceRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10DistanceRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/speed")
    public ApiResponse<?> getTop10SpeedRunningRecord(@RequestParam String type, @RequestParam Long userId) {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10SpeedRunningRecord(type, userId);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

}
