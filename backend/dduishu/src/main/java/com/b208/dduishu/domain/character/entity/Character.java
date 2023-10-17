package com.b208.dduishu.domain.character.entity;

import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "characters")
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "character_info_id")
    private CharacterInfo characterInfo;

    @Enumerated(EnumType.STRING)
    private CharacterState state;

    private int level;

    private Long exp;

    private boolean isMainCharacter;

}
