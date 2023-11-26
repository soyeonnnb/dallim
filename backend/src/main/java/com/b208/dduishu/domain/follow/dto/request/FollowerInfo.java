package com.b208.dduishu.domain.follow.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Data;

@Data
public class FollowerInfo {

    private Long userId;
    private int characterIndex;
    private int evolutionStage;
    private String nickname;
    private int level;

    public FollowerInfo(User user, Character character) {
        this.userId = user.getUserId();
        if (character != null) {
            this.characterIndex = Util.getCharacterIndexByCharacter(character);
            this.evolutionStage = Util.getEvolutionStage(character.getCharacterLevel().getLevel());
        }
        this.nickname = user.getNickname();
        this.level = user.getUserLevel().getLevel();
    }
}
