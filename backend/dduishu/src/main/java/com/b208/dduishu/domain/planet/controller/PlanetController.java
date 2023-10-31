package com.b208.dduishu.domain.planet.controller;

import com.b208.dduishu.domain.planet.dto.request.MainPlanetInfo;
import com.b208.dduishu.domain.planet.dto.request.PurchasePlanetName;
import com.b208.dduishu.domain.planet.dto.response.PlanetOverview;
import com.b208.dduishu.domain.planet.service.PlanetService;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlanetController {

    private final PlanetService planetService;

    @GetMapping("/api/v1/thema")
    public ApiResponse<?> getAllThemaInfo() {
        try {
            List<PlanetOverview> ret = planetService.getAllThemaInfo();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 대표 테마 변경
    @PatchMapping("/api/v1/thema")
    public ApiResponse<?> updateMainThema(@RequestBody MainPlanetInfo req) {
        try {
            planetService.updateMainThema(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 테마 구매
    @PostMapping("/api/v1/thema")
    public ApiResponse<?> purchaseThema(@RequestBody PurchasePlanetName req) {
        try {
            planetService.purchaseThema(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
