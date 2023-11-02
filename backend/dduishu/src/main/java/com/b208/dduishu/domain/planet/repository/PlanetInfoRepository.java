package com.b208.dduishu.domain.planet.repository;

import com.b208.dduishu.domain.planet.entity.PlanetInfo;
import com.b208.dduishu.domain.planet.entity.PlanetName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanetInfoRepository extends JpaRepository<PlanetInfo, Long> {

    PlanetInfo findByName(PlanetName name);
}
