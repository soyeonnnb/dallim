package com.b208.dduishu.domain.runningRecord.dto;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.user.entity.BaseLevel;
import com.b208.dduishu.util.Util;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CharacterRecordInfo {

    private Long characterId;
    private int characterIndex;
    private int planetIndex;
    private int level;
    private int exp;
    private int evolutionStage;

    public CharacterRecordInfo(Character character, Planet planet) {
        this.characterId = character.getId();
        this.characterIndex = Util.getCharacterIndexByCharacter(character);
        this.planetIndex = Util.getMainPlanetIndex(planet);
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
}
