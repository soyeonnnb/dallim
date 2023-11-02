package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.user.dto.request.UserRankingInfo;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class AllUserRankingInfo {
    private int month;
    private int week;
    private List<UserRankingInfo> rankingInfos;

    @Builder
    public AllUserRankingInfo(int month, int week, List<UserRankingInfo> rankingInfos) {
        this.month = month;
        this.week = week;
        this.rankingInfos = rankingInfos;
    }
}
