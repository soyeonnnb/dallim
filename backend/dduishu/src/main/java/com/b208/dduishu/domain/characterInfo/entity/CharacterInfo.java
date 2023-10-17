package com.b208.dduishu.domain.characterInfo.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CharacterInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_info_id")
    private Long id;

    private String name;

    private String firstGifUrl;

    private String secondGifUrl;

    private String thirdGifUrl;
}
