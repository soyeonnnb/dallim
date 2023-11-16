package com.b208.dduishu.domain.character.repository;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.entity.CharacterLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CharacterLevelRepository extends JpaRepository<CharacterLevel, Long> {
}
