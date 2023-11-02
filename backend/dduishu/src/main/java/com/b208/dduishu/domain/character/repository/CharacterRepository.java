package com.b208.dduishu.domain.character.repository;

import java.util.List;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.b208.dduishu.domain.character.entity.Character;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    @Query("select c from Character c join fetch c.characterInfo ci where c.user.userId = :userId")
    List<Character> findAllCharacterInfo(Long userId);


    List<Character> findAllByUserUserId(Long userId);
}
