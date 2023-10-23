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

    public UserRankingInfo(RunningRecord runningRecord) {
        this.userId = runningRecord.getUser().getUserId();
        this.nickname = runningRecord.getUser().getNickname();
        this.cumulativeDistance = runningRecord.getTotalDistance();
        this.level = runningRecord.getUser().getLevel();
    }
}
