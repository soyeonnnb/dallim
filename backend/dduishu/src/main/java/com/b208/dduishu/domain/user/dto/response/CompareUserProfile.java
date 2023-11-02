package com.b208.dduishu.domain.user.dto.response;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.util.Util;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;
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
    private float myDistance;
    private float pairDistance;
    private float mySpeed;
    private float pairSpeed;

    public CompareUserProfile(User user , User pair) {
        this.myProfileIndex = Util.getCharacterIndexByUser(user);
        this.myNickName = user.getNickname();
        this.myLevel = user.getUserLevel().getLevel();
        this.pairProfileIndex = Util.getCharacterIndexByUser(pair);
        this.pairNickName = pair.getNickname();
        this.pairLevel = pair.getUserLevel().getLevel();
        this.myDay = getPercent(user.getCumulativeRunningDay(), pair.getCumulativeRunningDay());
        this.pairDay = getPercent(pair.getCumulativeRunningDay(), user.getCumulativeRunningDay());
        this.myTime = getPercent(user.getCumulativeRunningTime(), pair.getCumulativeRunningTime());
        this.pairTime = getPercent(pair.getCumulativeRunningTime(), user.getCumulativeRunningTime());
        this.myDistance = getPercent(user.getCumulativeDistance(), pair.getCumulativeDistance());
        this.pairDistance = getPercent(pair.getCumulativeDistance(), user.getCumulativeDistance());
        this.mySpeed = getPercent(user.getAverageSpeed(), pair.getAverageSpeed());
        this.pairSpeed = getPercent(pair.getAverageSpeed(), user.getAverageSpeed());
    }

    private int getPercent(double me, double pair) {
        return (int)((double) me / (me + pair) * 100 + 0.5);
    }
}
