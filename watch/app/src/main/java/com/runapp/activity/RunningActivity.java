package com.runapp.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.PowerManager;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager2.widget.ViewPager2;

import com.runapp.adapter.ViewPagerAdapter;
import com.runapp.database.AppDatabase;
import com.runapp.databinding.ActivityRunningBinding;
import com.runapp.dto.RunningDataDTO;
import com.runapp.model.RunDetail;
import com.runapp.model.RunningData;
import com.runapp.model.RunningViewModel;
import com.runapp.service.LocationService;
import com.runapp.service.SensorService;
import com.runapp.service.TimerService;
import com.runapp.util.ApiUtil;
import com.runapp.util.Conversion;
import com.runapp.util.MyApplication;
import com.runapp.util.NetworkUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RunningActivity extends AppCompatActivity {

    private ActivityRunningBinding binding;
    private RunningViewModel runningViewModel;
    private TimerService timerService;
    private double initialStepCount = 0;
    private List<RunDetail> runDetailsList = new ArrayList<>();
    private AppDatabase db;
    private RunningData runningData;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private Long totalTime = 1L;
    private int speedCountTime = 0;
    private double totalSpeed = 0;
    private Conversion conversion = new Conversion();
    private double distance = 0;
    private Intent sensorIntent;
    private Intent locationIntent;
    private PowerManager.WakeLock wakeLock;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRunningBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        db = AppDatabase.getDatabase(getApplicationContext());

        PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "AppName:SensorWakeLock");
        wakeLock.acquire();

        runningData = new RunningData();
        runningData.setUserId(6L);
        runningData.setDate(new Date());
        runningData.setFormattedDate(conversion.formatDate(runningData.getDate()));
        runningData.setCharacterId(1);
        runningData.setAveragePace(0f);
        runningData.setAverageSpeed(0f);
        runningData.setAverageHeartRate(0f);
        runningData.setCharacterInfoId(1);

        // 혼자달리기인지 함께달리기인지 구분
        String type = getIntent().getStringExtra("run_type");
        if(type.equals("PAIR")){
            runningData.setType("PAIR");
        }else if(type.equals("ALONE")){
            runningData.setType("ALONE");
        }

        // 러닝 뷰 모델을 생성한다.
        runningViewModel = new ViewModelProvider((MyApplication) getApplication()).get(RunningViewModel.class);

        runningViewModel.getRunningData().setValue(runningData);
        runningViewModel.setDistance(0f);
        runningViewModel.setStepCount(0f);
        runningViewModel.setMsSpeed(0f);
        runningViewModel.setMsPace("0'00''");


        // 뷰페이저2를 생성(activity_running.xml에서 가져옴)
        ViewPager2 viewPager = binding.viewPager;
        // 뷰페이저 어댑터 생성하고 설정
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        // TimerService 생성 및 시작
        Handler timerHandler = new Handler(Looper.getMainLooper());
        timerService = new TimerService(timerHandler, new Runnable() {
            @Override
            public void run() {
                updateTimer();
                timerService.startTimer(); // 타이머를 계속 반복하기 위해 다시 시작
            }
        });
        timerService.startTimer();

        // 위치서비스 포그라운드 실행
        locationIntent = new Intent(this, LocationService.class);
        startForegroundService(locationIntent);
        // 센서서비스 포그라운드 실행
        sensorIntent = new Intent(this, SensorService.class);
        startForegroundService(sensorIntent);
    }

    // 시간 업데이트 메서드
    private void updateTimer() {
        long millis = timerService.getElapsedTime();
        int seconds = (int) (millis / 1000);
        int minutes = seconds / 60;
        seconds = seconds % 60;

        RunDetail detail = new RunDetail();
        if (runningViewModel.getDistance().getValue() != null) {
            distance = runningViewModel.getDistance().getValue();
            detail.setDistance(Math.round(distance * 100) / 100.0);
        }
        if (runningViewModel.getMsPaceToSecond().getValue() != null) {
            detail.setPace(runningViewModel.getMsPaceToSecond().getValue());
        }
        if (runningViewModel.getMsSpeed().getValue() != null) {
            double speed = runningViewModel.getMsSpeed().getValue();
            detail.setSpeed(speed);
            if(speed <= 0.4){
                detail.setState("STOP");
            }else if(speed > 0.4 && speed <= 1.5){
                detail.setState("WALK");
            }
            else if(speed > 1.5 && speed <= 3.0){
                detail.setState("RACEWALK");
            }else{
                detail.setState("RUN");
            }
        }
        if (runningViewModel.getHeartRate().getValue() != null) {
            detail.setHeartRate(runningViewModel.getHeartRate().getValue());
        }
        detail.setSecond(totalTime++);
        if(runningViewModel.getLongitude().getValue() != null){
            detail.setLongitude(runningViewModel.getLongitude().getValue());
        }
        if(runningViewModel.getLatitude().getValue() != null){
            detail.setLatitude(runningViewModel.getLatitude().getValue());
        }

        runDetailsList.add(detail);

        if(runningViewModel.getMsSpeed().getValue() != 0){
            speedCountTime ++;
            totalSpeed += runningViewModel.getMsSpeed().getValue();
        }

        runningViewModel.setElapsedTime(String.format(Locale.getDefault(), "%02d:%02d", minutes, seconds));
    }


    // 데이터 추가(메인 스레드에서 분리하기 위해서)
    private void addRunningData(RunningData runningData) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningDataDAO().insert(runningData);
            }
        });
    }

    // 종료
    @Override
    protected void onDestroy() {

        if (wakeLock.isHeld()) {
            wakeLock.release();
        }
        stopService(sensorIntent); // 센서서비스 중지
        stopService(locationIntent); // 위치서비스 중지
        timerService.stopTimer(); // 타이머 중지


        SharedPreferences sharedPreferences = getSharedPreferences("SENSOR_DATA", MODE_PRIVATE);
        double totalHeartRate = sharedPreferences.getFloat("totalHeartRate", 0);
        int heartRateCount = sharedPreferences.getInt("heartCountTime", 0);
        Log.d("심박1", String.valueOf(totalHeartRate));
        Log.d("심박2", String.valueOf(heartRateCount));

        runningData.setRunningRecordInfos(runDetailsList);
        runningData.setStepCount(runningViewModel.getStepCount().getValue());
        double totalDistance = runningViewModel.getDistance().getValue();
        runningData.setTotalDistance(Math.round(totalDistance * 100) / 100.0);
        runningData.setAverageHeartRate(Math.round((totalHeartRate/heartRateCount) * 100) / 100.0);
        double avgSpeed = Math.round((totalSpeed/speedCountTime) * 100) / 100.0;
        runningData.setAverageSpeed(avgSpeed);
        Map<String, Integer> result = conversion.msToPace((totalSpeed / speedCountTime));
        int minute = result.get("minutes");
        int second = result.get("seconds");
        runningData.setAveragePace((60 * minute) + second);

        // 최종 시간 업데이트
        runningData.setTotalTime(totalTime - 1);

        addRunningData(runningData);
        String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY5ODM4NjY3MiwiZXhwIjoxNjk5NTk2MjcyfQ.pCTpmULptHoysP5BAwq6srropl_p1k8YeXfbEvFFAsY";

        // 네트워크 연결됐는지 확인
        if(new NetworkUtil(this).getNetworkConnected()){
            /*
            * 연결이 됐으면 ApiUtil에서 토큰이랑 데이터 담아서 전송.
            * 비동기적으로 처리되게끔 요청을 큐에 집어넣는다.
            * 그리고 해당 API 호출의 응답이 돌아오면 실행될 콜백 함수를 정의해놓는다.
            * */

            RunningDataDTO runningDataDTO = runningData.toDTO();
            Log.d("보내는리스트", String.valueOf(runningDataDTO.toString()));
            ApiUtil.getApiService().postRunningData(token, runningDataDTO).enqueue(new Callback<Void>() {
                // api 호출이 완료되면 콜백 실행
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    if(response.isSuccessful()){
                        Log.d("데이터 전송", "몽고디비로 데이터 전송 성공");
                        Toast.makeText(RunningActivity.this, "기록 저장 성공", Toast.LENGTH_SHORT).show();
                    }else{
                        Log.d("데이터 전송", "몽고디비로 데이터 전송 실패");
                        Toast.makeText(RunningActivity.this, "기록 저장 실패", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t) {
                    Log.d("데이터 전송", t.toString());
                }
            });
        }else{
            Log.d("데이터 전송", "인터넷 연결 안 됨");
        }
        super.onDestroy();
    }
}
