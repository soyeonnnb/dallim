package com.b208.dduishu.domain.thema.repository;

import com.b208.dduishu.domain.thema.entity.Thema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThemaRepository extends JpaRepository<Thema, Long> {

    List<Thema> findAllByUserUserId(Long userId);
}
