package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Builder;
import lombok.Data;

@Data
public class WatchUserInfo {

    private Long userId;
    private Long characterId;
    private int characterIndex;
    private int planetIndex;
    private String nickName;
    private String email;
    private int level;

    @Builder
    public WatchUserInfo(User user, Character character, Planet planet) {
        this.userId = user.getUserId();
        this.characterId = character.getId();
        this.characterIndex = Util.getCharacterIndexByCharacter(character);
        this.planetIndex = Util.getMainPlanetIndex(planet);
        this.nickName = user.getNickname();
        this.email = user.getEmail();
        this.level = user.getUserLevel().getLevel();
    }
}
