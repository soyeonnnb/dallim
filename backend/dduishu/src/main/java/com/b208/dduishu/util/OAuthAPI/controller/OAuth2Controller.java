package com.b208.dduishu.util.OAuthAPI.controller;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b208.dduishu.domain.refreshtoken.repository.RefreshTokenRepository;
import com.b208.dduishu.domain.user.dto.UserLoginResponseDTO;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.domain.user.service.UserService;
import com.b208.dduishu.util.jwt.JwtUtil;

import org.springframework.web.bind.annotation.RequestParam;
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
    private final BCryptPasswordEncoder encoder;

    // 소셜 로그인
    @PostMapping("oauth/login")
    public ResponseEntity<?> Login(@RequestBody Map<String, Object> data, HttpServletResponse response) throws IOException {
        System.out.println("여기 들어올까요");
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

    //백엔드에서 수동으로 엑세스 토큰을
    // 처리하기 위한 코드
    private boolean isProcessing = false;
    @PostMapping("oauth2/code/kakao")
    public ResponseEntity<?> exchangeKakaoCodeForAccessToken(@RequestParam("code") String code) {
        try {
            if (isProcessing) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 이미 처리 중인 경우 409 Conflict 반환
            }
            isProcessing = true;
            // 엑세스 토큰 저장
            String accessToken = userService.getKakaoAccessToken(code);
            // 여기서 accessToken을 사용자 정보 가져오는데 사용할 것입니다.
            System.out.println(accessToken);

            // 엑세스 토큰을 클라이언트 앱으로 반환하거나 필요한 작업 수행
            Map<String, String> result = userService.getKakaoUserInfo(accessToken);

            String email = result.get("user_email");
            String profileImage = result.get("profile_image");
            String provider = "kakao";

            Optional<User> optionalUser = userRepository.findByEmailAndAccountType(email, "kakao");
            User user = null;

            if(optionalUser.isEmpty()){
                //유저 생성
                user = User.builder()
                    .accountType(provider)
                    .email(email)
                    .nickname(nNick())
                    .profileImage(profileImage)
                    .accessToken(accessToken)
                    .privateAccess(encoder.encode(accessToken))
                    .build();
                log.info(user.toString());
                user = userRepository.save(user);
                log.info("save 실행됨");

            }else{
                log.info("2222");
                // 최근 로그인 시간 갱신
                user = optionalUser.get();
                user.updateLastLoginDate();
                user.updateAccessToken(accessToken);
                user.updatePrivateAccessToken(encoder.encode(accessToken));
                userRepository.save(user);
            }
            isProcessing = false;

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {

            isProcessing = false;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    private boolean isProcessingTwo = false;
    @PostMapping("oauth2/code/naver")
    public ResponseEntity<?> exchangeNaverCodeForAccessToken(@RequestParam("code") String code) {
        try {
            System.out.println(code);
            if (isProcessingTwo) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 이미 처리 중인 경우 409 Conflict 반환
            }
            isProcessingTwo = true;
            // 엑세스 토큰 저장
            String accessToken = userService.getNaverAccessToken(code);
            // 여기서 accessToken을 사용자 정보 가져오는데 사용할 것입니다.
            System.out.println(accessToken);

            // 엑세스 토큰을 클라이언트 앱으로 반환하거나 필요한 작업 수행
            Map<String, String> result = userService.getNaverUserInfo(accessToken);

            String email = result.get("user_email");
            String profileImage = result.get("profile_image");
            String provider = "naver";

            Optional<User> optionalUser = userRepository.findByEmailAndAccountType(email, "naver");
            User user = null;

            if(optionalUser.isEmpty()){
                //유저 생성
                user = User.builder()
                    .accountType(provider)
                    .email(email)
                    .nickname(nNick())
                    .profileImage(profileImage)
                    .accessToken(accessToken)
                    .privateAccess(encoder.encode(accessToken))
                    .build();
                log.info(user.toString());
                user = userRepository.save(user);
                log.info("save 실행됨");

            }else{
                log.info("2222");
                // 최근 로그인 시간 갱신
                user = optionalUser.get();
                user.updateLastLoginDate();
                user.updateAccessToken(accessToken);
                user.updatePrivateAccessToken(encoder.encode(accessToken));
                userRepository.save(user);
            }
            isProcessingTwo = false;

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);

            return ResponseEntity.ok(response);
        } catch (Exception e) {

            isProcessingTwo = false;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }










    public String nNick() {
        String text;
        do {
            List<String> nick = Arrays.asList("기분나쁜", "기분좋은", "신바람나는", "상쾌한", "짜릿한", "그리운", "자유로운", "서운한", "울적한", "비참한", "위축되는", "긴장되는", "두려운", "당당한", "배부른", "수줍은", "창피한", "멋있는",
                "열받은", "심심한", "잘생긴", "이쁜", "시끄러운");
            List<String> name = Arrays.asList("사자", "코끼리", "호랑이", "곰", "여우", "늑대", "너구리", "침팬치", "고릴라", "참새", "고슴도치", "강아지", "고양이", "거북이", "토끼", "앵무새", "하이에나", "돼지", "하마", "원숭이", "물소", "얼룩말", "치타",
                "악어", "기린", "수달", "염소", "다람쥐", "판다");
            List<String> num = Arrays.asList("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
            Collections.shuffle(nick);
            Collections.shuffle(name);
            Collections.shuffle(num);

            text = nick.get(0) + name.get(0) + num.get(0) + num.get(1) + num.get(2) + num.get(3) + num.get(4);
        } while (userRepository.existsByNickname(text)); // 닉네임이 이미 존재하면 다시 생성
        return text;
    }





}
