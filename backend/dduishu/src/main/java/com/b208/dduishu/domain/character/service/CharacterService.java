package com.b208.dduishu.domain.character.service;

import static java.util.stream.Collectors.*;

import java.util.List;

import org.springframework.stereotype.Service;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final GetUser getUser;

    public List<CharacterInfo> getCharacterInfo() {
        User user = getUser.getUser();

        List<Character> findAllCharacterInfo = characterRepository.findAllCharacterInfo(user.getUserId());

        List<CharacterInfo> collect = findAllCharacterInfo.stream()
                .map(o -> new CharacterInfo(o))
                .collect(toList());

        return collect;
    }
}
