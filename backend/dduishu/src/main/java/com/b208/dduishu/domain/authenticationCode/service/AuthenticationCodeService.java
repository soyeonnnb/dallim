package com.b208.dduishu.domain.authenticationCode.service;

import com.b208.dduishu.domain.authenticationCode.dto.response.AuthenticationCodeInfo;
import com.b208.dduishu.domain.authenticationCode.dto.response.UserAccessToken;
import com.b208.dduishu.domain.authenticationCode.entity.AuthenticationCode;
import com.b208.dduishu.domain.authenticationCode.exception.AccessTokenGenerationException;
import com.b208.dduishu.domain.authenticationCode.exception.AuthenticationCodeCreationException;
import com.b208.dduishu.domain.authenticationCode.exception.AuthenticationCodeExpiredException;
import com.b208.dduishu.domain.authenticationCode.repository.AuthenticationCodeRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.Local;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationCodeService {

    private final AuthenticationCodeRepository authenticationCodeRepository;

    private final GetUser getUser;
    private static final String CHARACTERS = "0123456789";
    private static final int CODE_LENGTH = 6;
    private static final int MAX_ATTEMPTS = 10;
    private static final int acExpiredMs = 1000 * 60 * 3;

    @Value("${jwt.secret}")
    private String secretKey;
    private final JwtUtil jwtUtil;


    // 랜덤 코드 생성
    public String generateRandomCode() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        Random random = new SecureRandom();

        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(randomIndex));
        }

        return code.toString();
    }

    // 중복 검사 후 유효한 코드 반환
    public String generateUniqueCode() {
        String code;
        int attempts = 0;

        do {
            code = generateRandomCode();
            attempts++;
        } while (authenticationCodeRepository.existsByAuthCode(code) && attempts < MAX_ATTEMPTS);

        if (attempts >= MAX_ATTEMPTS) {
            throw new AuthenticationCodeCreationException();
        }

        return code;
    }

    @Transactional
    public AuthenticationCodeInfo createAuthenticationCode() {
        String authCode = generateUniqueCode();

        AuthenticationCode authenticationCode = AuthenticationCode.builder()
                .authCode(authCode)
                .isAuthenticated(false)
                .expireTime(new Date(System.currentTimeMillis() + acExpiredMs))
                .build();

        authenticationCodeRepository.save(authenticationCode);

        return AuthenticationCodeInfo.builder().authCode(authCode).build();
    }

    public static LocalDateTime convertDateToLocalDateTime(Date date) {
        return Instant.ofEpochMilli(date.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    @Transactional
    public void checkAuthenticationCode(AuthenticationCodeInfo req) {
        User user = getUser.getUser();

        AuthenticationCode authenticationCode = authenticationCodeRepository.findByAuthCode(req.getAuthCode());
        LocalDateTime expireTime = convertDateToLocalDateTime(authenticationCode.getExpireTime());

        if (!authenticationCode.isAuthenticated() && LocalDateTime.now().isBefore(expireTime)) {
            authenticationCode.setUser(user);
            authenticationCode.setAuthCodeState(true);

            return;
        }
        throw new AuthenticationCodeExpiredException();
    }


    public UserAccessToken checkAuthenticationStateAndGetAccessToken(AuthenticationCodeInfo req, HttpServletResponse response) {
        AuthenticationCode authenticationCode = authenticationCodeRepository.findByAuthCode(req.getAuthCode());

        if (authenticationCode.isAuthenticated()) {
            String accessToken = jwtUtil.createAccessJwt(authenticationCode.getUser().getUserId(), secretKey);
            String refreshJwt = jwtUtil.createRefreshToken(authenticationCode.getUser().getUserId(), secretKey);

            Cookie cookie = new Cookie("refreshToken", refreshJwt);

            // expires in 7 days
            cookie.setMaxAge(14 * 24 * 60 * 60);

            // optional properties
            cookie.setSecure(false); // 이거 https 적용해서 서버로 올리면 true로 바꿔야한다. 지금은 로컬에서 테스트라서 false로 해놓음
            cookie.setHttpOnly(true); // http only로 설정해서 javascript로 접근 못하도록 막음
            cookie.setPath("/");

            // add cookie to response
            response.addCookie(cookie);

            return UserAccessToken.builder().accessToken(accessToken).build();
        }
        throw new AccessTokenGenerationException();
    }

    @Scheduled(fixedRate = 1000 * 60 * 60 * 3)
    @Transactional
    public void deleteExpiredAuthenticationCode(){
        log.info("불필요한 인증 코드 삭제");

        authenticationCodeRepository.deleteByExpireTimeBefore(new Date(System.currentTimeMillis()));
    }
}
