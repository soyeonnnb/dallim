package com.dallim;

import android.app.IntentService;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;
import java.io.IOException;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.Call;
import retrofit2.Response;

// Retrofit API 인터페이스 정의
public interface AttendanceApiService {
    @GET("https://k9b208.p.ssafy.io/api/v1/attendance")
    Call<AttendanceResponse> getAttendanceDates();
}
