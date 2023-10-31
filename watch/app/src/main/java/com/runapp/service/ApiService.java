package com.runapp.service;

import com.runapp.dto.RunningDataDTO;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ApiService {

    @POST("api/v1/running")
    Call<Void> postRunningData(@Header("Authorization") String token, @Body RunningDataDTO runningDataDTO);
}

