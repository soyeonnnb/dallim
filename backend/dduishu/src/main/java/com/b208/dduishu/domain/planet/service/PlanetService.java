package com.b208.dduishu.domain.planet.service;

import com.b208.dduishu.domain.character.exception.InsufficientPointsException;
import com.b208.dduishu.domain.planet.dto.request.MainPlanetInfo;
import com.b208.dduishu.domain.planet.dto.request.PurchasePlanetName;
import com.b208.dduishu.domain.planet.dto.response.PlanetOverview;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.entity.PlanetInfo;
import com.b208.dduishu.domain.planet.entity.PlanetName;
import com.b208.dduishu.domain.planet.repository.PlanetInfoRepository;
import com.b208.dduishu.domain.planet.repository.PlanetRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class PlanetService {

    private static final List<PlanetName> basePlanetNames = List.of(PlanetName.BLACK, PlanetName.YELLOW, PlanetName.BLUE, PlanetName.PUPPLE, PlanetName.RED);

    private final PlanetRepository planetRepository;
    private final PlanetInfoRepository planetInfoRepository;
    private final GetUser getUser;

    public List<PlanetOverview> getAllThemaInfo() {
        User user = getUser.getUser();

        List<Planet> findAllPlanetInfos = planetRepository.findAllByUserUserId(user.getUserId());

        List<PlanetName> planetNames = findAllPlanetInfos.stream()
                .map(o -> o.getPlanetInfo().getName())
                .collect(toList());

        List<PlanetOverview> collect = findAllPlanetInfos.stream()
                .map(o -> new PlanetOverview(o))
                .collect(toList());

        basePlanetNames.stream()
                .forEach(o -> {
                    if(!planetNames.contains(o)) {
                        collect.add(PlanetOverview.builder().name(o).build());
                    }
                });

        return collect;

    }

    @Transactional
    public void updateMainThema(MainPlanetInfo req) {

        User user = getUser.getUser();

        List<Planet> findPlanets = planetRepository.findAllByUserUserId(user.getUserId());

        findPlanets
                .stream()
                .forEach(o -> {
                    if (o.isMainPlanet() == true) {
                        o.setMainPlanet(false);
                    }
                    if (o.getId() == req.getPlanetId()) {
                        o.setMainPlanet(true);
                    }
                });
    }

    @Transactional
    public void purchaseThema(PurchasePlanetName req) {
        User user = getUser.getUser();

        PlanetInfo findPlanetInfo = planetInfoRepository.findByName(req.getPlanetName());

        int price = findPlanetInfo.getPrice();
        int point = user.getPoint();
        if (isPossiblePurchase(price, point)) {
            user.reducePoint(price);
            Planet build = Planet.builder()
                    .user(user)
                    .planetInfo(findPlanetInfo)
                    .isMainPlanet(false)
                    .build();
            planetRepository.save(build);
        } else {
            throw new InsufficientPointsException();
        }
    }
    private boolean isPossiblePurchase(int price, int point) {
        if (price > point) {
            return false;
        } else {
            return true;
        }
    }
}
