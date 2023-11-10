package com.b208.dduishu.domain.user.controller;

import java.util.List;

import com.b208.dduishu.domain.user.dto.request.UserEmail;
import com.b208.dduishu.domain.user.dto.request.UserNickName;
import com.b208.dduishu.domain.user.dto.request.UserPoint;
import com.b208.dduishu.domain.user.dto.request.UserRankingInfo;
import com.b208.dduishu.domain.user.dto.response.*;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.repository.UserRepository;
import com.b208.dduishu.domain.user.service.UserRankingService;
import com.b208.dduishu.util.response.ApiResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

import com.b208.dduishu.domain.user.service.UserSocialService;

import lombok.RequiredArgsConstructor;

import static java.util.stream.Collectors.toList;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserSocialService userSocialService;
    private final UserRankingService userRankingService;
    private final UserRepository userRepository;

    @ApiOperation(value="accessToken 토큰 발급", notes="사용자 accesstoken을 발급한다.")
    @PostMapping("/api/v1/user/token")
    public ApiResponse<?> getAccessToken(@RequestBody UserEmail req) {
        try {
            String token = userSocialService.getAccessToken(req.getEmail());

            return ApiResponse.createSuccess(token);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    // 닉네임 변경
    @ApiOperation(value="유저 닉네임 변경", notes="사용자의 닉네임을 변경한다.")
    @PatchMapping("/api/v1/user/nickname")
    public ApiResponse<?> updateUserNickname(@RequestBody UserNickName req){
        try {
            boolean isDuplicateNickName = userSocialService.checkUserNickname(req.getNickname());

            if (!isDuplicateNickName) {
                userSocialService.updateUserNickname(req.getNickname());
                return ApiResponse.createSuccess("닉네임 변경 성공");
            }
            return ApiResponse.createError("닉네임 변경 실패");
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="유저 포인트 조회", notes="유저 포인트를 조회한다.")
    @GetMapping("/api/v1/user/point")
    public ApiResponse<?> getUserPoint() {
        try {
            UserPoint res = userSocialService.getUserPoint();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="주간 랭킹 조회 - 팔로워", notes="주간 랭킹을 팔로워 기준 조회한다.")
    @GetMapping("/api/v1/user/follow-ranking")
    public ApiResponse<?> getWeeklyRankingWithFollower() {
        try {
            AllUserRankingInfo res = userRankingService.getWeeklyRankingWithFollower();

            // UserResponse에 setter가 있다고 가정한다면
            List<UserRankingInfo> collect = res.getRankingInfos()
                    .stream()
                    .filter(o -> {
                        User user = userRepository.findByUserId(o.getUserId()).orElse(null);
                        return user != null && !user.isAdmin();
                    })
                    .collect(toList());

            res.setRankingInfos(collect);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="주간 랭킹 조회 - 전체", notes="주간 랭킹을 전체 기준 조회한다.")
    @GetMapping("/api/v1/user/all-ranking")
    public ApiResponse<?> getWeeklyRankingWithAll() {
        try {
            AllUserRankingInfo res = userRankingService.getWeeklyRankingWithAll();

            // UserResponse에 setter가 있다고 가정한다면
            List<UserRankingInfo> collect = res.getRankingInfos()
                    .stream()
                    .filter(o -> {
                        User user = userRepository.findByUserId(o.getUserId()).orElse(null);
                        return user != null && !user.isAdmin();
                    })
                    .collect(toList());

            res.setRankingInfos(collect);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/user/check-attendance")
    public ApiResponse<?> checkUserAttendance() {
        try {
            AttendanceInfo res = userSocialService.checkUserAttendance();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/user/watch")
    public ApiResponse<?> getWatchUserInfo() {
        try {
            WatchUserInfo res = userSocialService.getWatchUserInfo();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/user/main")
    public ApiResponse<?> getUserMainPageInfo() {
        try {
            UserMainPageInfo res = userSocialService.getUserMainPageInfo();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @GetMapping("/api/v1/user/edit")
    public ApiResponse<?> getUserEditPageInfo() {
        try {
            UserEditPageInfo res = userSocialService.getUserEditPageInfo();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="마이 프로필 조회", notes="마이 프로필 조회을 조회한다.")
    @GetMapping("/api/v1/user/profile/me")
    public ApiResponse<?> getMyProfile() {
        try {
            UserProfile res = userSocialService.getMyProfile();

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="유저 프로필 조회", notes="유저 프로필 조회을 조회한다.")
    @GetMapping("/api/v1/user/profile/{id}")
    public ApiResponse<?> getUserProfile(@ApiParam(example = "1") @PathVariable Long id) {
        try {
            UserProfile res = userSocialService.getUserProfile(id);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="프로필 비교", notes="유저 간 프로필을 비교한다.")
    @GetMapping("/api/v1/user/compare/{id}")
    public ApiResponse<?> compareUserProfile(@ApiParam(example = "1") @PathVariable Long id) {
        try {
            CompareUserProfile res = userSocialService.compareUserProfile(id);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }

    @ApiOperation(value="유저 검색", notes="유저를 검색한다." )
    @GetMapping("/api/v1/user/search")
    public ApiResponse<?> searchUserProfile(@ApiParam(value="유저 닉네임", example="달림")@RequestParam String q) {
        try {
            List<SearchUserProfile> res = userSocialService.searchUserProfile(q);

            return ApiResponse.createSuccess(res);
        } catch (Exception e) {
            return ApiResponse.createError(e.getMessage());
        }
    }
}
