package com.runapp.service;

import com.runapp.dto.request.AccessTokenRequestDTO;
import com.runapp.dto.response.AccessTokenResponseDTO;
import com.runapp.dto.response.ApiResponseDTO;
import com.runapp.dto.response.ApiResponseListDTO;
import com.runapp.dto.response.AuthCodeResponseDTO;
import com.runapp.dto.RunningDataDTO;
import com.runapp.dto.response.RunningMateResponseDTO;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

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
}

