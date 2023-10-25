package com.b208.dduishu.domain.character.dto.response;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class CharacterInfoResult {

    private int mainCharacterIndex;
    private int mainThemaIndex;
    private List<CharacterOverview> characterInfo;

    @Builder
    public CharacterInfoResult(CharacterName characterName, ThemaName themaName, List<CharacterOverview> characterInfo) {
        this.mainCharacterIndex = getMainCharacterIndex(characterName);
        this.mainThemaIndex = getMainThemaIndex(themaName);
        this.characterInfo = characterInfo;
    }

    private int getMainCharacterIndex(CharacterName characterName){
        if (characterName.equals(CharacterName.RABBIT)) {
            return 0;
        } else if (characterName.equals(CharacterName.Penguin)) {
            return 1;
        } else if (characterName.equals(CharacterName.Panda)) {
            return 2;
        } else if (characterName.equals(CharacterName.Chicken)) {
            return 3;
        }
        return -1;
    }
    private int getMainThemaIndex(ThemaName themaName) {
        if (themaName.equals(ThemaName.EARTH)) {
            return 0;
        } else if (themaName.equals(ThemaName.MOON)) {
            return 1;
        }
        return -1;
    }
}
