package com.b208.dduishu.domain.authenticationCode.controller;

import com.b208.dduishu.domain.authenticationCode.dto.response.AuthenticationCodeInfo;
import com.b208.dduishu.domain.authenticationCode.dto.response.UserAccessToken;
import com.b208.dduishu.domain.authenticationCode.service.AuthenticationCodeService;
import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.util.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AuthenticationCodeController {

    private final AuthenticationCodeService authenticationCodeService;


    @PostMapping("/api/v1/authentication-code")
    public ApiResponse<?> createAuthenticationCode() {
        try {
            AuthenticationCodeInfo ret = authenticationCodeService.createAuthenticationCode();

            return ApiResponse.createSuccess(ret);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @PostMapping("/api/v1/check-authentication-code")
    public ApiResponse<?> checkAuthenticationCode(@RequestBody AuthenticationCodeInfo req) {
        try {
            authenticationCodeService.checkAuthenticationCode(req);

            return ApiResponse.createSuccess(true);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @PostMapping("/api/v1/authentication-code/token")
    public ApiResponse<?> checkAuthenticationStateAndGetAccessToken(@RequestBody AuthenticationCodeInfo req, HttpServletResponse response) {
        try {
            UserAccessToken res = authenticationCodeService.checkAuthenticationStateAndGetAccessToken(req, response);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
