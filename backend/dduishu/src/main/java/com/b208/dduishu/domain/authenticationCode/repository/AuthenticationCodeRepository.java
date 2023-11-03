package com.b208.dduishu.domain.authenticationCode.repository;

import com.b208.dduishu.domain.authenticationCode.entity.AuthenticationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationCodeRepository extends JpaRepository<AuthenticationCode, Long> {
    boolean existsByAuthCode(String authCode);

    AuthenticationCode findByAuthCode(String authCode);
}
