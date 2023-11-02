package com.b208.dduishu.domain.user.service;

import java.util.*;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.follow.entity.FollowState;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.dto.request.SocialRunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.planet.dto.response.PlanetOverview;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.entity.PlanetName;
import com.b208.dduishu.domain.planet.repository.PlanetRepository;
import com.b208.dduishu.domain.runningRecord.service.RunningRecordService;
import com.b208.dduishu.domain.user.dto.response.*;
import com.b208.dduishu.domain.user.entity.BaseLevel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.dto.request.UserPoint;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSocialService {

    @Value("${jwt.secret}")
    private String secretKey;

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final GetUser getUser;

    private final RunningRecordRepository runningRecordRepository;
    private final CharacterRepository characterRepository;
    private final PlanetRepository themaRepository;

    private static final List<CharacterName> baseCharacterNames = List.of(CharacterName.RABBIT, CharacterName.Penguin, CharacterName.Panda, CharacterName.Chicken);
    private static final List<PlanetName> baseThemaNames = List.of(PlanetName.BLACK, PlanetName.YELLOW, PlanetName.BLUE, PlanetName.PUPPLE, PlanetName.RED);

    private final RunningRecordService runningRecordService;
    private final PlanetRepository planetRepository;

    // 유저 닉네임 변경
    @Transactional
    public void updateUserNickname(String nickName) {
        User user = getUser.getUser();

        user.updateNickname(nickName);
    }

    // 유저 닉네임 중복체크
    public IsDuplicateNickName checkUserNickname(String nickname) {
        boolean flag = userRepository.existsByNickname(nickname);

        IsDuplicateNickName res = IsDuplicateNickName.builder().IsDuplicate(flag).build();

        return res;
    }

    public UserPoint getUserPoint() {
        User user = getUser.getUser();

        UserPoint res = UserPoint.builder().point(user.getPoint()).build();

        return res;
    }

    public String getAccessToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new NullPointerException();
        });

        return jwtUtil.createAccessJwt(user.getUserId(), secretKey);
    }

    public UserProfile getMyProfile() {
        User user = getUser.getUser();
        Character mainCharacter = user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);
        List<SocialRunningRecordOverview> findFollowRunningRecord = runningRecordService.getRunningRecordFor30Days("me", user.getUserId());
        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(user.getUserLevel().getExp());
        List<Planet> findPlanets = planetRepository.findAllByUserUserId(user.getUserId());

        return UserProfile.builder()
                .user(user)
                .character(mainCharacter)
                .planets(findPlanets)
                .levelInfo(levelInfo)
                .runningRecordOverviews(findFollowRunningRecord)
                .build();
    }

    public UserProfile getUserProfile(Long id) {
        User user = userRepository.findByUserId(id).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Character mainCharacter = user.getCharacterList().stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);
        List<Planet> findPlanets = planetRepository.findAllByUserUserId(user.getUserId());
        List<SocialRunningRecordOverview> findFollowRunningRecord = runningRecordService.getRunningRecordFor30Days("follow", id);
        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(user.getUserLevel().getExp());

        return UserProfile.builder()
                .user(user)
                .character(mainCharacter)
                .planets(findPlanets)
                .levelInfo(levelInfo)
                .runningRecordOverviews(findFollowRunningRecord)
                .build();
    }

    public CompareUserProfile compareUserProfile(Long id) {
        User user = getUser.getUser();
        User pair = userRepository.findByUserId(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        return new CompareUserProfile(user, pair);
    }

    public List<SearchUserProfile> searchUserProfile(String q) {
        User user = getUser.getUser();
        List<User> findFollower = userRepository.getUserByFollowerUserId(user.getUserId(), FollowState.accept);
        List<User> searchUsers = userRepository.findByNicknameContaining(q);

        return searchUsers.stream()
                .map(o -> new SearchUserProfile(o, findFollower))
                .collect(toList());
    }

    public UserMainPageInfo getUserMainPageInfo() {
        User user = getUser.getUser();
        List<Character> findCharacters = characterRepository.findAllByUserUserId(user.getUserId());
        List<Planet> findPlanets = themaRepository.findAllByUserUserId(user.getUserId());

        Character mainCharacter = findCharacters.stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);

        Planet mainPlanet = findPlanets.stream()
                .filter(Planet::isMainPlanet)
                .findFirst()
                .orElse(null);

        return UserMainPageInfo.builder()
                .user(user)
                .character(mainCharacter)
                .planet(mainPlanet)
                .build();
    }

    public UserEditPageInfo getUserEditPageInfo() {
        User user = getUser.getUser();
        List<Character> findCharacters = characterRepository.findAllCharacterInfo(user.getUserId());
        List<Planet> findPlanet = themaRepository.findAllByUserUserId(user.getUserId());

        List<CharacterOverview> characterOverviews = convertCharacterOverView(findCharacters);
        List<PlanetOverview> planetOverviews = converPlanetOverView(findPlanet);

        Character mainCharacter = findCharacters.stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);

        Planet mainPlanet = findPlanet.stream()
                .filter(Planet::isMainPlanet)
                .findFirst()
                .orElse(null);

        return UserEditPageInfo.builder()
                .user(user)
                .character(mainCharacter)
                .planet(mainPlanet)
                .characters(characterOverviews)
                .planets(planetOverviews)
                .build();

    }
    public List<CharacterOverview> convertCharacterOverView(List<Character> characters) {
        List<CharacterOverview> characterOverviews = characters.stream()
                .map(CharacterOverview::new)
                .collect(toList());
        Set<CharacterName> existingCharacterNames = characters.stream()
                .map(character -> character.getCharacterInfo().getName())
                .collect(toSet());
        baseCharacterNames.stream()
                .filter(name -> !existingCharacterNames.contains(name))
                .map(name -> CharacterOverview.builder().name(name).build())
                .forEach(characterOverviews::add);
        characterOverviews.sort(Comparator.comparingInt(CharacterOverview::getCharacterIndex));
        return characterOverviews;
    }

    public List<PlanetOverview> converPlanetOverView(List<Planet> planets) {
        List<PlanetOverview> planetOverviews  = planets.stream()
                .map(PlanetOverview::new)
                .collect(toList());
        Set<PlanetName> existingPlanetNames = planets.stream()
                .map(planet -> planet.getPlanetInfo().getName())
                .collect(toSet());
        baseThemaNames.stream()
                .filter(name -> !existingPlanetNames.contains(name))
                .map(name -> PlanetOverview.builder().name(name).build())
                .forEach(planetOverviews::add);
        planetOverviews.sort(Comparator.comparingInt(PlanetOverview::getPlanetIndex));
        return planetOverviews;
    }
}