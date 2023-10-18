package com.b208.dduishu.domain.user.repository;

import java.util.Optional;

import com.b208.dduishu.domain.user.dto.response.IsDuplicateNickName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.b208.dduishu.domain.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndAccountType(String email, String provider);

    Optional<User> findByUserId(Long userId);

    Optional<User> findByPrivateAccess(String access);

    boolean existsByNickname(String nickname);
}
