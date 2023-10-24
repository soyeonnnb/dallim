package com.b208.dduishu.domain.character.entity;

import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "characters")
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_info_id")
    private CharacterInfo characterInfo;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "character_level_id")
    private CharacterLevel characterLevel;


//    @Enumerated(EnumType.STRING)
//    private CharacterState state;

    private boolean isMainCharacter;

    public void setMainCharacter(boolean isMainCharacter) {
        this.isMainCharacter = isMainCharacter;
    }

    public void setCharacterLevel(CharacterLevel characterLevel) {
        this.characterLevel = characterLevel;
    }

}
