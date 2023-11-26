package com.b208.dduishu.domain.user.repository;

import java.util.List;
import java.util.Optional;

import com.b208.dduishu.domain.follow.entity.FollowState;
import com.b208.dduishu.domain.user.dto.response.IsDuplicateNickName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.b208.dduishu.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndAccountType(String email, String provider);

    @Query("select u from User u join fetch u.userLevel ul where u.userId = :userId")
    User findByUserIdAndUserLevel(Long userId);
    User findByUserId(Long userId);

    Optional<User> findByPrivateAccess(String access);

    boolean existsByNickname(String nickname);

    Optional<User> findByEmail(String email);

    @Query("SELECT distinct u FROM User u WHERE u.userId = :userId OR u.userId IN (SELECT f.toUser.userId FROM Follow f WHERE f.fromUser.userId = :userId AND f.state = :state)\n" +
            "OR u.userId IN (SELECT f.fromUser.userId FROM Follow f WHERE f.toUser.userId = :userId AND f.state = :state)")
    List<User> getUserIdAndFollowerIdAndState(Long userId, FollowState state);

    @Query("SELECT distinct u FROM User u WHERE u.userId IN (SELECT f.toUser.userId FROM Follow f WHERE f.fromUser.userId = :userId AND f.state = :state)\n" +
            "OR u.userId IN (SELECT f.fromUser.userId FROM Follow f WHERE f.toUser.userId = :userId AND f.state = :state)")
    List<User> getUserByFollowerUserId(Long userId, FollowState state);

    List<User> findByNicknameContaining(String nickname);
}
