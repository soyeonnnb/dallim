package com.b208.dduishu.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
public class UserProfile {

    private int characterIndex;
    private String nickname;
    private int level;
    private int exp;
    private boolean isFollower;
    private int curExp;
    private int EndExp;
    private float cumulativeDistance;
    private float cumulativeWeekDistance;

    @Builder
    public UserProfile(int characterIndex, String nickname, int level, int exp, boolean isFollower, int curExp, int endExp, float cumulativeDistance, float cumulativeWeekDistance) {
        this.characterIndex = characterIndex;
        this.nickname = nickname;
        this.level = level;
        this.exp = exp;
        this.isFollower = isFollower;
        this.curExp = curExp;
        EndExp = endExp;
        this.cumulativeDistance = cumulativeDistance;
        this.cumulativeWeekDistance = cumulativeWeekDistance;
    }
}
