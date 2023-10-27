package com.b208.dduishu.domain.user.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
public class UserProfile {

    private int profileIndex;
    private String nickname;
    private int level;
    private int exp;
    private int curExp;
    private int EndExp;
    private int cumulativeDistance;
    private int cumulativeWeekDistance;

    @Builder
    public UserProfile(int profileIndex, String nickname, int level, int exp, int curExp, int endExp, int cumulativeDistance, int cumulativeWeekDistance) {
        this.profileIndex = profileIndex;
        this.nickname = nickname;
        this.level = level;
        this.exp = exp;
        this.curExp = curExp;
        EndExp = endExp;
        this.cumulativeDistance = cumulativeDistance;
        this.cumulativeWeekDistance = cumulativeWeekDistance;
    }
}
