package com.b208.dduishu.domain.fcm.service;

import com.b208.dduishu.domain.fcm.dto.FcmTokenInfo;
import com.b208.dduishu.domain.fcm.entity.FcmToken;
import com.b208.dduishu.domain.fcm.repository.FcmRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FcmService {

    private final FcmRepository fcmRepository;

    private final GetUser getUser;

    @Transactional
    public void createFcmToken(FcmTokenInfo req) {

        User user = getUser.getUser();

        FcmToken fcmToken = fcmRepository.findByUserUserId(user.getUserId());

        if (fcmToken != null) {
            fcmToken.setFcmToken(req.getFcmToken());
        }
        else {
            FcmToken build = FcmToken.builder()
                    .user(user)
                    .fcmToken(req.getFcmToken())
                    .createdAt(LocalDateTime.now())
                    .build();

            fcmRepository.save(build);
        }
    }

    private boolean isDuplicate(Long userId) {
        FcmToken fcmToken = fcmRepository.findById(userId).orElse(null);

        if (fcmToken != null) {
            return true;
        }
        return false;
    }
}
