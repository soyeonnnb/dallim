package com.b208.dduishu.domain.planet.repository;

import com.b208.dduishu.domain.planet.entity.Planet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanetRepository extends JpaRepository<Planet, Long> {

    List<Planet> findAllByUserUserId(Long userId);
}
