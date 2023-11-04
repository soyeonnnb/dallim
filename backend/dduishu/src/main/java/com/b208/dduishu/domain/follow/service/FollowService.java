package com.b208.dduishu.domain.follow.service;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.follow.dto.request.AcceptFollowerinfo;
import com.b208.dduishu.domain.follow.dto.request.CreateFollowerInfo;
import com.b208.dduishu.domain.follow.dto.request.FollowerInfo;
import com.b208.dduishu.domain.follow.dto.request.RejectFollowerinfo;
import com.b208.dduishu.domain.follow.entity.Follow;
import com.b208.dduishu.domain.follow.entity.FollowState;
import com.b208.dduishu.domain.follow.repository.FollowRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final GetUser getUser;

    @Transactional
    public void createFollow(CreateFollowerInfo req) {

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
                .state(FollowState.waiting)
                .build();

        followRepository.save(follow);

    }

    @Transactional
    public void acceptFollow(AcceptFollowerinfo req) {

        User user = getUser.getUser();

        User toUser = userRepository.findByUserId(req.getToUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });


        Follow follow = followRepository.findByFromUserUserIdAndToUserUserId(user.getUserId(), toUser.getUserId());

        follow.setState(FollowState.accept);
        System.out.println("@@@@@@"+follow);
        followRepository.save(follow);
    }
    @Transactional
    public void rejectFollow(RejectFollowerinfo req) {

        User user = getUser.getUser();

        User toUser = userRepository.findByUserId(req.getToUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });


        Follow follow = followRepository.findByFromUserUserIdAndToUserUserId(user.getUserId(), toUser.getUserId());

        follow.setState(FollowState.reject);

        followRepository.save(follow);
    }



    public List<FollowerInfo> getAllFollowInfo() {
        User user = getUser.getUser();

        // toUser로서의 팔로우 리스트
        List<Follow> toUserFollows = followRepository.findAllByToUserUserIdAndState(user.getUserId(), FollowState.accept);
        // fromUser로서의 팔로우 리스트
        List<Follow> fromUserFollows = followRepository.findAllByFromUserUserIdAndState(user.getUserId(), FollowState.accept);
        Character mainCharacter = user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);
        // 두 리스트를 합쳐 중복을 제거한 User Set을 생성
        Set<User> allFriends = new HashSet<>();

        toUserFollows.forEach(follow -> allFriends.add(follow.getFromUser()));
        fromUserFollows.forEach(follow -> allFriends.add(follow.getToUser()));

        // Set 내의 모든 사용자를 FollowerInfo 리스트로 변환
        return allFriends.stream()
                .map(o -> new FollowerInfo(o, mainCharacter))
                .collect(Collectors.toList());
    }


    public List<FollowerInfo> getAllWatingFollowInfo() {
        User user = getUser.getUser();
        Character mainCharacter = user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);
        // fromUser가 아니라 toUser 기준으로 조회하며 state가 waiting인 것만 필터링
        List<Follow> waitingFollows = followRepository.findAllByToUserUserIdAndState(user.getUserId(), FollowState.waiting);


        List<User> followUsers = waitingFollows.stream()
                .map(Follow::getFromUser)
                .collect(toList());

        List<FollowerInfo> followDTO = followUsers.stream()
                .map(o -> new FollowerInfo(o, mainCharacter))
                .collect(toList());
        return followDTO;
    }


    @Transactional
    public void deleteFollower(Long toUserId) {
        User user = getUser.getUser();

        // 현재 사용자가 다른 사용자를 팔로우한 경우를 삭제
        followRepository.deleteByFromUserUserIdAndToUserUserId(user.getUserId(), toUserId);

        // 다른 사용자가 현재 사용자를 팔로우한 경우를 삭제
        followRepository.deleteByFromUserUserIdAndToUserUserId(toUserId, user.getUserId());
    }

}
