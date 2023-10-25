package com.b208.dduishu.domain.thema.service;

import com.b208.dduishu.domain.character.exception.InsufficientPointsException;
import com.b208.dduishu.domain.thema.dto.request.MainThemaInfo;
import com.b208.dduishu.domain.thema.dto.request.PurchaseThemaName;
import com.b208.dduishu.domain.thema.dto.response.ThemaOverview;
import com.b208.dduishu.domain.thema.entity.Thema;
import com.b208.dduishu.domain.thema.entity.ThemaInfo;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import com.b208.dduishu.domain.thema.repository.ThemaInfoRepository;
import com.b208.dduishu.domain.thema.repository.ThemaRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ThemaService {

    private static final List<ThemaName> baseThemaNames = List.of(ThemaName.EARTH, ThemaName.MOON);

    private final ThemaRepository themaRepository;
    private final ThemaInfoRepository themaInfoRepository;
    private final GetUser getUser;

    public List<ThemaOverview> getAllThemaInfo() {
        User user = getUser.getUser();

        List<Thema> findAllThemaInfos = themaRepository.findAllByUserUserId(user.getUserId());

        List<ThemaName> ThemaNames = findAllThemaInfos.stream()
                .map(o -> o.getThemaInfo().getName())
                .collect(toList());

        List<ThemaOverview> collect = findAllThemaInfos.stream()
                .map(o -> new ThemaOverview(o))
                .collect(toList());

        baseThemaNames.stream()
                .forEach(o -> {
                    if(!ThemaNames.contains(o)) {
                        collect.add(ThemaOverview.builder().name(o).build());
                    }
                });

        return collect;

    }

    @Transactional
    public void updateMainThema(MainThemaInfo req) {

        User user = getUser.getUser();

        List<Thema> findThemas = themaRepository.findAllByUserUserId(user.getUserId());

        findThemas
                .stream()
                .forEach(o -> {
                    if (o.isMainThema() == true) {
                        o.setMainThema(false);
                    }
                    if (o.getId() == req.getThemaId()) {
                        o.setMainThema(true);
                    }
                });
    }

    @Transactional
    public void purchaseThema(PurchaseThemaName req) {
        User user = getUser.getUser();

        ThemaInfo findThemaInfo = themaInfoRepository.findByName(req.getThemaName());

        int price = findThemaInfo.getPrice();
        int point = user.getPoint();
        if (isPossiblePurchase(price, point)) {
            user.reducePoint(price);
            Thema build = Thema.builder()
                    .user(user)
                    .themaInfo(findThemaInfo)
                    .isMainThema(false)
                    .build();
            themaRepository.save(build);
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
