package com.b208.dduishu.domain.character.dto.request;

import com.b208.dduishu.domain.character.entity.Character;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.user.entity.BaseLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterOverview {

    private final static int FIRST_STEP = 1;
    private final static int SECOND_STEP = 2;
    private final static int THIRD_STEP = 3;

    private Long characterId;
    private int characterIndex;
    private CharacterName name;
    private boolean isMainCharacter;
    private boolean isPurchased;
    private int level;
    private int exp;

    @Builder
    public CharacterOverview(CharacterName name) {
        this.characterId = -1L;
        this.characterIndex = getCharacterIndex(name);
        this.name = name;
        this.isMainCharacter = false;
        this.isPurchased = false;
        this.level = -1;
        this.exp = -1;
    }

    public CharacterOverview(Character character) {
        this.characterId = character.getId();
        this.characterIndex = getCharacterIndex(character.getCharacterInfo().getName());
        this.name = character.getCharacterInfo().getName();
        this.isMainCharacter = character.isMainCharacter();
        this.isPurchased = true;
        this.level = character.getCharacterLevel().getLevel();
        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(character.getCharacterLevel().getExp());
        this.exp = levelInfo.getExp();
    }

    private int getCharacterIndex(CharacterName name) {

        if (name.equals(CharacterName.RABBIT)) {
            return 0;
        } else if (name.equals(CharacterName.Penguin)) {
            return 1;
        } else if (name.equals(CharacterName.Panda)) {
            return 2;
        } else if (name.equals(CharacterName.Chicken)) {
            return 3;
        }
        return -1;
    }

    private String findImageUrl(Character character) {
        int level = character.getCharacterLevel().getLevel();

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
