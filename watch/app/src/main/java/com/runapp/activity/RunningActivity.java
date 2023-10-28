package com.runapp.activity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
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
import com.runapp.util.LocationHelper;
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
    private SensorService sensorService;
    private TimerService timerService;
    private SensorEventListener universalSensorListener;
    private Location previousLocation;
    private float totalDistance = 0f;
    private float initialStepCount = 0f;
    private List<RunDetail> runDetailsList = new ArrayList<>();
    private AppDatabase db;
    private RunningData runningData;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private Long totalTime = 1L;
    private int speedCountTime = 0;
    private float totalSpeed = 0f;
    // 심박수 평균을 위한 카운트
    private int heartCountTime = 0;
    private float totalHeartRate = 0f;
    private Conversion conversion = new Conversion();
    private LocationHelper locationHelper;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRunningBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        locationHelper = new LocationHelper(this);

        db = AppDatabase.getDatabase(getApplicationContext());

        runningData = new RunningData();
        runningData.setUserId(1L);
        runningData.setDate(new Date());
        runningData.setFormattedDate(conversion.formatDate(runningData.getDate()));
        runningData.setCharacterId(1);
        runningData.setAveragePace("0'00''");
        runningData.setAverageSpeed(0f);
        runningData.setAverageHeartRate(0f);

        // 혼자달리기인지 함께달리기인지 구분
        String type = getIntent().getStringExtra("run_type");
        if(type.equals("PAIR")){
            runningData.setType("PAIR");
        }else if(type.equals("ALONE")){
            runningData.setType("ALONE");
        }

        // 러닝 뷰 모델을 생성한다.
        runningViewModel = new ViewModelProvider(this).get(RunningViewModel.class);
        runningViewModel.getRunningData().setValue(runningData);
        runningViewModel.setDistance(0f);
        runningViewModel.setMsSpeed(0f);
        runningViewModel.setMsPace("0'00''");


        // 뷰페이저2를 생성(activity_running.xml에서 가져옴)
        ViewPager2 viewPager = binding.viewPager;
        // 뷰페이저 어댑터 생성하고 설정
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        // 시스템에서 센서 매니저 서비스를 가져온다.
        SensorManager sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        initializeSensorListener();

        // SensorService 생성 및 센서 등록
        sensorService = new SensorService(sensorManager, universalSensorListener);
        sensorService.registerHeartRateSensor();
        sensorService.registerStepCounterSensor();

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

//        LocationRequest locationRequest = LocationRequest.create();
//        locationRequest.setInterval(1000); // 위치 업데이트 간격
//        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        locationHelper.startLocationUpdates();
    }

    /*
        센서 이벤트 리스너를 만들어서 변경사항을 추적함.
        현재 발걸음 센서, 심박수 센서 관리중.
        센서 발걸음을 쓰면 장치가 재부팅 된 이후부터의 발걸음을 관리해서 현재 발걸음을 추적하기 위해
        (현재 발걸음 - 초기 발걸음)을 통해 계산함.
         */
    private void initializeSensorListener() {
        universalSensorListener = new SensorEventListener() {
            // 센서의 값이 변경될 때마다 실행되는 메서드이다.
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                // 센서의 타입이 심박수면
                if (sensorEvent.sensor.getType() == Sensor.TYPE_HEART_RATE) {
                    // 센서값을 꺼내서 뷰모델에 갱신해준다.
                    float heartRate = sensorEvent.values[0];
                    if(heartRate != 0){
                        heartCountTime++;
                        totalHeartRate += heartRate;
                    }
                    runningViewModel.setHeartRate(heartRate);
                }
                // 센서의 타입이 발걸음이면
                else if (sensorEvent.sensor.getType() == Sensor.TYPE_STEP_COUNTER) {
                    // 발걸음을 계산해서 뷰모델에 갱신해준다.
                    float currentTotalSteps = sensorEvent.values[0];
                    if (initialStepCount == 0) {
                        initialStepCount = currentTotalSteps;
                    }

                    float sessionSteps = currentTotalSteps - initialStepCount;
                    Log.d("발걸음", String.valueOf(sessionSteps));
                    runningViewModel.setStepCounter(sessionSteps);
                }
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {
                // 필요에 따라 정확도 변경 처리
            }
        };
    }

    // 시간 업데이트 메서드
    private void updateTimer() {
        long millis = timerService.getElapsedTime();
        int seconds = (int) (millis / 1000);
        int minutes = seconds / 60;
        seconds = seconds % 60;

        String formattedTime = String.format(Locale.getDefault(), "%02d분 %02d초", minutes, seconds);

        RunDetail detail = new RunDetail();
        if (runningViewModel.getDistance().getValue() != null) {
            detail.setDistance(runningViewModel.getDistance().getValue());
        }
        if (runningViewModel.getMsPace().getValue() != null) {
            detail.setPace(runningViewModel.getMsPace().getValue().toString());
        }
        if (runningViewModel.getMsSpeed().getValue() != null) {
            detail.setSpeed(runningViewModel.getMsSpeed().getValue());
        }
        if (runningViewModel.getHeartRate().getValue() != null) {
            detail.setHeartRate(runningViewModel.getHeartRate().getValue());
        }
        detail.setSecond(totalTime++);

        runDetailsList.add(detail);

        runningViewModel.setElapsedTime(String.format(Locale.getDefault(), "%02d:%02d", minutes, seconds));
    }

    private BroadcastReceiver locationUpdateReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (LocationService.ACTION_LOCATION_UPDATE.equals(intent.getAction())) {
                Location location = intent.getParcelableExtra("location");
                // Do something with the location update
            }
        }
    };

    @Override
    protected void onResume() {
        super.onResume();
        LocalBroadcastManager.getInstance(this).registerReceiver(locationUpdateReceiver, new IntentFilter(LocationService.ACTION_LOCATION_UPDATE));
    }

    @Override
    protected void onPause() {
        super.onPause();
        LocalBroadcastManager.getInstance(this).unregisterReceiver(locationUpdateReceiver);
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
        super.onDestroy();
        sensorService.unregisterSensors(); // 센서 리스너 등록 해제
        timerService.stopTimer(); // 타이머 중지

        // LocationService 종료
        Intent serviceIntent = new Intent(this, LocationService.class);
        stopService(serviceIntent);


        // float speed = (float) Math.round(location.getSpeed() * 1000) / 1000f;
        runningData.setRunningRecordInfos(runDetailsList);
        runningData.setStepCounter(runningViewModel.getStepCounter().getValue());
        runningData.setTotalDistance(totalDistance);
        runningData.setAverageHeartRate(totalHeartRate/heartCountTime);
        runningData.setAverageSpeed(totalSpeed/speedCountTime);
        Log.d("총속도", String.valueOf(totalSpeed));
        Log.d("속도카운트", String.valueOf(speedCountTime));
        Map<String, Integer> result = conversion.msToPace((totalSpeed / speedCountTime));
        int minute = result.get("minutes");
        int second = result.get("seconds");
        runningData.setAveragePace(String.format(Locale.getDefault(), "%d'%02d''", minute, second));

        // 최종 시간 업데이트
        long elapsedTime = timerService.getElapsedTime();
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
            Log.d("타임스탬프", String.valueOf(runningDataDTO.getDate()));
            Log.d("보내는리스트", String.valueOf(runningDataDTO.toString()));
            ApiUtil.getApiService().postRunningData(token, runningDataDTO).enqueue(new Callback<Void>() {
                // api 호출이 완료되면 콜백 실행
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    if(response.isSuccessful()){
                        Log.d("데이터 전송", "몽고디비로 데이터 전송 성공");
                    }else{
                        Log.d("데이터 전송", "몽고디비로 데이터 전송 실패");
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
    }
}
