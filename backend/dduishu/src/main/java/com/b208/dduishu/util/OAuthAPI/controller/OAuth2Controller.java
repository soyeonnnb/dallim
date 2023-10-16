package com.b208.dduishu.util.OAuthAPI.controller;

import java.io.IOException;
import java.net.URI;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b208.dduishu.domain.refreshtoken.repository.RefreshTokenRepository;
import com.b208.dduishu.domain.user.dto.UserLoginResponseDTO;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.domain.user.service.UserService;
import com.b208.dduishu.util.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class  OAuth2Controller {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
//    @Value("${kakao.logout-redirect-uri}")
    private String kakaoLogoutRedirectUri = "http://localhost:8080/api/oauth/logout";
//    private String kakaoLogoutRedirectUri = "https://j9b302.p.ssafy.io/api/oauth/logout";


    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    // 소셜 로그인
    @PostMapping("oauth/login")
    public ResponseEntity<?> Login(@RequestBody Map<String, Object> data, HttpServletResponse response) throws IOException {

        UserLoginResponseDTO user = userService.oauthLogin((String) data.get("access"), response);

        return ResponseEntity.status(200).body(user);
    }

    // 소셜 로그아웃
    @PostMapping("oauth/social/logout")
    public ResponseEntity<?> LogoutKakao(HttpServletRequest request, HttpServletResponse response){

        Map<String, Object> result = userService.socialLogout(request, response);
        
        return ResponseEntity.ok(result);
    }

    // 우리 서비스 로그아웃
    @GetMapping("oauth/logout")
    public ResponseEntity<?> Logout(HttpServletRequest request, HttpServletResponse response){
        System.out.println("들어옴");
        Map<String, Object> result = userService.logout(request, response);
        URI redirectUri = URI.create("http://localhost:3000");
//        URI redirectUri = URI.create("https://j9b302.p.ssafy.io");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);

        return new ResponseEntity<>(result, httpHeaders, HttpStatus.SEE_OTHER);
    }
}
