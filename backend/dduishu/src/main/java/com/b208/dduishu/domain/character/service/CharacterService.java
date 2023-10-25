package com.b208.dduishu.domain.character.service;

import static java.util.stream.Collectors.*;

import java.util.List;

import com.b208.dduishu.domain.character.dto.request.CharacterId;
import com.b208.dduishu.domain.character.dto.request.CharacterInfoDetail;
import com.b208.dduishu.domain.character.dto.response.CharacterInfoResult;
import com.b208.dduishu.domain.character.entity.CharacterLevel;
import com.b208.dduishu.domain.character.exception.InsufficientPointsException;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.characterInfo.repository.CharacterInfoRepository;
import com.b208.dduishu.domain.thema.dto.response.ThemaOverview;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import com.b208.dduishu.domain.thema.service.ThemaService;
import org.springframework.stereotype.Service;
import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.character.dto.request.PurchaseCharacterName;
import lombok.RequiredArgsConstructor;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private static final List<CharacterName> baseCharacterNames = List.of(CharacterName.RABBIT, CharacterName.Penguin, CharacterName.Panda, CharacterName.Chicken);

    private final CharacterRepository characterRepository;
    private final CharacterInfoRepository characterInfoRepository;
    private final ThemaService themaService;
    private final GetUser getUser;


    public CharacterInfoResult getCharacterInfo() {
        User user = getUser.getUser();

        System.out.println(user.getUserId());

        // 나의 캐릭터 정보 가져오기
        List<Character> findAllCharacterInfo = characterRepository.findAllCharacterInfo(user.getUserId());

        List<CharacterName> characterNames = findAllCharacterInfo.stream()
                .map(o -> o.getCharacterInfo().getName())
                .collect(toList());

        // entity to dto
        List<CharacterOverview> characterInfos = findAllCharacterInfo.stream()
                .map(o -> new CharacterOverview(o))
                .collect(toList());

        // mainCharacter, mainThema 찾기
        final Object[] names = new Object[2];
        names[0] = CharacterName.RABBIT;
        names[1] = ThemaName.EARTH;
        characterInfos.stream()
                        .forEach(o -> {
                            if (o.isMainCharacter() == true) {
                                names[0] = o.getName();
                            }
                        });

        List<ThemaOverview> allThemaInfo = themaService.getAllThemaInfo();
        allThemaInfo.stream()
                        .forEach(o -> {
                            if (o.isMainThema() == true) {
                                names[1] = o.getName();
                            }
                        });
        // 기본 캐릭터 중 없는 캐릭터 넣기
        baseCharacterNames.stream()
                        .forEach(o -> {
                            if(!characterNames.contains(o)) {
                                characterInfos.add(CharacterOverview.builder().name(o).build());
                            }
                        });


        return CharacterInfoResult.builder().characterName((CharacterName) names[0]).themaName((ThemaName) names[1]).characterInfo(characterInfos).build();
    }

    @Transactional
    public void updateMainCharacter(CharacterId req) {
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


    @Transactional
    public void purchaseCharacter(PurchaseCharacterName req) {
        User user = getUser.getUser();

        CharacterInfo findCharacterInfo = characterInfoRepository.findByName(req.getCharacterName());

        int price = findCharacterInfo.getPrice();
        int point = user.getPoint();
        if (isPossiblePurchase(price, point)) {
            user.reducePoint(price);
            Character build = Character.builder()
                    .user(user)
                    .characterInfo(findCharacterInfo)
                    .characterLevel(CharacterLevel.builder().level(0).exp(0).build())
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
