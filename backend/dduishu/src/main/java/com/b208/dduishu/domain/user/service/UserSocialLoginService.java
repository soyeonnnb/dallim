package com.b208.dduishu.domain.user.service;

import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.dto.response.UserLoginResponseDTO;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.exception.UserNotFoundException;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.jwt.JwtUtil;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.json.JSONObject;
import com.nimbusds.jose.shaded.json.parser.JSONParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSocialLoginService {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
    //    @Value("${kakao.logout-redirect-uri}")
    private String kakaoLogoutRedirectUri = "http://localhost:8080/api/oauth/logout";
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${spring.security.oauth2.client.registration.naver.clientId}")
    private String naverClientId;
    @Value("${spring.security.oauth2.client.registration.naver.clientSecret}")
    private String naverSecretId;

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    @Autowired
    private RestTemplate restTemplate;
    private final GetUser getUser;

    // 소셜 로그인
    @Transactional
    public UserLoginResponseDTO oauthLogin(String privateAccess, HttpServletResponse response) {

        Optional<User> byPrivateAccess = userRepository.findByPrivateAccess(privateAccess);

        if (byPrivateAccess.isEmpty()) {
            throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");
        }

        User user = byPrivateAccess.get();

        // 로그인 성공
        String accessToken = jwtUtil.createAccessJwt(user.getUserId(), secretKey); // 토큰 발급해서 넘김
        String refreshToken = jwtUtil.createRefreshToken(user.getUserId(), secretKey); // 리프레시 토큰 발급해서 넘김

        // create a cookie
        Cookie cookie = new Cookie("refreshToken", refreshToken);

        // expires in 7 days
        cookie.setMaxAge(14 * 24 * 60 * 60);

        // optional properties
        cookie.setSecure(false); // 이거 https 적용해서 서버로 올리면 true로 바꿔야한다. 지금은 로컬에서 테스트라서 false로 해놓음
        cookie.setHttpOnly(true); // http only로 설정해서 javascript로 접근 못하도록 막음
        cookie.setPath("/");

        // add cookie to response
        response.addCookie(cookie);


        Map<String, Object> result = new HashMap<>();

        UserLoginResponseDTO build = UserLoginResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .accountType(user.getAccountType())
                .uesrId(user.getUserId())
                .createCount(user.getCreateCount()).build();

        if (user.getAccountType().equals("kakao")) {
            result.put("message", "카카오 로그인 성공");
        } else if (user.getAccountType().equals("naver")) {
            result.put("message", "네이버 로그인 성공");
        }

        return build;
    }

    // 소셜 로그아웃
    public Map<String, Object> socialLogout(HttpServletRequest request, HttpServletResponse response) {
        User user = getUser.getUser();
        Long userId = user.getUserId();

        HttpSession session = request.getSession();
        session.setAttribute("userId", userId);

        Map<String, Object> result = new HashMap<>();

        if (user.getAccountType().equals("kakao")) {

            String logoutUrl = "https://kauth.kakao.com/oauth/logout";

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(logoutUrl)
                    .queryParam("client_id", kakaoClientId)
                    .queryParam("logout_redirect_uri", kakaoLogoutRedirectUri);

            result.put("logoutUrl", builder.toUriString());
        } else if (user.getAccountType().equals("naver")) {

            String logoutUrl = "https://nid.naver.com/oauth2.0/token";

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(logoutUrl)
                    .queryParam("client_id", naverClientId)
                    .queryParam("service_provider", "NAVER")
                    .queryParam("client_secret", naverSecretId)
                    .queryParam("access_token", user.getAccessToken())
                    .queryParam("grant_type", "delete");

            ResponseEntity<String> res = restTemplate.exchange(builder.toUriString(), HttpMethod.DELETE, null, String.class);

            clearCookies(request, response);
            result.put("naver", "성공");

            redisTemplate.delete(String.valueOf(userId));
        }
        return result;
    }

    // 로그아웃
    @Transactional
    public Map<String, Object> logout(HttpServletRequest request, HttpServletResponse response) {

        // 세션에서 유저 ID 꺼내기
        HttpSession session = request.getSession();
        Long userId = (Long) session.getAttribute("userId");

        redisTemplate.delete(String.valueOf(userId));

        Map<String, Object> result = new HashMap<>();
        result.put("message", "로그아웃 성공");

        clearCookies(request, response);

        return result;
    }

    // 쿠키 날리기
    private void clearCookies(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0); // 쿠키의 유효 기간을 0으로 설정하여 즉시 만료시킵니다.
                cookie.setValue(null);
                cookie.setPath("/");
                response.addCookie(cookie); // 무효화된 쿠키를 응답에 추가합니다.
            }
        }
    }

    public String getKakaoAccessToken(String code) {
        String access_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            // System.out.println("여기는?");
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();

            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=e9cb9f18c757bb2e5ec1c811a9fbe5d1"); // 여기에 Kakao API의 클라이언트 ID
            sb.append("&client_secret=Nk3ZroS9bxLSN9KrZ2BRrFO0KvJPYLTa"); // 여기에 Kakao API의 클라이언트 시크릿
            sb.append("&redirect_url=http://k9b208.p.ssafy.io/login/oauth2/code/kakao"); // 여기에 리다이렉트 URI
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();



            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            // System.out.println(responseCode);
            if (responseCode == 200) {
                // 요청을 통해 얻은 JSON 타입의 Response 메세지 읽어오기
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line;
                StringBuilder result = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    result.append(line);
                }
                br.close();

                // JSON 파싱
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> jsonMap = objectMapper.readValue(
                        result.toString(), new TypeReference<Map<String, Object>>() {}
                );

                access_Token = jsonMap.get("access_token").toString();
                // System.out.println(access_Token);
            }

            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }


    public Map<String, String> getKakaoUserInfo(String access_token) {
        String reqUrl = "https://kapi.kakao.com/v2/user/me";
        Map<String, String> userInfo = new HashMap<>();

        try {
            URL url = new URL(reqUrl);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();

            if (responseCode == 200) {
                BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                String line = "";
                StringBuilder result = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    result.append(line);
                }

                JSONParser parser = new JSONParser();
                JSONObject obj = (JSONObject) parser.parse(result.toString());

                JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
                JSONObject properties = (JSONObject) obj.get("properties");

                String nickname = properties.get("nickname").toString();
                String profile_image = properties.get("profile_image").toString();
                String user_email = kakao_account.get("email").toString();

                userInfo.put("nickname", nickname);
                userInfo.put("profile_image", profile_image);
                userInfo.put("user_email", user_email);
                br.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (com.nimbusds.jose.shaded.json.parser.ParseException e) {
            e.printStackTrace();
        }

        return userInfo;
    }

    public String getNaverAccessToken(String code) {
        String access_Token = "";
        String reqURL = "https://nid.naver.com/oauth2.0/token";

        try {
            // System.out.println("여기는?");
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();

            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=U981wCCDuUbK6_3C3WJo"); // 여기에 Naver API의 클라이언트 ID
            sb.append("&client_secret=D6aepx5XBX"); // 여기에 Kakao API의 클라이언트 시크릿
            sb.append("&redirect_url=http://k9b208.p.ssafy.io/login/oauth2/code/naver"); // 여기에 리다이렉트 URI
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();


            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println(responseCode);
            if (responseCode == 200) {
                System.out.println("여기???");
                // 요청을 통해 얻은 JSON 타입의 Response 메세지 읽어오기
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line;
                StringBuilder result = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    result.append(line);
                }
                br.close();

                // JSON 파싱
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> jsonMap = objectMapper.readValue(
                        result.toString(), new TypeReference<Map<String, Object>>() {}
                );

                access_Token = jsonMap.get("access_token").toString();
                // System.out.println(access_Token);
            }

            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    public Map<String, String> getNaverUserInfo(String access_token) {
        String reqUrl = "https://openapi.naver.com/v1/nid/me";
        Map<String, String> userInfo = new HashMap<>();

        try {
            URL url = new URL(reqUrl);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();

            if (responseCode == 200) {
                BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                String line = "";
                StringBuilder result = new StringBuilder();

                while ((line = br.readLine()) != null) {
                    result.append(line);
                }

                JSONParser parser = new JSONParser();
                JSONObject obj = (JSONObject) parser.parse(result.toString());

                JSONObject response = (JSONObject) obj.get("response");

                String nickname = response.get("name").toString();
                String profile_image = response.get("profile_image").toString();
                String user_email = response.get("email").toString();

                userInfo.put("nickname", nickname);
                userInfo.put("profile_image", profile_image);
                userInfo.put("user_email", user_email);
                System.out.println(nickname);
                System.out.println(profile_image);
                System.out.println(user_email);
                br.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (com.nimbusds.jose.shaded.json.parser.ParseException e) {
            e.printStackTrace();
        }

        return userInfo;
    }

}
