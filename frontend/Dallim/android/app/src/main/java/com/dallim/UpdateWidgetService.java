package com.dallim;


import android.app.IntentService;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.RemoteViews;

import com.dallim.AttendanceApiService;
import com.dallim.CalendarWidget;
import com.dallim.R;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UpdateWidgetService extends IntentService {

    // Retrofit 관련 멤버 변수
    private Retrofit retrofit;

    private Retrofit retrofitRep;
    private AttendanceApiService service;

    private UserDataApiService service1;

    public UpdateWidgetService() {
        super("UpdateWidgetService");
     }

    @Override
    public void onCreate() {
        super.onCreate();
        try {
             // 액세스 토큰을 SharedPreferences에서 가져오기
            SharedPreferences sharedPreferences = getSharedPreferences("dallimPreference", Context.MODE_PRIVATE);
              String accessToken = sharedPreferences.getString("AccessToken", "");
            // Retrofit 인스턴스 및 서비스 초기화
            // Retrofit을 사용하여 서비스 인스턴스 생성하기 전에 OkHttpClient를 사용하여 헤더 추가
             OkHttpClient okHttpClient = new OkHttpClient.Builder()
                    .addInterceptor(chain -> {
                        Request originalRequest = chain.request();
                        Request newRequest = originalRequest.newBuilder()
                                .header("Authorization", "Bearer " + accessToken)
                                .build();
                        return chain.proceed(newRequest);
                    })
                    .build();

            OkHttpClient okHttpClient1 = new OkHttpClient.Builder()
                    .addInterceptor(chain -> {
                        Request originalRequest = chain.request();
                        Request newRequest = originalRequest.newBuilder()
                                .header("Authorization", "Bearer " + accessToken)
                                .build();
                        return chain.proceed(newRequest);
                    })
                    .build();

   // Retrofit 인스턴스 생성
            retrofit = new Retrofit.Builder()
                    .baseUrl("https://k9b208.p.ssafy.io/api/v1/attendance/")
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
            retrofitRep = new Retrofit.Builder()
                    .baseUrl("https://k9b208.p.ssafy.io/api/v1/user/main/")
                    .client(okHttpClient1)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
             service = retrofit.create(AttendanceApiService.class);
            service1 = retrofitRep.create(UserDataApiService.class);
         } catch (Exception e) {
            Log.e("DDDDDDDDDD", "UpdateWidgetService - onCreate - Retrofit build failed", e);
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // 항상 super의 onStartCommand를 호출하여 intent가 onHandleIntent로 전달되도록 합니다.
        return super.onStartCommand(intent, flags, startId);
    }


    @Override
    protected void onHandleIntent(Intent intent) {
        // Retrofit 호출과 위젯 업데이트 처리
        try {
            boolean check = false;
            boolean check1 = false;
             Response<AttendanceResponse> response = service.getAttendanceDates().execute();
            Response<UserDataResponse> response1 = service1.getUserData().execute();
            Intent updateIntent = new Intent(this, CalendarWidget.class);
            Intent updateIntent1 = new Intent(this, DirectRunWidget.class);
            if (response.isSuccessful() && response.body() != null) {
                String[] attendances = response.body().getData().getAttendances();

                // 위젯 업데이트 로직을 브로드캐스트를 통해 처리
                if (attendances != null) {

                    updateIntent.putExtra(CalendarWidget.EXTRA_ITEM, attendances);
                    check =true;
                }
            } else {
                Log.d("DDDDDDDDDD", "UpdateWidgetService - wrong response");
            }
             if(response1.isSuccessful()&&response1.body()!=null){
                HashMap<String,String> map = new HashMap<>();

                map.put("nickName",response1.body().getData().getNickName());
                map.put("userLevel",Integer.toString(response1.body().getData().getUserLevel()));
                map.put("characterIndex",Integer.toString(response1.body().getData().getCharacterIndex()));
                map.put("evolutionStage",Integer.toString(response1.body().getData().getEvolutionStage()));
                if(map!=null&&map.size()!=0){
                    updateIntent.putExtra(CalendarWidget.EXTRA_ITEM1,map);
                    check =true;
                }
            }
            if(check){
                updateIntent.setAction(CalendarWidget.DATA_FETCH_ACTION);
                sendBroadcast(updateIntent);
            }
            if(response1.isSuccessful()&&response1.body()!=null){
                HashMap<String,String> map = new HashMap<>();
                 map.put("nickName",response1.body().getData().getNickName());
                map.put("userLevel",Integer.toString(response1.body().getData().getUserLevel()));
                map.put("characterIndex",Integer.toString(response1.body().getData().getCharacterIndex()));
                map.put("evolutionStage",Integer.toString(response1.body().getData().getEvolutionStage()));

                if(map!=null&&map.size()!=0){
                    updateIntent1.putExtra(DirectRunWidget.EXTRA_ITEM2,map);
                    check1 =true;

                }

                if(check1){
                    updateIntent.setAction(DirectRunWidget.DATA_FETCH_ACTION2);
                    sendBroadcast(updateIntent1);

                }
            }


        } catch (IOException e) {
            // Handle the IOException
            e.printStackTrace();
            // Log or handle the exception here
        }
    }

}
