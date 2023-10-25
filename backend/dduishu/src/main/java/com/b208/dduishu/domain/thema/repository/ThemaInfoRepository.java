package com.b208.dduishu.domain.thema.repository;

import com.b208.dduishu.domain.thema.entity.ThemaInfo;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemaInfoRepository extends JpaRepository<ThemaInfo, Long> {

    ThemaInfo findByName(ThemaName name);
}
