package com.b208.dduishu.domain.character.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.entity.CharacterState;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterInfo {

    private final static int FIRST_STEP = 1;
    private final static int SECOND_STEP = 2;
    private final static int THIRD_STEP = 3;

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

        if (step == FIRST_STEP) {
            return character.getCharacterInfo().getFirstGifUrl();
        } else if (step == SECOND_STEP) {
            return character.getCharacterInfo().getSecondGifUrl();
        } else {
            return character.getCharacterInfo().getThirdGifUrl();
        }
    }

    private int findCharacterStep(int level) {
        if ( 1 <= level && level <= 20) {
            return FIRST_STEP;
        } else if ( 21 <= level && level <= 40 ) {
            return SECOND_STEP;
        } else {
            return THIRD_STEP;
        }
    }

}
