package com.b208.dduishu.domain.fcm.controller;

import com.b208.dduishu.domain.fcm.dto.FcmTokenInfo;
import com.b208.dduishu.domain.fcm.dto.RequestDto;
import com.b208.dduishu.domain.fcm.service.FcmService;
import com.b208.dduishu.domain.fcm.service.FireBaseCloudMessageService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FcmController {

    private final FcmService fcmService;

    @PostMapping("/api/fcm-token")
    public ApiResponse<?> createFcmToken(@RequestBody FcmTokenInfo req) {
        try {
                fcmService.createFcmToken(req);

                return ApiResponse.createSuccess(true);
        } catch (Exception e) {
                return ApiResponse.createError(e.getMessage());
        }
    }
}
