package com.b208.dduishu.domain.user.dto.request;

import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class UserRankingInfo {

    private Long userId;
    private String nickname;
    private int cumulativeDistance;
    private int level;

    public UserRankingInfo(RunningRecord runningRecord, User user) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.cumulativeDistance = runningRecord.getTotalDistance();
        this.level = user.getUserLevel().getLevel();
    }
}
