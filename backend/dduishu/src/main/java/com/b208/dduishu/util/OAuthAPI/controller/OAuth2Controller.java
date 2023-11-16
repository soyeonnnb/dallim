package com.b208.dduishu.util.OAuthAPI.controller;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.entity.CharacterLevel;
import com.b208.dduishu.domain.character.repository.CharacterLevelRepository;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.characterInfo.repository.CharacterInfoRepository;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.repository.PlanetInfoRepository;
import com.b208.dduishu.domain.planet.repository.PlanetRepository;
import com.b208.dduishu.domain.user.entity.UserLevel;
import com.b208.dduishu.domain.user.entity.UserState;
import com.b208.dduishu.domain.user.repository.UserLevelRepository;
import com.b208.dduishu.domain.user.service.UserSocialLoginService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b208.dduishu.domain.refreshtoken.repository.RefreshTokenRepository;
import com.b208.dduishu.domain.user.dto.response.UserLoginResponseDTO;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
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
    private final CharacterInfoRepository characterInfoRepository;
    private final CharacterRepository characterRepository;
    private final PlanetRepository planetRepository;
    private final PlanetInfoRepository planetInfoRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;
    private final UserSocialLoginService userSocialLoginService;
    private final BCryptPasswordEncoder encoder;
    private final UserLevelRepository userLevelRepository;
    private final CharacterLevelRepository characterLevelRepository;

    // 소셜 로그인
    // @PostMapping("oauth/login")
    // public ResponseEntity<?> Login(@RequestBody Map<String, Object> data, HttpServletResponse response) throws IOException {
    //     System.out.println("여기 들어올까요");
    //     UserLoginResponseDTO user = userSocialLoginService.oauthLogin((String) data.get("access"), response);
    //
    //     return ResponseEntity.status(200).body(user);
    // }

    //소셜로그인 이게될까
    @GetMapping("oauth/login")
    public ResponseEntity<?> Login(@RequestParam String access, HttpServletResponse response) throws IOException {
        System.out.println("여기 들어올까요");
        UserLoginResponseDTO user = userSocialLoginService.oauthLogin(access, response);
        return ResponseEntity.status(200).body(user);
    }

    // 소셜 로그아웃
    @GetMapping("oauth/social/logout")
    public ResponseEntity<?> LogoutKakao(HttpServletRequest request, HttpServletResponse response){

        Map<String, Object> result = userSocialLoginService.socialLogout(request, response);

        return ResponseEntity.ok(result);
    }

    // 우리 서비스 로그아웃
    @GetMapping("oauth/logout")
    public ResponseEntity<?> Logout(HttpServletRequest request, HttpServletResponse response){
        System.out.println("들어옴");
        Map<String, Object> result = userSocialLoginService.logout(request, response);
//        URI redirectUri = URI.create("http://localhost:3000");
        //        URI redirectUri = URI.create("https://j9b302.p.ssafy.io");
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setLocation(redirectUri);

//        return new ResponseEntity<>(result, httpHeaders, HttpStatus.SEE_OTHER);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //백엔드에서 수동으로 엑세스 토큰을
    // 처리하기 위한 코드
    private boolean isProcessing = false;

    @Transactional
    @GetMapping("oauth2/code/kakao")
    public ResponseEntity<?> exchangeKakaoCodeForAccessToken(@RequestParam("code") String code) {
        try {
            if (isProcessing) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 이미 처리 중인 경우 409 Conflict 반환
            }
            isProcessing = true;
//            System.out.println("코드 들어옴????"+code);
            // 엑세스 토큰 저장
            String accessToken = userSocialLoginService.getKakaoAccessToken(code);
            // 여기서 accessToken을 사용자 정보 가져오는데 사용할 것입니다.
            System.out.println(accessToken);

            // 엑세스 토큰을 클라이언트 앱으로 반환하거나 필요한 작업 수행
            Map<String, String> result = userSocialLoginService.getKakaoUserInfo(accessToken);

            String email = result.get("user_email");
            String profileImage = result.get("profile_image");
            String provider = "kakao";

            Optional<User> optionalUser = userRepository.findByEmailAndAccountType(email, "kakao");
            User user = null;

            if(optionalUser.isEmpty()){
                System.out.println("여기 들어옴?");
                //유저 생성

                UserLevel build = UserLevel.builder().level(1).exp(0).build();
                UserLevel savedLevel = userLevelRepository.save(build);

                user = User.builder()
                    .accountType(provider)
                    .email(email)
                    .nickname(nNick())
                    .accessToken(accessToken)
                    .privateAccess(encoder.encode(accessToken))
                    .state(UserState.standard)
                    .userLevel(savedLevel)
                    .registDate(LocalDateTime.now())
                    .build();

                System.out.println(user.getAccountType());
                user = userRepository.save(user);

                CharacterLevel characterLevel = CharacterLevel.builder().level(1).exp(0).build();
                CharacterLevel savedCharacterLevel = characterLevelRepository.save(characterLevel);

                Character character = Character.builder()
                        .user(user)
                        .characterInfo(characterInfoRepository.findById(1L).orElse(null))
                        .characterLevel(savedCharacterLevel)
                        .isMainCharacter(true)
                        .build();

                System.out.println(character.isMainCharacter());
                characterRepository.save(character);

                Planet planet = Planet.builder()
                        .user(user)
                        .planetInfo(planetInfoRepository.findById(1L).orElse(null))
                        .isMainPlanet(true)
                        .build();
                System.out.println(planet.isMainPlanet());
                planetRepository.save(planet);


            }else{
                // 최근 로그인 시간 갱신
                user = optionalUser.get();
                user.updateLastLoginDate();
                user.updateAccessToken(accessToken);
                user.updatePrivateAccessToken(encoder.encode(accessToken));
                userRepository.save(user);
            }
            isProcessing = false;

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", user.getPrivateAccess());

            return ResponseEntity.ok(response);
        } catch (Exception e) {

            isProcessing = false;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    private boolean isProcessingTwo = false;
    @GetMapping("oauth2/code/naver")
    public ResponseEntity<?> exchangeNaverCodeForAccessToken(@RequestParam("code") String code) {
        try {
            System.out.println(code);
            if (isProcessingTwo) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 이미 처리 중인 경우 409 Conflict 반환
            }
            isProcessingTwo = true;
            System.out.println("코드 찍어보기@@@@@@@@@@@@@@@@" +code);
            // 엑세스 토큰 저장
            String accessToken = userSocialLoginService.getNaverAccessToken(code);
            // 여기서 accessToken을 사용자 정보 가져오는데 사용할 것입니다.
            System.out.println(accessToken);


            Map<String, String> result = userSocialLoginService.getNaverUserInfo(accessToken);

            String email = result.get("user_email");
            String profileImage = result.get("profile_image");
            String provider = "naver";

            Optional<User> optionalUser = userRepository.findByEmailAndAccountType(email, "naver");
            User user = null;

            if(optionalUser.isEmpty()){
                user = User.builder()
                    .accountType(provider)
                    .email(email)
                    .nickname(nNick())
                    .accessToken(accessToken)
                    .privateAccess(encoder.encode(accessToken))
                    .state(UserState.standard)
                    .userLevel(UserLevel.builder().level(1).exp(0).build())
                    .registDate(LocalDateTime.now())
                    .build();
                user = userRepository.save(user);

                Character character = Character.builder()
                        .user(user)
                        .characterInfo(characterInfoRepository.findById(1L).orElse(null))
                        .characterLevel(CharacterLevel.builder().level(1).exp(0).build())
                        .isMainCharacter(true)
                        .build();
                characterRepository.save(character);

                Planet planet = Planet.builder()
                        .user(user)
                        .planetInfo(planetInfoRepository.findById(1L).orElse(null))
                        .isMainPlanet(true)
                        .build();
                planetRepository.save(planet);

            }else{

                // 최근 로그인 시간 갱신
                user = optionalUser.get();
                user.updateLastLoginDate();
                user.updateAccessToken(accessToken);
                user.updatePrivateAccessToken(encoder.encode(accessToken));
                userRepository.save(user);
            }
            isProcessingTwo = false;

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", user.getPrivateAccess());

            return ResponseEntity.ok(response);
        } catch (Exception e) {

            isProcessingTwo = false;
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }










    public String nNick() {
        String text;
        do {
            List<String> nick = Arrays.asList("상쾌한", "짜릿한", "그리운", "서운한", "울적한", "비참한", "두려운", "당당한", "배부른", "수줍은", "창피한", "멋있는",
                "열받은", "심심한", "잘생긴", "이쁜");
            List<String> name = Arrays.asList("사자", "여우", "늑대", "참새", "토끼", "돼지", "하마", "물소", "치타", "악어", "기린", "수달", "염소", "판다");
            Collections.shuffle(nick);
            Collections.shuffle(name);

            text = nick.get(0) + name.get(0);
        } while (userRepository.existsByNickname(text)); // 닉네임이 이미 존재하면 다시 생성
        return text;
    }





}
