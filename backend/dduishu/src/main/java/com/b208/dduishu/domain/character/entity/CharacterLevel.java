package com.b208.dduishu.domain.character.entity;

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

    public void addExp(float exp ) {
        this.exp += exp;
        checkLevel();
    }

    public int checkLevel(){
        int e = this.exp;
        int lv = 1;
        if(e<500){
            lv=1;
        }else if(500<=e&&e<1500){
            lv=2;
        }else if(1500<=e&&e<3000){
            lv=3;
        }else if(3000<=e&&e<5000){
            lv=4;
        }else if(5000<=e&&e<7500){
            lv=5;
        }else if(7500<=e&&e<10400){
            lv=6;
        }else if(10400<=e&&e<13400){
            lv=7;
        }else if(13400<=e&&e<16500){
            lv=8;
        }else if(16500<=e&&e<19700){
            lv=9;
        }else if(19700<=e&&e<23000){
            lv=10;
        }else if(23000<=e&&e<26500){
            lv=11;
        }else if(26500<=e&&e<30500){
            lv=12;
        }else if(30500<=e&&e<35000){
            lv=13;
        }else if(35000<=e&&e<40000){
            lv=14;
        }else if(40000<=e&&e<50000){
            lv=15;
        }else if(50000<=e&&e<70000){
            lv=16;
        }else if(70000<=e&&e<100000){
            lv=17;
        }else if(100000<=e&&e<150000){
            lv=18;
        }else if(150000<=e&&e<250000){
            lv=19;
        }else{
            lv=20;
        }

        return lv;
    }


}
