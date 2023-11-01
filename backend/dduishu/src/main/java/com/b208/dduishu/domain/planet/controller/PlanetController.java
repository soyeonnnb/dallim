package com.b208.dduishu.domain.planet.controller;

import com.b208.dduishu.domain.planet.dto.request.PlanetIndex;
import com.b208.dduishu.domain.planet.dto.request.PurchasePlanetIndex;
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

    @GetMapping("/api/v1/planet")
    public ApiResponse<?> getAllPlanetInfo() {
        try {
            List<PlanetOverview> ret = planetService.getAllPlanetInfo();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 대표 테마 변경
    @PatchMapping("/api/v1/planet")
    public ApiResponse<?> updateMainPlanet(@RequestBody PlanetIndex req) {
        try {
            planetService.updateMainPlanet(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 테마 구매
    @PostMapping("/api/v1/planet")
    public ApiResponse<?> purchasePlanet(@RequestBody PurchasePlanetIndex req) {
        try {
            planetService.purchasePlanet(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
