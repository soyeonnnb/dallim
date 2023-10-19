package com.b208.dduishu.domain.character.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.entity.CharacterState;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
public class CharacterInfoDetail {

    private final static int FIRST_STEP = 1;
    private final static int SECOND_STEP = 2;
    private final static int THIRD_STEP = 3;

    private Long id;
    private String imageUrl;
    private String name;
    private CharacterState state;
    private int level;
    private Long exp;
    private boolean isMainCharacter;


    @Builder
    public CharacterInfoDetail(Character character) {
        this.id = character.getId();
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
