package com.b208.dduishu.domain.thema.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "thema_info")
public class ThemaInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thema_info_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private ThemaName name;

    private int price;
}
