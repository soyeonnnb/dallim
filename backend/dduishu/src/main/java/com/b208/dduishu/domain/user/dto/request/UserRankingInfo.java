package com.b208.dduishu.domain.user.dto.request;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UserRankingInfo {

    private Long userId;
    private String nickname;
    private float cumulativeDistance;
    private int level;
    private boolean isFollower;

    public UserRankingInfo(RunningRecord runningRecord, User user) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.cumulativeDistance = runningRecord.getTotalDistance();
        this.level = user.getUserLevel().getLevel();
        this.isFollower = true;
    }

    public UserRankingInfo(RunningRecord runningRecord, User user, List<User> follower) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.cumulativeDistance = runningRecord.getTotalDistance();
        this.level = user.getUserLevel().getLevel();
        this.isFollower = follower.stream()
                .anyMatch(f -> f.getUserId().equals(this.userId));
    }
}
