package com.b208.dduishu.domain.follow.service;

import com.b208.dduishu.domain.follow.dto.request.CreateFollowInfo;
import com.b208.dduishu.domain.follow.dto.request.FollowerInfo;
import com.b208.dduishu.domain.follow.entity.Follow;
import com.b208.dduishu.domain.follow.repository.FollowRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    private final GetUser getUser;

    @Transactional
    public void createFollower(CreateFollowInfo req) {

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

    public List<FollowerInfo> getAllFollowInfo() {
        User user = getUser.getUser();

        List<Follow> res = followRepository.findAllByFromUserUserId(user.getUserId());

        List<User> followUsers = res.stream()
                .map(o -> {
                    return userRepository.findByUserId(o.getId()).orElseThrow(() -> {
                        throw new NullPointerException();
                    });
                })
                .collect(toList());

        return followUsers.stream()
                .map(o -> {
                    return new FollowerInfo(o);
                })
                .collect(toList());
    }
}
