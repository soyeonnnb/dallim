package com.dallim.service;

import com.dallim.dto.RunningDataDTO;
import com.dallim.dto.request.AccessTokenRequestDTO;
import com.dallim.dto.response.AccessTokenResponseDTO;
import com.dallim.dto.response.ApiResponseDTO;
import com.dallim.dto.response.ApiResponseListDTO;
import com.dallim.dto.response.AuthCodeResponseDTO;
import com.dallim.dto.response.RunningMateResponseDTO;
import com.dallim.dto.response.RunningMateRunningRecordDTO;
import com.dallim.dto.response.UserInfoResponseDTO;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {

    // 달리기 기록 저장
    @POST("api/v1/running")
    Call<Void> postRunningData(@Header("Authorization") String token, @Body RunningDataDTO runningDataDTO);

    // 인증번호 생성 요청
    @POST("api/v1/authentication-code")
    Call<ApiResponseDTO<AuthCodeResponseDTO>> generateCode();

    // 인증번호 확인
    @POST("api/v1/authentication-code/token")
    Call<ApiResponseDTO<AccessTokenResponseDTO>> verifyCode(@Body AccessTokenRequestDTO requestDTO);

    // 러닝메이트 정보 가져오기
    @GET("api/v1/running-mate")
    Call<ApiResponseListDTO<RunningMateResponseDTO>> getRunningMate(@Header("Authorization") String token);

    // 러닝메이트 기록 가져오기
    @GET("api/v1/running/overview/{id}")
    Call<ApiResponseDTO<RunningMateRunningRecordDTO>> getRunningMateRecord(@Header("Authorization") String token, @Path("id") String runningRecordId);

    // 유저 정보 가져오기
    @GET("api/v1/user/watch")
    Call<ApiResponseDTO<UserInfoResponseDTO>> getUserInfo(@Header("Authorization") String token);
}

