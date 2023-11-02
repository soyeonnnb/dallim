package com.b208.dduishu.domain.characterInfo.entity;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CharacterInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_info_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private CharacterName name;

    private int price;

    private String firstGifUrl;

    private String secondGifUrl;

    private String thirdGifUrl;
}
