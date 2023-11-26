package com.b208.dduishu.domain.planet.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "planet_info")
public class PlanetInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "planet_info_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private PlanetName name;

    private int price;
}
