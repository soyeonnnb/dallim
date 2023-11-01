package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
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
    private int planetIndex;
    private String nickname;
    private int level;
    private int exp;
//    @JsonProperty("isFollower")
//    private boolean isFollower;
    private List<RunningRecordOverview> runningRecordOverviews;

    @Builder
    public UserProfile(User user, BaseLevel.LevelInfo levelInfo, List<Planet> planets, List<RunningRecordOverview> runningRecordOverviews) {
        this.characterIndex = Util.getCharacterIndexByUser(user);
        this.planetIndex = Util.getPlanetIndexByPlanets(planets);
        this.nickname = user.getNickname();
        this.level = user.getUserLevel().getLevel();
        this.exp = levelInfo.getExp();
//        this.isFollower = followers.stream()
//                .anyMatch(f -> f.getUserId().equals(this.userId));
        this.runningRecordOverviews = runningRecordOverviews;
    }
}
