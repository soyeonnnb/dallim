package com.b208.dduishu.domain.user.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserRankingInfo {

    private Long userId;
    private int characterIndex;
    private int evolutionStage;
    private String nickname;
    private double cumulativeDistance;
    private int level;
    private boolean isFollower;

    public UserRankingInfo(RunningRecord runningRecord, User user) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.cumulativeDistance = runningRecord.getTotalDistance();
        this.level = user.getUserLevel().getLevel();
        this.isFollower = true;
        Character mainCharacter = getMainCharacter(user);
        if (mainCharacter != null) {
            this.characterIndex = Util.getCharacterIndexByCharacter(mainCharacter);
            this.evolutionStage = Util.getEvolutionStage(mainCharacter.getCharacterLevel().getLevel());
        }
    }

    public UserRankingInfo(RunningRecord runningRecord, User user, List<User> follower) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.cumulativeDistance = runningRecord.getTotalDistance();
        this.level = user.getUserLevel().getLevel();
        this.isFollower = follower.stream()
                .anyMatch(f -> f.getUserId().equals(this.userId));
        Character mainCharacter = getMainCharacter(user);
        if (mainCharacter != null) {
            this.characterIndex = Util.getCharacterIndexByCharacter(mainCharacter);
            this.evolutionStage = Util.getEvolutionStage(mainCharacter.getCharacterLevel().getLevel());
        }
    }

    public Character getMainCharacter(User user) {
        return user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);
    }
}
