package com.b208.dduishu.domain.character.service;

import java.util.List;

import com.b208.dduishu.domain.character.dto.request.CharacterIndex;
import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.domain.character.dto.request.PurchaseCharacterIndex;
import com.b208.dduishu.domain.character.entity.CharacterLevel;
import com.b208.dduishu.domain.character.exception.InsufficientPointsException;
import com.b208.dduishu.domain.character.repository.CharacterLevelRepository;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.characterInfo.repository.CharacterInfoRepository;
import com.b208.dduishu.domain.planet.service.PlanetService;
import com.b208.dduishu.util.Util;
import org.springframework.stereotype.Service;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private static final List<CharacterName> baseCharacterNames = List.of(CharacterName.RABBIT, CharacterName.Penguin, CharacterName.Panda, CharacterName.Chicken);

    private final CharacterRepository characterRepository;
    private final CharacterInfoRepository characterInfoRepository;
    private final PlanetService themaService;
    private final GetUser getUser;
    private final CharacterLevelRepository characterLevelRepository;

    @Transactional
    public void updateMainCharacter(CharacterIndex req) {
        User user = getUser.getUser();

        List<Character> findCharacters = characterRepository.findAllByUserUserId(user.getUserId());

        findCharacters
                .stream()
                .forEach(o -> {
                    if (o.isMainCharacter() == true) {
                        o.setMainCharacter(false);
                    }
                    if (o.getCharacterInfo().getId()-1 == req.getCharacterIndex()) {
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


    @Transactional
    public void purchaseCharacter(PurchaseCharacterIndex req) {
        User user = getUser.getUser();

        CharacterName characterName = Util.getCharacterNameByIndex(req.getCharacterIndex());

        CharacterInfo findCharacterInfo = characterInfoRepository.findByName(characterName);

        int price = findCharacterInfo.getPrice();
        int point = user.getPoint();
        if (isPossiblePurchase(price, point)) {
            user.reducePoint(price);
            CharacterLevel characterLevel = CharacterLevel.builder().level(1).exp(0).build();
            CharacterLevel savedCharacterLevel = characterLevelRepository.save(characterLevel);
            Character build = Character.builder()
                    .user(user)
                    .characterInfo(findCharacterInfo)
                    .characterLevel(savedCharacterLevel)
                    .isMainCharacter(false)
                    .build();
            characterRepository.save(build);
        } else {
            throw new InsufficientPointsException();
        }
    }

    private boolean isPossiblePurchase(int price, int point) {
        if (price > point) {
            return false;
        } else {
            return true;
        }
    }
}
