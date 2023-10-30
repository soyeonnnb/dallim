package com.b208.dduishu.util;


import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.thema.entity.Thema;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import com.b208.dduishu.domain.user.entity.User;

import java.util.concurrent.atomic.AtomicInteger;

public class Util {

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

    public static int getThemaIndexByCharacter(Thema thema) {
        if (thema.getThemaInfo().getName().equals(ThemaName.EARTH)) {
            return 0;
        } else if (thema.getThemaInfo().getName().equals(ThemaName.MOON)) {
            return 1;
        }
        return -1;
    }

    public static int getProfileIndexByUser(User user) {
        AtomicInteger ret = new AtomicInteger(-1);
        user.getCharacterList().stream()
                .forEach(o -> {
                    if (o.isMainCharacter() == true) {
                        if (o.getCharacterInfo().getName().equals(CharacterName.RABBIT)) {
                            ret.set(0);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Penguin)) {
                            ret.set(1);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Panda)) {
                            ret.set(2);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Chicken)) {
                            ret.set(3);
                        }
                    }
                });
        return ret.get();
    }

    public static int getMainThemaIndex(Thema thema) {
        if (thema.getThemaInfo().getName().equals(ThemaName.EARTH)) {
            return 0;
        } else if (thema.getThemaInfo().getName().equals(ThemaName.MOON)) {
            return 1;
        }
        return -1;
    }
}
