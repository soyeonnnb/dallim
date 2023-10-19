package com.b208.dduishu.domain.character.service;

import static java.util.stream.Collectors.*;

import java.util.List;

import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.domain.character.dto.request.MainCharacterInfo;
import org.springframework.stereotype.Service;

import com.b208.dduishu.domain.character.dto.request.CharacterInfo;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final GetUser getUser;

    public List<CharacterInfo> getCharacterInfo() {
        User user = getUser.getUser();

        System.out.println(user.getUserId());

        List<Character> findAllCharacterInfo = characterRepository.findAllCharacterInfo(user.getUserId());

        List<CharacterInfo> collect = findAllCharacterInfo.stream()
                .map(o -> new CharacterInfo(o))
                .collect(toList());

        return collect;
    }

    @Transactional
    public void updateMainCharacter(MainCharacterInfo req) {
        User user = getUser.getUser();

        List<Character> findCharacters = characterRepository.findAllByUserUserId(user.getUserId());

        findCharacters
                .stream()
                .forEach(o -> {
                    if (o.isMainCharacter() == true) {
                        o.setMainCharacter(false);
                    }
                    if (o.getId() == req.getCharacterId()) {
                        o.setMainCharacter(true);
                    }
                });

    }

    public CharacterInfoDetail getCharacterInfoDetail(Long id) {

        Character character = characterRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        return new CharacterInfoDetail(character);
    }
}
