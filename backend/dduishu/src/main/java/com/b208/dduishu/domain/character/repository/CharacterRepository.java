package com.b208.dduishu.domain.character.repository;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    @Query("select c from Character c join fetch c.characterInfo ci where c.user.userId = :userId")
    List<Character> findAllCharacterInfo(Long userId);
}
