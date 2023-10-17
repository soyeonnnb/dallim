package com.b208.dduishu.domain.refreshtoken.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.b208.dduishu.domain.refreshtoken.dto.RefreshTokenCheckDTO;
import com.b208.dduishu.domain.refreshtoken.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;

    @PostMapping("/token/refresh")
    public ResponseEntity<?> refreshTokenCheck(@RequestBody RefreshTokenCheckDTO refreshTokenCheckDTO){
        Map<String, Object> result = refreshTokenService.checkRefreshToken(refreshTokenCheckDTO);

        return ResponseEntity.status(200).body(result);
    }
}
