package com.b208.dduishu.domain.user.service;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import com.b208.dduishu.domain.characterInfo.dto.CharacterName;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.user.dto.response.CompareUserProfile;
import com.b208.dduishu.domain.user.dto.response.SearchUserProfile;
import com.b208.dduishu.domain.user.dto.response.UserProfile;
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
import com.b208.dduishu.domain.user.dto.response.IsDuplicateNickName;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.util.S3.service.S3UploadService;
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
    //    @Value("${kakao.logout-redirect-uri}")
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
    private final S3UploadService s3UploadService;
    private final GetUser getUser;
    @Autowired
    private RestTemplate restTemplate;

    private final RunningRecordRepository runningRecordRepository;

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


    // 유저 프로필사진 변경
    @Transactional
    public Map<String, Object> userProfileImage(MultipartFile multipartFile) throws IOException {
        User user = getUser.getUser();

        String profileUrl = s3UploadService.profileSaveFile(multipartFile);

        user.updateprofileImage(profileUrl);

        Map<String, Object> result = new HashMap<>();

        result.put("message", "프로필 사진 변경 성공");

        return result;
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

    //    private int profileIndex;
    //    private String nickname;
    //    private int level;
    //    private int exp;
    //    private int curExp;
    //    private int EndExp;
    //    private int cumulativeDistance;
    //    private int cumulativeWeekDistance;

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
                .profileIndex(profileIndex)
                .nickname(user.getNickname())
                .level(user.getUserLevel().getLevel())
                .exp(levelInfo.getExp())
                .curExp(levelInfo.getCurExp())
                .endExp(levelInfo.getEndExp())
                .cumulativeDistance(user.getCumulativeDistance())
                .cumulativeWeekDistance(weekDistance.get())
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

        return UserProfile.builder()
                .profileIndex(profileIndex)
                .nickname(user.getNickname())
                .level(user.getUserLevel().getLevel())
                .exp(levelInfo.getExp())
                .curExp(levelInfo.getCurExp())
                .endExp(levelInfo.getEndExp())
                .cumulativeDistance(user.getCumulativeDistance())
                .cumulativeWeekDistance(weekDistance.get())
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
        List<User> findUser = userRepository.findByNicknameContaining(q);

        return findUser.stream()
                .map(o -> new SearchUserProfile(o))
                .collect(toList());
    }
}