package com.runapp.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.runapp.adapter.LocalDateTimeAdapter;
import com.runapp.service.ApiService;

import java.time.LocalDateTime;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiUtil {

    private static final String BASE_URL = "https://k9b208.p.ssafy.io/";
    private static Retrofit retrofit = null;

    public static ApiService getApiService() {
        if (retrofit == null) {
            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
                    .create();

            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .build();

        }
        return retrofit.create(ApiService.class);
    }
}
