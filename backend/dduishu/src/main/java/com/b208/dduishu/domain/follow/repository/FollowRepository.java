package com.b208.dduishu.domain.follow.repository;

import com.b208.dduishu.domain.follow.entity.Follow;
import com.b208.dduishu.domain.follow.entity.FollowState;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAllByFromUserUserId(Long userId);

    Follow findByFromUserUserIdAndToUserUserId(Long fromUserId, Long toUserId);

    List<Follow> findAllByFromUserUserIdAndState(Long userId, FollowState state);

    Follow findByFromUserUserIdAndToUserUserIdAndState(Long fromUserId, Long toUserId, FollowState state);

    List<Follow> findAllByToUserUserIdAndState(Long toUserId, FollowState state);


    void deleteByFromUserUserIdAndToUserUserIdAndState(Long fromUserId, Long toUserId, FollowState state);
}
