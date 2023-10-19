package com.b208.dduishu.domain.follow.service;

import com.b208.dduishu.domain.follow.dto.request.FollowInfo;
import com.b208.dduishu.domain.follow.entity.Follow;
import com.b208.dduishu.domain.follow.repository.FollowRepository;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Transactional
    public void createFollower(FollowInfo req) {

        User fromUser = userRepository.findByUserId(req.getFromUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        User toUser = userRepository.findByUserId(req.getToUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Follow follow = Follow.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .createdAt(LocalDateTime.now())
                .build();

        followRepository.save(follow);
    }
}
