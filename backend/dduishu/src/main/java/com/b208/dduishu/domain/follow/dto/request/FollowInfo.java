package com.b208.dduishu.domain.follow.dto.request;

import lombok.Data;

@Data
public class FollowInfo {

    private Long fromUserId;
    private Long toUserId;
}
