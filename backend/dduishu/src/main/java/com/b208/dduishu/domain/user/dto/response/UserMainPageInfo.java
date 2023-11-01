package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Builder;
import lombok.Data;

@Data
public class UserMainPageInfo {
    private String nickName;
    private int point;
    private int userLevel;
    private int characterIndex;
    private int evolutionStage;
    private int planetIndex;

    @Builder
    public UserMainPageInfo(User user, Character character, Planet planet) {
        this.nickName = user.getNickname();
        this.point = user.getPoint();
        this.userLevel = user.getUserLevel().getLevel();
        this.characterIndex = Util.getCharacterIndexByCharacter(character);
        this.evolutionStage = getEvolutionStage(character.getCharacterLevel().getLevel());
        this.planetIndex = Util.getMainPlanetIndex(planet);
    }

    public int getEvolutionStage(int level) {
        if (level < 10) {
            return 0;
        } else {
            return 1;
        }
    }
}
