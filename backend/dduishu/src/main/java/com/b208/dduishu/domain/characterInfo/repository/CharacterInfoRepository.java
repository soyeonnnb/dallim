package com.b208.dduishu.domain.characterInfo.repository;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterInfoRepository extends JpaRepository<CharacterInfo, Long> {

    CharacterInfo findByName(CharacterName name);
}
