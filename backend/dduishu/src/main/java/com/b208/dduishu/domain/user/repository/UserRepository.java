package com.b208.dduishu.domain.user.repository;

import java.util.List;
import java.util.Optional;

import com.b208.dduishu.domain.user.dto.response.IsDuplicateNickName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.b208.dduishu.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndAccountType(String email, String provider);

    Optional<User> findByUserId(Long userId);

    Optional<User> findByPrivateAccess(String access);

    boolean existsByNickname(String nickname);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.userId = :userId OR u.userId IN (SELECT f.toUser.userId FROM Follow f WHERE f.fromUser.userId = :userId)")
    List<User> getUserIdAndFollowerId(Long userId);

    @Query("SELECT u FROM User u WHERE u.userId IN (SELECT f.toUser.userId FROM Follow f WHERE f.fromUser.userId = :userId)")
    List<User> getUserByFollowerUserId(Long userId);

    List<User> findByNicknameContaining(String nickname);
}
