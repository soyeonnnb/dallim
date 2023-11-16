package com.b208.dduishu.domain.character.entity;

import com.b208.dduishu.domain.user.entity.BaseLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class CharacterLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_level_id")
    private Long id;

    private int level=1;

    private int exp=0;

    @Builder
    public CharacterLevel(int level, int exp) {
        this.level = level;
        this.exp = exp;
    }

    public void addExp(double exp ) {
        this.exp += exp;
        checkLevel();
    }

    public void checkLevel(){
        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(exp);

        this.level = levelInfo.getLevel();
    }


}
