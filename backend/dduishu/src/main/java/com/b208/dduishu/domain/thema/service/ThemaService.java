package com.b208.dduishu.domain.thema.service;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.thema.dto.response.ThemaInfo;
import com.b208.dduishu.domain.thema.entity.Thema;
import com.b208.dduishu.domain.thema.entity.ThemaName;
import com.b208.dduishu.domain.thema.repository.ThemaRepository;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ThemaService {

    private static final List<ThemaName> baseThemaNames = List.of(ThemaName.EARTH, ThemaName.MOON);

    private final ThemaRepository themaRepository;
    private final GetUser getUser;

    //        User user = getUser.getUser();
    //
    //        System.out.println(user.getUserId());
    //
    //        List<Character> findAllCharacterInfo = characterRepository.findAllCharacterInfo(user.getUserId());
    //
    //        List<CharacterName> characterNames = findAllCharacterInfo.stream()
    //                .map(o -> o.getCharacterInfo().getName())
    //                .collect(toList());
    //
    //        List<CharacterInfo> collect = findAllCharacterInfo.stream()
    //                .map(o -> new CharacterInfo(o))
    //                .collect(toList());
    //
    //        baseCharacterNames.stream()
    //                        .forEach(o -> {
    //                            if(!characterNames.contains(o)) {
    //                                collect.add(CharacterInfo.builder().name(o).build());
    //                            }
    //                        });
    public List<ThemaInfo> getAllThemaInfo() {
        User user = getUser.getUser();

        List<Thema> findAllThemaInfos = themaRepository.findAllByUserUserId(user.getUserId());

        List<ThemaName> ThemaNames = findAllThemaInfos.stream()
                .map(o -> o.getName())
                .collect(toList());

        List<ThemaInfo> collect = findAllThemaInfos.stream()
                .map(o -> new ThemaInfo(o))
                .collect(toList());

        baseThemaNames.stream()
                .forEach(o -> {
                    if(!ThemaNames.contains(o)) {
                        collect.add(ThemaInfo.builder().name(o).build());
                    }
                });

        return collect;

    }
}
