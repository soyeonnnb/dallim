package com.b208.dduishu.domain.planet.dto.response;

import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.entity.PlanetName;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
public class PlanetOverview {

    private int planetIndex;
    @JsonProperty("isPurchased")
    private boolean isPurchased;

    @Builder
    public PlanetOverview(PlanetName name) {
        this.planetIndex = getPlanetIndex(name);
        this.isPurchased = false;
    }

    public PlanetOverview(Planet planet) {
        this.planetIndex = getPlanetIndex(planet.getPlanetInfo().getName());
        this.isPurchased = true;
    }

    private int getPlanetIndex(PlanetName name) {

        if (name.equals(PlanetName.EARTH)) {
            return 0;
        } else if (name.equals(PlanetName.MOON)) {
            return 1;
        }
        return -1;
    }
}
