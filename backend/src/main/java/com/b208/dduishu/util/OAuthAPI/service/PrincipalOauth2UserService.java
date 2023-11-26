package com.b208.dduishu.util.OAuthAPI.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.OAuthAPI.other.KakaoUserInfo;
import com.b208.dduishu.util.OAuthAPI.other.NaverUserInfo;
import com.b208.dduishu.util.OAuthAPI.other.OAuth2UserInfo;
import com.b208.dduishu.util.OAuthAPI.other.PrincipalDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2User oAuth2User = super.loadUser(userRequest);
        //log.info("getAttributes : {}", oAuth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo = null;

        String provider = userRequest.getClientRegistration().getRegistrationId();
        // System.out.println("응애");
        if(provider.equals("kakao")){
            oAuth2UserInfo  = new KakaoUserInfo((Map) oAuth2User.getAttributes());
        }else if(provider.equals("naver")){
            oAuth2UserInfo  = new NaverUserInfo((Map) oAuth2User.getAttributes());
        }

        String email = oAuth2UserInfo.getEmail();
        String accessToken = userRequest.getAccessToken().getTokenValue();

        Optional<User> optionalUser = userRepository.findByEmailAndAccountType(email, provider);
        User user = null;

        if(optionalUser.isEmpty()){
            //유저 생성
            user = User.builder()
                    .accountType(provider)
                    .email(email)
                    .nickname(nNick())
                    .accessToken(accessToken)
                    .privateAccess(encoder.encode(accessToken))
                    .build();

            user = userRepository.save(user);

        }else{
            // 최근 로그인 시간 갱신
            user = optionalUser.get();
            user.updateLastLoginDate();
            user.updateAccessToken(accessToken);
            user.updatePrivateAccessToken(encoder.encode(accessToken));
            userRepository.save(user);
        }

        //유저 정보를 필요할때 그때 사용한다.
        return new PrincipalDetails(user, oAuth2User.getAttributes(), accessToken);

    }

    // 닉네임 랜덤 생성
    public String nNick() {
        String text;
        do {
            List<String> adjectives = Arrays.asList("잘생긴", "서운한", "즐거운", "귀여운", "용감한", "영리한", "사나운", "친절한", "조용한", "발랄한");
            List<String> name = Arrays.asList("사자", "곰", "여우", "늑대", "참새", "토끼", "돼지", "하마", "물소", "치타", "악어", "기린", "수달", "염소", "판다");

            Collections.shuffle(adjectives);
            Collections.shuffle(name);

            text =  adjectives.get(0) + name.get(0);

        } while (userRepository.existsByNickname(text)); // 닉네임이 이미 존재하면 다시 생성
        return text;
    }

}
