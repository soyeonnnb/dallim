package com.b208.dduishu.domain.follow.service;

import com.b208.dduishu.domain.follow.dto.request.CreateFollowerInfo;
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

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    private final GetUser getUser;

    @Transactional
    public void createFollower(CreateFollowerInfo req) {

        User user = getUser.getUser();

        System.out.println("여기>?");
        System.out.println(user);

        User toUser = userRepository.findByUserId(req.getToUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        System.out.println("여긴가?");

        Follow follow = Follow.builder()
                .fromUser(user)
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
                    return userRepository.findByUserId(o.getToUser().getUserId()).orElseThrow(() -> {
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

    @Transactional
    public void deleteFollower(Long toUserId) {
        User user = getUser.getUser();

        followRepository.deleteByFromUserUserIdAndToUserUserId(user.getUserId(), toUserId);
    }
}
