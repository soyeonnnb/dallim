package com.b208.dduishu.domain.follow.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Data;

@Data
public class FollowerInfo {

    private Long userId;
    private int characterIndex;
    private String nickname;
    private int level;

    public FollowerInfo(User user) {
        this.userId = user.getUserId();
        this.characterIndex = Util.getCharacterIndexByUser(user);
        this.nickname = user.getNickname();
        this.level = user.getUserLevel().getLevel();
    }
}
