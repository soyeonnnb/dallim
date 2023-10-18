package com.b208.dduishu.domain.runningRecord.controller;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDetail;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.dto.request.fetchType;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.runningRecord.service.RunningRecordService;
import com.b208.dduishu.domain.runningRecordDistance.document.RunningRecordDistance;
import com.b208.dduishu.domain.runningRecordDistance.repository.RunningRecordDistanceRepository;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.response.ApiResponse;
import com.google.protobuf.Api;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class RunningRecordController {
    private final RunningRecordService runningRecordService;

    @GetMapping("/api/v1/running/{id}")
    public ApiResponse<?> getRunningRecordDetail(@PathVariable ObjectId id) {

        try {
            RunningRecordDetail res = runningRecordService.getRunningRecordDetail(id);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }

    }

    @PostMapping("/api/v1/running")
    public ApiResponse<?> createRunningRecord(@RequestBody RunningRecordInfo req) {
        try {

            runningRecordService.createRunningRecord(req);

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
    public ApiResponse<?> getTop10RecentRunningRecord() {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10RecentRunningRecord();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/time")
    public ApiResponse<?> getTop10TimeRunningRecord() {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10TimeRunningRecord();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/distance")
    public ApiResponse<?> getTop10DistanceRunningRecord() {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10DistanceRunningRecord();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running/speed")
    public ApiResponse<?> getTop10SpeedRunningRecord() {
        try {
            List<RunningRecordOverview> res =  runningRecordService.getTop10SpeedRunningRecord();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

}
