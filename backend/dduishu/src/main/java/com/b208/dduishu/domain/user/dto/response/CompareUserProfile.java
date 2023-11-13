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

    private int myCharacterIndex;
    private int myEvolutionStage;
    private String myNickName;
    private int myLevel;
    private int pairCharacterIndex;
    private int pairEvolutionStage;
    private String pairNickName;
    private int pairLevel;

    private int myDay;
    private int pairDay;
    private int myTime;
    private int pairTime;
    private double myDistance;
    private double pairDistance;
    private double mySpeed;
    private double pairSpeed;

    public CompareUserProfile(User user , Character mycharacter, User pair, Character paircharacter) {
        this.myCharacterIndex = Util.getCharacterIndexByUser(user);
        this.myEvolutionStage = Util.getEvolutionStage(mycharacter.getCharacterLevel().getLevel());
        this.myNickName = user.getNickname();
        this.myLevel = user.getUserLevel().getLevel();
        this.pairCharacterIndex = Util.getCharacterIndexByUser(pair);
        this.pairEvolutionStage = Util.getEvolutionStage(paircharacter.getCharacterLevel().getLevel());
        this.pairNickName = pair.getNickname();
        this.pairLevel = pair.getUserLevel().getLevel();
        this.myDay = user.getCumulativeRunningDay();
        this.pairDay = pair.getCumulativeRunningDay();
        this.myTime = user.getCumulativeRunningTime();
        this.pairTime = pair.getCumulativeRunningTime();
        this.myDistance = user.getCumulativeDistance();
        this.pairDistance = pair.getCumulativeDistance();
        this.mySpeed = user.getAverageSpeed();
        this.pairSpeed = pair.getAverageSpeed();
    }

    private int getPercent(double me, double pair) {
        return (int)((double) me / (me + pair) * 100 + 0.5);
    }
}
