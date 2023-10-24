package com.runapp.activity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import androidx.viewpager2.widget.ViewPager2;

import com.runapp.adapter.ViewPagerAdapter;
import com.runapp.databinding.ActivityRunningBinding;
import com.runapp.model.RunningViewModel;
import com.runapp.service.LocationService;
import com.runapp.service.SensorService;
import com.runapp.service.TimerService;

import java.util.Locale;

public class RunningActivity extends AppCompatActivity {

    private ActivityRunningBinding binding;
    private RunningViewModel runningViewModel;
    private SensorService sensorService;
    private TimerService timerService;
    private SensorEventListener universalSensorListener;
    private long startTime;
    private LocationManager lm;
    private Location previousLocation;
    private float totalDistance;

    private float initialStepCount = -1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityRunningBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        runningViewModel = new ViewModelProvider(this).get(RunningViewModel.class);

        // Set up the ViewPager with the sections adapter.
        ViewPager2 viewPager = binding.viewPager;
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        SensorManager sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        initializeSensorListener();

        Intent serviceIntent = new Intent(this, LocationService.class);
        ContextCompat.startForegroundService(this, serviceIntent);

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

        lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        if ( Build.VERSION.SDK_INT >= 29 &&
                ContextCompat.checkSelfPermission( getApplicationContext(), android.Manifest.permission.ACCESS_FINE_LOCATION ) != PackageManager.PERMISSION_GRANTED ) {
            ActivityCompat.requestPermissions( RunningActivity.this, new String[] {
                    android.Manifest.permission.ACCESS_FINE_LOCATION}, 0 );
            // 위치정보를 원하는 시간, 거리마다 갱신해준다.
            Log.d("위치정보", "정보 들어옴");
            lm.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                    1000,
                    1,
                    gpsLocationListener);
        }else{
            Log.d("위치정보", "정보 들어옴");
            lm.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                    1000,
                    1,
                    gpsLocationListener);
        }
    }


    // 위치 정보가 업데이트 될 때마다 호출되는 콜백 인터페이스이다.
    final LocationListener gpsLocationListener = new LocationListener() {
        // 콜백 메서드
        public void onLocationChanged(Location location) {
            if (previousLocation != null) {
                // 이전 위치와 현재 위치 사이의 거리를 미터 단위로 계산합니다.
                float distance = location.distanceTo(previousLocation);
                totalDistance += distance;  // 총 거리에 추가
                Log.d("거리", String.valueOf(distance));
                runningViewModel.setDistance(totalDistance);  // 뷰 모델에 총 거리 업데이트
            }
            previousLocation = location;

            float speed = location.getSpeed();// 속도정보
            Log.d("현재 속도", String.valueOf(speed));
            runningViewModel.setSpeed(speed);
        } public void onStatusChanged(String provider, int status, Bundle extras) {

        } public void onProviderEnabled(String provider) {

        } public void onProviderDisabled(String provider) {

        }
    };

    @Override
    protected void onDestroy() {
        super.onDestroy();
        sensorService.unregisterSensors(); // 센서 리스너 등록 해제
        timerService.stopTimer(); // 타이머 중지

        // LocationService 종료
        Intent serviceIntent = new Intent(this, LocationService.class);
        stopService(serviceIntent);
    }


    /*
        센서이벤트리스너를 만들어서 변경사항을 추적함.
        현재 발걸음 센서, 심박수 센서 관리중.
        센서 발걸음을 쓰면 장치가 재부팅 된 이후부터의 발걸음을 관리해서 현재 발걸음을 추적하기 위해
        (현재 발걸음 - 초기 발걸음)을 통해 계산함.
         */
    private void initializeSensorListener() {
        universalSensorListener = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                if (sensorEvent.sensor.getType() == Sensor.TYPE_HEART_RATE) {
                    float heartRate = sensorEvent.values[0];
                    runningViewModel.setHeartRate(heartRate);
                }else if(sensorEvent.sensor.getType() == Sensor.TYPE_STEP_COUNTER){
                    float currentTotalSteps = sensorEvent.values[0];
                    if(initialStepCount == -1){
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

    private void updateTimer() {
        long millis = timerService.getElapsedTime();
        int seconds = (int) (millis / 1000);
        int minutes = seconds / 60;
        seconds = seconds % 60;

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
}
