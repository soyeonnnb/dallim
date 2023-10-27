package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Data;

import java.util.concurrent.atomic.AtomicInteger;

@Data
public class CompareUserProfile {

    private int myProfileIndex;
    private String myNickName;
    private int myLevel;
    private int pairProfileIndex;
    private String pairNickName;
    private int pairLevel;

    private int myDay;
    private int pairDay;
    private int myTime;
    private int pairTime;
    private int myDistance;
    private int pairDistance;
    private int mySpeed;
    private int pairSpeed;

    public CompareUserProfile(User user , User pair) {
        this.myProfileIndex = getProfileIndex(user);
        this.myNickName = user.getNickname();
        this.myLevel = user.getUserLevel().getLevel();
        this.pairProfileIndex = getProfileIndex(pair);
        this.pairNickName = pair.getNickname();
        this.pairLevel = pair.getUserLevel().getLevel();
        this.myDay = getPercent(user.getCumulativeDay(), pair.getCumulativeDay());
        this.pairDay = getPercent(pair.getCumulativeDay(), user.getCumulativeDay());
        this.myTime = getPercent(user.getCumulativeRunningTime(), pair.getCumulativeRunningTime());
        this.pairTime = getPercent(pair.getCumulativeRunningTime(), user.getCumulativeRunningTime());
        this.myDistance = getPercent(user.getCumulativeDistance(), pair.getCumulativeDistance());
        this.pairDistance = getPercent(pair.getCumulativeDistance(), user.getCumulativeDistance());
        this.mySpeed = getPercent(user.getAverageSpeed(), pair.getAverageSpeed());
        this.pairSpeed = getPercent(pair.getAverageSpeed(), user.getAverageSpeed());
    }

    private int getProfileIndex(User user) {
        AtomicInteger ret = new AtomicInteger(-1);
        user.getCharacterList().stream()
                .forEach(o -> {
                    if (o.isMainCharacter() == true) {
                        if (o.getCharacterInfo().getName().equals(CharacterName.RABBIT)) {
                            ret.set(0);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Penguin)) {
                            ret.set(1);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Panda)) {
                            ret.set(2);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Chicken)) {
                            ret.set(3);
                        }
                    }
                });
        return ret.get();
    }

    private int getPercent(int me, int pair) {
        return (int)((double) me / (me + pair) * 100 + 0.5);
    }
}
