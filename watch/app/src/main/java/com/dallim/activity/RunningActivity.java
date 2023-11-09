package com.dallim.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager2.widget.ViewPager2;

import com.dallim.adapter.ViewPagerAdapter;
import com.dallim.database.AppDatabase;
import com.dallim.databinding.ActivityRunningBinding;
import com.dallim.dto.RunningDataDTO;
import com.dallim.model.RunDetail;
import com.dallim.model.RunningData;
import com.dallim.service.LocationService;
import com.dallim.service.RunningService;
import com.dallim.service.SensorService;
import com.dallim.service.TimerService;
import com.dallim.util.AccessToken;
import com.dallim.util.ApiUtil;
import com.dallim.util.Conversion;
import com.dallim.util.MyApplication;
import com.dallim.util.NetworkUtil;
import com.dallim.util.PreferencesUtil;
import com.dallim.view.RunningMateRecordViewModel;
import com.dallim.view.RunningViewModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RunningActivity extends AppCompatActivity {

    private ActivityRunningBinding binding;
    private RunningViewModel runningViewModel;
    private RunningMateRecordViewModel runningMateRecordViewModel;
    private List<RunDetail> runDetailsList = new ArrayList<>();
    private AppDatabase db;
    private RunningData runningData;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private Long totalTime = 1L;
    private int speedCountTime = 0;
    private double totalSpeed = 0;
    private Conversion conversion = new Conversion();
    private Intent sensorIntent;
    private Intent locationIntent;
    private Intent timerServiceIntent;
    private SharedPreferences prefs;
    private List<RunDetail> runningMateRecord = new ArrayList<>();
    private RunningService runningService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRunningBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        runningService = new RunningService(getApplicationContext());

        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());

        db = AppDatabase.getDatabase(getApplicationContext());


        long startTime = System.currentTimeMillis();
        System.out.println("시작 시간 : " + startTime);
        runningData = new RunningData();
        runningData.setUserId(prefs.getLong("userId", 0L));
        runningData.setFormattedDate(conversion.formatDate(runningData.getDate()));
        runningData.setCharacterId(prefs.getLong("characterIndex", 0L));
        runningData.setEvolutionStage(prefs.getInt("evolutionStage", 0));

        // 러닝 뷰 모델을 생성한다.
        runningViewModel = new ViewModelProvider((MyApplication) getApplication()).get(RunningViewModel.class);

        runningViewModel.getRunningData().setValue(runningData);


        String type = getIntent().getStringExtra("run_type");
        // 같이 달리기
        if(type.equals("PAIR")){
            Log.e("달리기", "함께 달리기");
            runningData.setType("PAIR");
            String runningRecordId = prefs.getString("runningRecordId", null);
            runningData.setRivalRecordId(runningRecordId);
            // 러닝 뷰 모델을 생성한다.
            runningMateRecordViewModel = new ViewModelProvider((MyApplication) getApplication()).get(RunningMateRecordViewModel.class);
            runningViewModel.setPairCheck(true);
        }
        // 혼자 달리기
        else if(type.equals("ALONE")){
            Log.e("달리기", "싱글 달리기");
            runningData.setType("ALONE");
            runningViewModel.setPairCheck(false);
            runningData.setWinOrLose(null);
        }
        
        
        // 뷰페이저2를 생성(activity_running.xml에서 가져옴)
        ViewPager2 viewPager = binding.viewPager;
        // 뷰페이저 어댑터 생성하고 설정
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        // 위치서비스 포그라운드 실행
        locationIntent = new Intent(this, LocationService.class);
        startForegroundService(locationIntent);

        // 센서서비스 포그라운드 실행
        sensorIntent = new Intent(this, SensorService.class);
        startForegroundService(sensorIntent);

        // 타임서비스 포그라운드 실행
        timerServiceIntent = new Intent(this, TimerService.class);
        startForegroundService(timerServiceIntent);
        
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
        stopService(sensorIntent); // 센서서비스 중지
        stopService(locationIntent); // 위치서비스 중지
        stopService(timerServiceIntent); // 타임서비스 중지

        if (runningViewModel.getOriDistance().getValue() == null || runningViewModel.getOriDistance().getValue() <= 0.001) {
            Toast.makeText(this, "기록이 너무 짧아 저장되지 않습니다.", Toast.LENGTH_LONG).show();
            super.onDestroy();
            return; // 메서드를 여기서 종료
        }

        if(runningViewModel.getTotalSpeed().getValue() != 0){
            totalSpeed = runningViewModel.getTotalSpeed().getValue();
        }
        if(runningViewModel.getSpeedCountTime().getValue() != 0){
            speedCountTime = runningViewModel.getSpeedCountTime().getValue();
        }
        if(runningViewModel.getTotalTime().getValue() != 0){
            totalTime = runningViewModel.getTotalTime().getValue();
        }

        // 평균 심박수
        Double totalHeartRate = runningViewModel.getTotalHeartRate().getValue();
        Integer heartRateCount = runningViewModel.getHeartCountTime().getValue();
        runningData.setAverageHeartRate(Math.round((totalHeartRate/heartRateCount) * 100) / 100.0);

        runningData.setRunningRecordInfos(runningViewModel.getRunDetailList().getValue());
        // 발걸음
        runningData.setStepCount(runningViewModel.getStepCount().getValue());

        // 전체 이동 거리(m)
        double totalDistance = runningViewModel.getOriDistance().getValue();
        runningData.setTotalDistance(Math.round(totalDistance * 100) / 100.0);
        System.out.println("총 속도 : " + totalSpeed);
        System.out.println("총 속도 카운트 : " + speedCountTime);

        // 초기 위경도 추가
        runningData.setInitLatitude(runningViewModel.getInitLatitude().getValue());
        runningData.setInitLongitude(runningViewModel.getInitLongitude().getValue());

        // 평균 이동 속도(m/s)
        double avgSpeed = Math.round((totalSpeed/speedCountTime) * 100) / 100.0;
        System.out.println("속도 : " + avgSpeed);
        runningData.setAverageSpeed(avgSpeed);

        // 평균 페이스
        Map<String, Integer> result = conversion.msToPace((totalSpeed / speedCountTime));
        int minute = result.get("minutes");
        int second = result.get("seconds");
        runningData.setAveragePace((60 * minute) + second);

        // 최종 시간 업데이트
        runningData.setTotalTime(totalTime - 1);
        System.out.println("최종시간 : " + totalTime);

        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;

        // 네트워크 연결됐는지 확인
        if(new NetworkUtil().isOnline(this)){
            /*
            * 연결이 됐으면 ApiUtil에서 토큰이랑 데이터 담아서 전송.
            * 비동기적으로 처리되게끔 요청을 큐에 집어넣는다.
            * 그리고 해당 API 호출의 응답이 돌아오면 실행될 콜백 함수를 정의해놓는다.
            * */
            runningData.setTranslation(true);
            addRunningData(runningData);
            RunningDataDTO runningDataDTO = runningData.toDTO();
            long characterId = prefs.getLong("characterId", 0L);
            runningDataDTO.setCharacterId(characterId);
            Log.d("보내는리스트", String.valueOf(runningDataDTO.toString()));
            ApiUtil.getApiService().postRunningData(token, runningDataDTO).enqueue(new Callback<Void>() {
                // api 호출이 완료되면 콜백 실행
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    if(response.isSuccessful()){
                        Log.d("데이터 전송", "몽고디비로 데이터 전송 성공");
                        Toast.makeText(RunningActivity.this, "기록 저장 성공", Toast.LENGTH_SHORT).show();
                    }else{
                        Log.e("달리기 기록 저장 실패", response.errorBody().toString());
                        Toast.makeText(RunningActivity.this, "기록 저장 실패", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t) {
                    Log.e("달리기 기록 저장 실패(서버)", t.getMessage());
                    Log.d("데이터 전송", t.toString());
                }
            });
        }else{
            runningData.setTranslation(false);
            addRunningData(runningData);
            Log.d("데이터 전송", "인터넷 연결 안 됨");
        }
        super.onDestroy();
    }
}
