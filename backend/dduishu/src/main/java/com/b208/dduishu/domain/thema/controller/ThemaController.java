package com.b208.dduishu.domain.thema.controller;

import com.b208.dduishu.domain.thema.dto.request.MainThemaInfo;
import com.b208.dduishu.domain.thema.dto.request.PurchaseThemaName;
import com.b208.dduishu.domain.thema.dto.response.ThemaOverview;
import com.b208.dduishu.domain.thema.service.ThemaService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ThemaController {

    private final ThemaService themaService;

    @GetMapping("/api/v1/thema")
    public ApiResponse<?> getAllThemaInfo() {
        try {
            List<ThemaOverview> ret = themaService.getAllThemaInfo();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 대표 테마 변경
    @PatchMapping("/api/v1/thema")
    public ApiResponse<?> updateMainThema(@RequestBody MainThemaInfo req) {
        try {
            themaService.updateMainThema(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 테마 구매
    @PostMapping("/api/v1/thema")
    public ApiResponse<?> purchaseThema(@RequestBody PurchaseThemaName req) {
        try {
            themaService.purchaseThema(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
