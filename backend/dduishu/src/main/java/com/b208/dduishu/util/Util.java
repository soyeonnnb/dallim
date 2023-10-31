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
        return -1;
    }

    public static int getThemaIndexByCharacter(Planet planet) {
        if (planet.getPlanetInfo().getName().equals(PlanetName.EARTH)) {
            return 0;
        } else if (planet.getPlanetInfo().getName().equals(PlanetName.MOON)) {
            return 1;
        }
        return -1;
    }

    public static int getProfileIndexByUser(User user) {
        return user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .map(character -> characterNameToValue.getOrDefault(character.getCharacterInfo().getName(), -1))
                .findFirst()
                .orElse(-1);
    }

    public static int getMainThemaIndex(Planet planet) {
        if (planet.getPlanetInfo().getName().equals(PlanetName.EARTH)) {
            return 0;
        } else if (planet.getPlanetInfo().getName().equals(PlanetName.MOON)) {
            return 1;
        }
        return -1;
    }
}
