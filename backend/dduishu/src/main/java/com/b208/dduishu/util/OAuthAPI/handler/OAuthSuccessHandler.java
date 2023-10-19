package com.b208.dduishu.util.OAuthAPI.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.OAuthAPI.other.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("여기?");
        User UserInfo = principalDetails.getUser(); //PrincipalDetails에서 사용자 정보 가져오기

        String assessToken = UserInfo.getPrivateAccess();

//        response.sendRedirect("https://j9b302.p.ssafy.io/success?access=" + assessToken);
        response.sendRedirect("http://localhost:3000/success?access=" + assessToken);
    }

}
