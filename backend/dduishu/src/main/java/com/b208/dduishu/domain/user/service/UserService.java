package com.b208.dduishu.domain.user.service;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import com.b208.dduishu.domain.character.dto.request.CharacterOverview;
import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.follow.entity.FollowState;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.planet.dto.response.PlanetOverview;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.entity.PlanetName;
import com.b208.dduishu.domain.planet.repository.PlanetRepository;
import com.b208.dduishu.domain.runningRecord.service.RunningRecordService;
import com.b208.dduishu.domain.user.dto.response.*;
import com.b208.dduishu.domain.user.entity.BaseLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.dto.request.UserPoint;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
    private String kakaoLogoutRedirectUri = "http://localhost:8080/api/oauth/logout";
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${spring.security.oauth2.client.registration.naver.clientId}")
    private String naverClientId;
    @Value("${spring.security.oauth2.client.registration.naver.clientSecret}")
    private String naverSecretId;

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final GetUser getUser;
    @Autowired
    private RestTemplate restTemplate;

    private final RunningRecordRepository runningRecordRepository;
    private final CharacterRepository characterRepository;
    private final PlanetRepository themaRepository;

    private static final List<CharacterName> baseCharacterNames = List.of(CharacterName.RABBIT, CharacterName.Penguin, CharacterName.Panda, CharacterName.Chicken);
    private static final List<PlanetName> baseThemaNames = List.of(PlanetName.EARTH, PlanetName.MOON);

    private final RunningRecordService runningRecordService;

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

        // 현재 날짜 및 시간 가져오기
        LocalDateTime now = LocalDateTime.now();
        // 이번 주의 시작 날짜를 계산 (월요일)
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserIdAndCreatedAtBetween(user.getUserId(), startOfWeek, now);

        AtomicReference<Float> weekDistance = new AtomicReference<>((float) 0.0);
        findRunningRecord.stream()
                .forEach(o -> {
                    weekDistance.updateAndGet(v -> new Float((float) (v + (o.getTotalDistance()))));
                });

        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(user.getUserLevel().getExp());

        int profileIndex = getProfileIndex(user);

        return UserProfile.builder()
                .characterIndex(profileIndex)
                .nickname(user.getNickname())
                .level(user.getUserLevel().getLevel())
                .exp(levelInfo.getExp())
                .build();

    }

    private int getProfileIndex(User user) {
        AtomicInteger ret = new AtomicInteger(-1);
        user.getCharacterList().stream()
                .forEach(o -> {
                    if (o.isMainCharacter() == true) {
                        if (o.getCharacterInfo().getName().equals(CharacterName.RABBIT)) {
                            ret.set(0);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Penguin)) {
                            ret.set(1);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Panda)) {
                            ret.set(2);
                        } else if (o.getCharacterInfo().getName().equals(CharacterName.Chicken)) {
                            ret.set(3);
                        }
                    }
                });
        return ret.get();
    }

    public UserProfile getUserProfile(Long id) {
        User user = userRepository.findByUserId(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        // 현재 날짜 및 시간 가져오기
        LocalDateTime now = LocalDateTime.now();
        // 이번 주의 시작 날짜를 계산 (월요일)
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserIdAndCreatedAtBetween(user.getUserId(), startOfWeek, now);

        AtomicReference<Float> weekDistance = new AtomicReference<>((float) 0.0);
        findRunningRecord.stream()
                .forEach(o -> {
                    weekDistance.updateAndGet(v -> new Float((float) (v + (o.getTotalDistance()))));
                });

        BaseLevel.LevelInfo levelInfo = BaseLevel.getLevelInfo(user.getUserLevel().getExp());

        int profileIndex = getProfileIndex(user);


        List<RunningRecordOverview> findFollowRunningRecord = runningRecordService.getRunningRecordFor30Days("follow", id);
        List<User> findFollower = userRepository.getUserByFollowerUserId(user.getUserId(), FollowState.accept);

        return UserProfile.builder()
                .characterIndex(profileIndex)
                .nickname(user.getNickname())
                .level(user.getUserLevel().getLevel())
                .exp(levelInfo.getExp())
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

        List<User> findUser = userRepository.findByNicknameContaining(q);

        return findUser.stream()
                .map(o -> new SearchUserProfile(o, findFollower))
                .collect(toList());
    }

    public UserMainPageInfo getUserMainPageInfo() {
        User user = getUser.getUser();
        List<Character> findCharacters = characterRepository.findAllByUserUserId(user.getUserId());
        List<Planet> findThemas = themaRepository.findAllByUserUserId(user.getUserId());

        Character mainCharacter = findCharacters.stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);

        Planet mainThema = findThemas.stream()
                .filter(Planet::isMainPlanet)
                .findFirst()
                .orElse(null);

        return UserMainPageInfo.builder()
                .user(user)
                .character(mainCharacter)
                .thema(mainThema)
                .build();
    }

    public List<CharacterOverview> convertCharacterOverView(List<Character> characters) {
        List<CharacterOverview> characterOverviews = characters.stream()
                .map(o -> new CharacterOverview(o))
                .collect(toList());
        List<CharacterName> characterNames = characters.stream()
                .map(o -> o.getCharacterInfo().getName())
                .collect(toList());
        baseCharacterNames.stream()
                .forEach(o -> {
                    if(!characterNames.contains(o)) {
                        characterOverviews.add(CharacterOverview.builder().name(o).build());
                    }
                });
        return characterOverviews;
    }

    public List<PlanetOverview> converPlanetOverView(List<Planet> themas) {
        List<PlanetOverview> themaOverviews = themas.stream()
                .map(o -> new PlanetOverview(o))
                .collect(toList());
        List<PlanetName> ThemaNames = themas.stream()
                .map(o -> o.getPlanetInfo().getName())
                .collect(toList());
        baseThemaNames.stream()
                .forEach(o -> {
                    if(!ThemaNames.contains(o)) {
                        themaOverviews.add(PlanetOverview.builder().name(o).build());
                    }
                });
        return themaOverviews;
    }
    public UserEditPageInfo getUserEditPageInfo() {
        User user = getUser.getUser();
        List<Character> findCharacters = characterRepository.findAllCharacterInfo(user.getUserId());
        List<Planet> findThemas = themaRepository.findAllByUserUserId(user.getUserId());

        List<CharacterOverview> characterOverviews = convertCharacterOverView(findCharacters);
        List<PlanetOverview> themaOverviews = converPlanetOverView(findThemas);

        Character mainCharacter = findCharacters.stream()
                .filter(Character::isMainCharacter)
                .findFirst()
                .orElse(null);

        Planet mainThema = findThemas.stream()
                .filter(Planet::isMainPlanet)
                .findFirst()
                .orElse(null);

        return UserEditPageInfo.builder()
                .user(user)
                .character(mainCharacter)
                .thema(mainThema)
                .characters(characterOverviews)
                .planets(themaOverviews)
                .build();

    }
}