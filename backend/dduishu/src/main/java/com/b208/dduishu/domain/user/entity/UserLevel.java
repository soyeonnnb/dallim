package com.b208.dduishu.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class UserLevel {

    private static int LEVEL_GAGE = 30000;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_level_id")
    private Long id;

    private int level=1;

    private int exp=0;

    @Builder
    public UserLevel( int level, int exp) {
        this.level = level;
        this.exp = exp;
    }

    public void addExp(double exp){
        this.exp += exp;
        setUserLevel();
    }

    private void setUserLevel(){
        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(exp);

        this.level = levelInfo.getLevel();
    }





}
