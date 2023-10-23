package com.b208.dduishu.domain.runningMate.controller;

import com.b208.dduishu.domain.runningMate.dto.request.CreateRunningMateInfo;
import com.b208.dduishu.domain.runningMate.dto.request.RunningMateInfo;
import com.b208.dduishu.domain.runningMate.service.RunningMateService;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.service.RunningRecordService;
import com.b208.dduishu.util.response.ApiResponse;
import com.google.protobuf.Api;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RunningMateController {

    private final RunningMateService runningMateService;

    @PostMapping("/api/v1/running-mate")
    public ApiResponse<?> createRunningMate(@RequestBody CreateRunningMateInfo req) {
        try {
            runningMateService.createRunningMate(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/running-mate")
    public ApiResponse<?> getAllRunningMate() {
        try {
            List<RunningMateInfo> res = runningMateService.getAllRunningMate();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @DeleteMapping("/api/v1/running-mate/{id}")
    public ApiResponse<?> deleteRunningMate(@PathVariable ObjectId id){
        try {
            runningMateService.deleteRunningMate(id);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
