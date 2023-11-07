package com.b208.dduishu.domain.fcm.service;

import com.b208.dduishu.domain.fcm.dto.FcmTokenInfo;
import com.b208.dduishu.domain.fcm.entity.FcmToken;
import com.b208.dduishu.domain.fcm.repository.FcmRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FcmService {

    private final FcmRepository fcmRepository;

    private final GetUser getUser;

    public void createFcmToken(FcmTokenInfo req) {

        User user = getUser.getUser();

        FcmToken fcmToken = FcmToken.builder()
                .user(user)
                .fcmToken(req.getFcmToken())
                .createdAt(LocalDateTime.now())
                .build();

        fcmRepository.save(fcmToken);
    }
}
