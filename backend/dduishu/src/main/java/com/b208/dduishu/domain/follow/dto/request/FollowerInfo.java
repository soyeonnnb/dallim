package com.b208.dduishu.domain.follow.dto.request;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Data;

@Data
public class FollowerInfo {

    private String nickname;
    private int level;
    private String imageUrl;

    public FollowerInfo(User user) {
        System.out.println("111");
        this.nickname = user.getNickname();
        this.level = user.getLevel();
        this.imageUrl = user.getCharacterList()
                            .stream()
                            .filter(Character::isMainCharacter)
                            .map(o -> {
                                if (1 <= o.getLevel() && o.getLevel() <= 20) {
                                    return o.getCharacterInfo().getFirstGifUrl();
                                } else if (21 <= o.getLevel() && o.getLevel() <= 40) {
                                    return o.getCharacterInfo().getSecondGifUrl();
                                } else {
                                    return o.getCharacterInfo().getThirdGifUrl();
                                }
                            })
                            .findFirst()
                            .get();
    }
}
