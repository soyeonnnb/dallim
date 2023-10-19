package com.b208.dduishu.domain.follow.dto.request;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Data;

@Data
public class CreateFollowInfo {

    private Long fromUserId;
    private Long toUserId;
}
