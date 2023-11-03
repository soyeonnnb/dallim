package com.runapp.service;

import com.runapp.dto.RunningDataDTO;

import java.lang.annotation.Target;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ApiService {

    @POST("api/v1/running")
    Call<Void> postRunningData(@Header("Authorization") String token, @Body RunningDataDTO runningDataDTO);

    @GET("api/v1/auth/generate-code")
    Call<String> generateCode();

    @POST("api/v1/auth/verify-code")
    Call<String> verifyCode(@Body String code);
}

