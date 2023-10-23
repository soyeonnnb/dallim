package com.b208.dduishu.domain.user.dto.request;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfo {

    private Long userId;
    private String nickname;
    private int point;
    private int level;

    public UserInfo(User user) {
        this.userId = user.getUserId();
        this.nickname = user.getNickname();
        this.point = user.getPoint();
        this.level = user.getLevel();
    }
}
