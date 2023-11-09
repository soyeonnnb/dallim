package com.b208.dduishu.domain.fcm.repository;

import com.b208.dduishu.domain.fcm.entity.FcmToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FcmRepository extends JpaRepository<FcmToken, Long> {
}
