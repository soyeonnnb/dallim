package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.planet.dto.response.PlanetOverview;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserEditPageInfo {

    private int point;
    private int mainCharacterIndex;
    private int mainPlanetIndex;
    private List<CharacterOverview> characters;
    private List<PlanetOverview> planets;

    @Builder
    public UserEditPageInfo(User user, Character character, Planet planet, List<CharacterOverview> characters, List<PlanetOverview> planets) {
        this.point = user.getPoint();
        this.mainCharacterIndex = Util.getCharacterIndexByCharacter(character);
        this.mainPlanetIndex = Util.getMainPlanetIndex(planet);
        this.characters = characters;
        this.planets = planets;
    }
}
