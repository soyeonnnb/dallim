package com.b208.dduishu.domain.thema.entity;

import com.b208.dduishu.domain.character.entity.CharacterLevel;
import com.b208.dduishu.domain.characterInfo.entity.CharacterInfo;
import com.b208.dduishu.domain.user.entity.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "thema")
public class Thema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thema_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private ThemaName name;

    private boolean isMainThema;

    private int price;
}
