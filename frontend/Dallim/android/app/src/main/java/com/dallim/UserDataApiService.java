package com.dallim;

import retrofit2.Call;
import retrofit2.http.GET;

// Retrofit API 인터페이스 정의
public interface UserDataApiService {
    @GET("https://k9b208.p.ssafy.io/api/v1/user/main")
    Call<UserDataResponse> getUserData();
}
