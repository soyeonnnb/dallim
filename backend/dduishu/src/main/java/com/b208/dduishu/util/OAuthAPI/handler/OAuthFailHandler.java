package com.b208.dduishu.util.OAuthAPI.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.b208.dduishu.util.OAuthAPI.other.PrincipalDetails;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class OAuthFailHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.info("OAuth2 로그인 실패: {}", exception.getMessage());
        log.error("OAuth2 로그인 실패", exception);


        System.out.println("실패");
        // response.sendRedirect("http://10.0.2.2:8081");
        response.sendRedirect("http://10.0.2.2:3000");
//        response.sendRedirect("https://j9b302.p.ssafy.io");
    }
}
