package com.b208.dduishu.domain.character.dto.request;

import com.b208.dduishu.domain.character.entity.Character;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.user.entity.BaseLevel;
import com.b208.dduishu.util.Util;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterOverview {

    private int characterIndex;
    @JsonProperty("isPurchased")
    private boolean isPurchased;
    private int level;
    private int exp;
    private int evolutionStage;


    @Builder
    public CharacterOverview(CharacterName name) {
        this.characterIndex = getCharacterIndex(name);
        this.isPurchased = false;
        this.level = -1;
        this.exp = -1;
        this.evolutionStage = -1;
    }

    public CharacterOverview(Character character) {
        this.characterIndex = Util.getCharacterIndexByCharacter(character);
        this.isPurchased = true;
        this.level = character.getCharacterLevel().getLevel();
        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(character.getCharacterLevel().getExp());
        this.exp = levelInfo.getExp();
        this.evolutionStage = getEvolutionStage(character.getCharacterLevel().getLevel());
    }

    public int getEvolutionStage(int level) {
        if (level < 10) {
            return 0;
        } else {
            return 1;
        }
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
}
