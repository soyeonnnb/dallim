package com.b208.dduishu.domain.planet.entity;

import com.b208.dduishu.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "planet")
@NoArgsConstructor
public class Planet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "planet_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planet_info_id")
    private PlanetInfo planetInfo;

    private boolean isMainPlanet;

    @Builder
    public Planet(Long id, User user, PlanetInfo planetInfo, boolean isMainPlanet) {
        this.id = id;
        this.user = user;
        this.planetInfo = planetInfo;
        this.isMainPlanet = isMainPlanet;
    }

    public void setMainPlanet(boolean planet) {
        this.isMainPlanet = planet;
    }
}
