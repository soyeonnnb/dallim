package com.runapp.activity;

import android.content.Context;
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
import androidx.health.services.client.HealthServices;
import androidx.health.services.client.HealthServicesClient;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager2.widget.ViewPager2;

import com.runapp.adapter.ViewPagerAdapter;
import com.runapp.databinding.ActivityRunningBinding;
import com.runapp.model.RunningViewModel;

import java.util.Locale;

public class RunningActivity extends AppCompatActivity {

    private ActivityRunningBinding binding;
    private RunningViewModel runningViewModel;
    private SensorManager sensorManager;
    private Sensor heartRateSensor;
    private SensorEventListener heartRateSensorListener;
    private Handler timerHandler;
    private long startTime;
    private LocationManager lm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Inflate the layout for this activity
        binding = ActivityRunningBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        runningViewModel = new ViewModelProvider(this).get(RunningViewModel.class);

        // Set up the ViewPager with the sections adapter.
        ViewPager2 viewPager = binding.viewPager;
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE);

        HealthServicesClient healthServicesClient = HealthServices.getClient(this /* context */);


        SensorEventListener heartRateSensorListener = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                if (sensorEvent.sensor.getType() == Sensor.TYPE_HEART_RATE) {
                    float heartRate = sensorEvent.values[0];
                    runningViewModel.setHeartRate(heartRate);
                }
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {
                // Handle changes in sensor accuracy, if needed.
            }
        };

        // Register the listener for the sensor
        sensorManager.registerListener(heartRateSensorListener, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL);

        timerHandler = new Handler(Looper.getMainLooper());
        startTime = System.currentTimeMillis();
        timerHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                long millis = System.currentTimeMillis() - startTime;
                int seconds = (int) (millis / 1000);
                int minutes = seconds / 60;
                seconds = seconds % 60;

                runningViewModel.setElapsedTime(String.format(Locale.getDefault(), "%02d:%02d", minutes, seconds));

                timerHandler.postDelayed(this, 1000);
            }
        }, 1000);

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
        // Unregister the sensor listener when the activity is destroyed
        sensorManager.unregisterListener(heartRateSensorListener);
        timerHandler.removeCallbacksAndMessages(null);
    }
}
