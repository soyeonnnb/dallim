package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Data
public class SearchUserProfile {
    private Long userId;
    private int characterIndex;
    private int evolutionStage;
    private String nickname;
    private int level;
    @JsonProperty("isFollower")
    private boolean isFollower;

    @Builder
    public SearchUserProfile(User user, List<User> follower) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.characterIndex = Util.getCharacterIndexByUser(user);
        Character character = getMainCharacter(user);
        this.evolutionStage = Util.getEvolutionStage(character.getCharacterLevel().getLevel());
        this.level = user.getUserLevel().getLevel();
        this.isFollower = follower.stream()
                .anyMatch(f -> f.getUserId().equals(this.userId));
    }

    public Character getMainCharacter(User user) {
        return user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);
    }

}
