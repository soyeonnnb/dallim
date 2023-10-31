package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserProfile {

    private int characterIndex;
    private String nickname;
    private int level;
    private int exp;
//    @JsonProperty("isFollower")
//    private boolean isFollower;
    private List<RunningRecordOverview> runningRecordOverviews;

    @Builder
    public UserProfile(int characterIndex, String nickname, int level, int exp, List<User> followers, List<RunningRecordOverview> runningRecordOverviews) {
        this.characterIndex = characterIndex;
        this.nickname = nickname;
        this.level = level;
        this.exp = exp;
//        this.isFollower = followers.stream()
//                .anyMatch(f -> f.getUserId().equals(this.userId));
        this.runningRecordOverviews = runningRecordOverviews;
    }
}
