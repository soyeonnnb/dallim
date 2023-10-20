package com.b208.dduishu.domain.follow.repository;

import com.b208.dduishu.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAllByFromUserUserId(Long userId);

    void deleteByFromUserUserIdAndToUserUserId(Long fromUserId, Long toUserId);
}
