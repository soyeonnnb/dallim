package com.b208.dduishu.domain.character.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.entity.CharacterState;

import lombok.Data;

@Data
public class CharacterInfo {

    private final static int URL_ONE = 1;
    private final static int URL_TWO = 2;
    private final static int URL_THREE = 3;

    private Long characterId;
    private String imageUrl;
    private String name;
    private CharacterState state;
    private int level;
    private Long exp;
    private boolean isMainCharacter;

    public CharacterInfo(Character character) {
        this.characterId = character.getId();
        this.imageUrl = findImageUrl(character);
        this.name = character.getCharacterInfo().getName();
        this.state = character.getState();
        this.level = character.getLevel();
        this.exp = character.getExp();
        this.isMainCharacter = character.isMainCharacter();
    }

    private String findImageUrl(Character character) {
        int level = character.getLevel();

        int step = findCharacterStep(level);

        if ( 1 <= step && step <= 20) {
            return character.getCharacterInfo().getFirstGifUrl();
        } else if ( 21 <= step && step <= 40 ) {
            return character.getCharacterInfo().getSecondGifUrl();
        } else {
            return character.getCharacterInfo().getThirdGifUrl();
        }
    }

    private int findCharacterStep(int level) {
        if ( 1 <= level && level <= 20) {
            return URL_ONE;
        } else if ( 21 <= level && level <= 40 ) {
            return URL_TWO;
        } else {
            return URL_THREE;
        }
    }

}
