package com.b208.dduishu.domain.user.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class UserLevel {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_level_id")
    private Long id;

    private int level=1;

    private int exp=0;


    public void addExp(double exp){
        this.exp += exp;
        setUserLevel();
    }

    private void setUserLevel(){
        int e = this.exp;

        int lv = 1;
        if(e<500){
            lv=1;
        }else if(e<1500){
            lv=2;
        }else if(e<3000){
            lv=3;
        }else if(e<5000){
            lv=4;
        }else if(e<7500){
            lv=5;
        }else if(e<10500){
            lv=6;
        }else if(e<14000){
            lv=7;
        }else if(e<18000){
            lv=8;
        }else if(e<22500){
            lv=9;
        }else if(e<27500){
            lv=10;
        }else if(e<33000){
            lv=11;
        }else if(e<39000){
            lv=12;
        }else if(e<45500){
            lv=13;
        }else if(e<52500){
            lv=14;
        }else if(e<60000){
            lv=15;
        }else if(e<68000){
            lv=16;
        }else if(e<76500){
            lv=17;
        }else if(e<85500){
            lv=18;
        }else if(e<95000){
            lv=19;
        }else if(e<105000){
            lv=20;
        }else if(e<120000){
            lv=21;
        }else if(e<150000){
            lv=22;
        }else if(e<200000){
            lv=23;
        }else if(e<250000){
            lv=24;
        }else if(e<300000){
            lv=25;
        }else if(e<400000){
            lv=26;
        }else if(e<450000){
            lv=27;
        }else if(e<500000){
            lv=28;
        }else if(e<550000){
            lv=29;
        }else if(e<600000){
            lv=30;
        }else if(e<650000){
            lv=31;
        }else if(e<700000){
            lv=32;
        }else if(e<750000){
            lv=33;
        }else if(e<800000){
            lv=34;
        }else if(e<850000){
            lv=35;
        }else if(e<900000){
            lv=36;
        }else if(e<950000){
            lv=37;
        }else if(e<1000000){
            lv=38;
        }else{
            lv=39;
        }

        this.level = lv;

    }





}
