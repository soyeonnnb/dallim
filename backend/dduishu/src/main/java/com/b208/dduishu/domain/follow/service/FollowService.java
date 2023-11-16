package com.b208.dduishu.domain.follow.service;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.follow.dto.request.AcceptFollowerinfo;
import com.b208.dduishu.domain.follow.dto.request.CreateFollowerInfo;
import com.b208.dduishu.domain.follow.dto.request.FollowerInfo;
import com.b208.dduishu.domain.follow.dto.request.RejectFollowerinfo;
import com.b208.dduishu.domain.follow.entity.Follow;
import com.b208.dduishu.domain.follow.entity.FollowState;
import com.b208.dduishu.domain.follow.exception.CreateFollowerNotPossibleException;
import com.b208.dduishu.domain.follow.exception.FollowDuplicateException;
import com.b208.dduishu.domain.follow.exception.RejectFollowerNotPossibleException;
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

        boolean isDuplicate = checkDuplicate(user.getUserId(), req.getToUserId());

        if (isDuplicate) {
            throw new FollowDuplicateException();
        }
        if (user.getUserId() == req.getToUserId()) {
            throw new CreateFollowerNotPossibleException();
        }

        User toUser = userRepository.findByUserId(req.getToUserId());

        Follow follow = Follow.builder()
                .fromUser(user)
                .toUser(toUser)
                .createdAt(LocalDateTime.now())
                .state(FollowState.waiting)
                .build();

        followRepository.save(follow);

    }

    @Transactional
    public boolean checkDuplicate(Long fromUserId, Long toUserId) {

        Follow res = followRepository.findByFromUserUserIdAndToUserUserId(fromUserId, toUserId);

        Follow alreadyFriends1 = followRepository.findByFromUserUserIdAndToUserUserIdAndState(fromUserId, toUserId, FollowState.accept);
        Follow alreadyFriends2 = followRepository.findByFromUserUserIdAndToUserUserIdAndState(toUserId, fromUserId, FollowState.accept);
        Follow alreadyFriends3 = followRepository.findByFromUserUserIdAndToUserUserIdAndState(fromUserId, toUserId, FollowState.waiting);
        Follow alreadyFriends4 = followRepository.findByFromUserUserIdAndToUserUserIdAndState(toUserId, fromUserId, FollowState.waiting);
        if (res != null || alreadyFriends1 != null || alreadyFriends2 != null || alreadyFriends3 != null || alreadyFriends4 != null) {
            return true;
        }
        return false;
    }

    @Transactional
    public void acceptFollow(AcceptFollowerinfo req) {
        User user = getUser.getUser();

        Follow followToMe = followRepository.findByFromUserUserIdAndToUserUserIdAndState(req.getToUserId(), user.getUserId(), FollowState.waiting);
        Follow followFromMe = followRepository.findByFromUserUserIdAndToUserUserIdAndState(user.getUserId(), req.getToUserId(), FollowState.waiting);
        if (followToMe != null) {
            followToMe.setState(FollowState.accept);
        }
        if (followFromMe != null) {
            followFromMe.setState(FollowState.accept);
        }
    }

    @Transactional
    public void rejectFollow(RejectFollowerinfo req) {
        User user = getUser.getUser();

        Follow follow = followRepository.findByFromUserUserIdAndToUserUserIdAndState(req.getToUserId(), user.getUserId(), FollowState.waiting);

        if (follow == null) {
            throw new RejectFollowerNotPossibleException();
        }
        follow.setState(FollowState.reject);
    }



    public List<FollowerInfo> getAllFollowInfo() {
        User user = getUser.getUser();

        // toUser로서의 팔로우 리스트
        List<Follow> toUserFollows = followRepository.findAllByToUserUserIdAndState(user.getUserId(), FollowState.accept);
        // fromUser로서의 팔로우 리스트
        List<Follow> fromUserFollows = followRepository.findAllByFromUserUserIdAndState(user.getUserId(), FollowState.accept);

        // 두 리스트를 합쳐 중복을 제거한 User Set을 생성
        Set<User> allFriends = new HashSet<>();

        toUserFollows.forEach(follow -> allFriends.add(follow.getFromUser()));
        fromUserFollows.forEach(follow -> allFriends.add(follow.getToUser()));

        // Set 내의 모든 사용자를 FollowerInfo 리스트로 변환
        return allFriends.stream()
                .map(o -> {
                    Character mainCharacter = o.getCharacterList().stream()
                            .filter(Character::isMainCharacter)
                            .findFirst()
                            .orElse(null);
                    return new FollowerInfo(o, mainCharacter);
                })
                .collect(Collectors.toList());
    }


    public List<FollowerInfo> getAllWatingFollowInfo() {
        User user = getUser.getUser();

        // fromUser가 아니라 toUser 기준으로 조회하며 state가 waiting인 것만 필터링
        List<Follow> waitingFollows = followRepository.findAllByToUserUserIdAndState(user.getUserId(), FollowState.waiting);


        List<User> followUsers = waitingFollows.stream()
                .map(Follow::getFromUser)
                .collect(toList());

        List<FollowerInfo> followDTO = followUsers.stream()
                .map(o -> {
                    Character mainCharacter = o.getCharacterList().stream()
                            .filter(Character::isMainCharacter)
                            .findFirst()
                            .orElse(null);
                    return new FollowerInfo(o, mainCharacter);
                })
                .collect(toList());
        return followDTO;
    }


    @Transactional
    public void deleteFollower(Long toUserId) {
        User user = getUser.getUser();

        // 현재 사용자가 다른 사용자를 팔로우한 경우를 삭제
        followRepository.deleteByFromUserUserIdAndToUserUserIdAndState(user.getUserId(), toUserId, FollowState.accept);

        // 다른 사용자가 현재 사용자를 팔로우한 경우를 삭제
        followRepository.deleteByFromUserUserIdAndToUserUserIdAndState(toUserId, user.getUserId(), FollowState.accept);
    }

}
