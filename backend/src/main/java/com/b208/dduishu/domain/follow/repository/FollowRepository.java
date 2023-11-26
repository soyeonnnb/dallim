package com.b208.dduishu.domain.follow.repository;

import com.b208.dduishu.domain.follow.entity.Follow;
import com.b208.dduishu.domain.follow.entity.FollowState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAllByFromUserUserId(Long userId);

    Follow findByFromUserUserIdAndToUserUserId(Long fromUserId, Long toUserId);

    List<Follow> findAllByFromUserUserIdAndState(Long userId, FollowState state);

    Follow findByFromUserUserIdAndToUserUserIdAndState(Long fromUserId, Long toUserId, FollowState state);

    @Query("select distinct f from Follow f join fetch f.toUser tu join fetch f.fromUser u join fetch u.characterList c join fetch c.characterInfo ci join fetch c.characterLevel cl join fetch u.userLevel ul where f.toUser.userId = :toUserId and f.state = :state")
    List<Follow> findAllByToUserUserIdAndState(Long toUserId, FollowState state);

    void deleteByFromUserUserIdAndToUserUserIdAndState(Long fromUserId, Long toUserId, FollowState state);
}
