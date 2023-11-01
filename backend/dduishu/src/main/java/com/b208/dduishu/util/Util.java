package com.b208.dduishu.util;


import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.entity.PlanetName;
import com.b208.dduishu.domain.user.entity.User;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class Util {
    private static final Map<CharacterName, Integer> characterNameToValue = Map.of(
            CharacterName.RABBIT, 0,
            CharacterName.Penguin, 1,
            CharacterName.Panda, 2,
            CharacterName.Chicken, 3
    );

    public static int getCharacterIndexByCharacter(Character character) {
        if (character.getCharacterInfo().getName().equals(CharacterName.RABBIT)) {
            return 0;
        } else if (character.getCharacterInfo().getName().equals(CharacterName.Penguin)) {
            return 1;
        } else if (character.getCharacterInfo().getName().equals(CharacterName.Panda)) {
            return 2;
        } else if (character.getCharacterInfo().getName().equals(CharacterName.Chicken)) {
            return 3;
        }
        return 0;
    }

    public static int getCharacterIndexByCharacterName(CharacterName name) {

        if (name.equals(CharacterName.RABBIT)) {
            return 0;
        } else if (name.equals(CharacterName.Penguin)) {
            return 1;
        } else if (name.equals(CharacterName.Panda)) {
            return 2;
        } else if (name.equals(CharacterName.Chicken)) {
            return 3;
        }
        return 0;
    }

    public static int getMainPlanetIndex(Planet planet) {
        if (planet.getPlanetInfo().getName().equals(PlanetName.BLACK)) {
            return 0;
        } else if (planet.getPlanetInfo().getName().equals(PlanetName.YELLOW)) {
            return 1;
        } else if (planet.getPlanetInfo().getName().equals(PlanetName.BLUE)) {
            return 2;
        } else if (planet.getPlanetInfo().getName().equals(PlanetName.PUPPLE)) {
            return 3;
        } else if (planet.getPlanetInfo().getName().equals(PlanetName.RED)) {
            return 4;
        }
        return 0;
    }

    public static int getMainPlanetIndexByName(PlanetName planetName) {
        if (planetName.equals(PlanetName.BLACK)) {
            return 0;
        } else if (planetName.equals(PlanetName.YELLOW)) {
            return 1;
        } else if (planetName.equals(PlanetName.BLUE)) {
            return 2;
        } else if (planetName.equals(PlanetName.PUPPLE)) {
            return 3;
        } else if (planetName.equals(PlanetName.RED)) {
            return 4;
        }
        return 0;
    }

    public static int getProfileIndexByUser(User user) {
        return user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .map(character -> characterNameToValue.getOrDefault(character.getCharacterInfo().getName(), 0))
                .findFirst()
                .orElse(0);
    }

}
