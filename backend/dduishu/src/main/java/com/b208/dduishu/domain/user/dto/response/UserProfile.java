package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.dto.request.SocialRunningRecordOverview;
import com.b208.dduishu.domain.user.entity.BaseLevel;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserProfile {

    private int characterIndex;
    private int evolutionStage;
    private int planetIndex;
    private String nickname;
    private int level;
    private int exp;
//    @JsonProperty("isFollower")
//    private boolean isFollower;
    private List<SocialRunningRecordOverview> runningRecordOverviews;

    @Builder
    public UserProfile(User user, Character character, BaseLevel.LevelInfo levelInfo, List<Planet> planets, List<SocialRunningRecordOverview> runningRecordOverviews) {
        this.characterIndex = Util.getCharacterIndexByUser(user);
        this.evolutionStage = getEvolutionStage(character.getCharacterLevel().getLevel());
        this.planetIndex = Util.getPlanetIndexByPlanets(planets);
        this.nickname = user.getNickname();
        this.level = user.getUserLevel().getLevel();
        this.exp = levelInfo.getExp();
//        this.isFollower = followers.stream()
//                .anyMatch(f -> f.getUserId().equals(this.userId));
        this.runningRecordOverviews = runningRecordOverviews;
    }

    public int getEvolutionStage(int level) {
        if (level < 10) {
            return 0;
        } else {
            return 1;
        }
    }
}
