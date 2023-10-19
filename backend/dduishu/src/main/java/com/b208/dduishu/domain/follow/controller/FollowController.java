package com.b208.dduishu.domain.follow.controller;

import com.b208.dduishu.domain.follow.dto.request.CreateFollowInfo;
import com.b208.dduishu.domain.follow.dto.request.FollowerInfo;
import com.b208.dduishu.domain.follow.service.FollowService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    @PostMapping("/api/v1/follow")
    public ApiResponse<?> createFollower(@RequestBody CreateFollowInfo req) {
        try {

            followService.createFollower(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/follow")
    public ApiResponse<?> getAllFollowInfo(){
        try {

            List<FollowerInfo> res = followService.getAllFollowInfo();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

//    @GetMapping("/api/v1/follow")
//    public ApiResponse<?> getAllFollowInfo() {
//        try {
//            followService.getAllFollowInfo();
//
//            return ApiResponse.createSuccess(true);
//        } catch (Exception e) {
//            return ApiResponse.createError(e.getMessage());
//        }
//    }

}
