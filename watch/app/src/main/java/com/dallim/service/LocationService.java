package com.dallim.service;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.dallim.R;
import com.dallim.view.RunningViewModel;
import com.dallim.util.Conversion;
import com.dallim.util.MyApplication;

import java.util.Map;

public class LocationService extends Service {

    private static final String TAG = "LocationService";
    private FusedLocationProviderClient fusedLocationProviderClient;
    private Location lastLocation;
    private double totalDistance = 0f;
    private Conversion conversion;
    private LocationCallback locationCallback;
    private RunningViewModel runningViewModel;
    private static final int NOTIFICATION_ID = 10;
    private static final String CHANNEL_ID = "RunningService";
    private int count = 1;
    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "달림",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // 액티비티랑 러닝뷰모델을 공통으로 씀
        runningViewModel = new ViewModelProvider((MyApplication) getApplication()).get(RunningViewModel.class);

        conversion = new Conversion();
        initLocationClient();
        initLocationCallback();
        startLocationUpdates();
    }

    // 초기 설정
    private void initLocationClient() {
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);

        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(1000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    private void initLocationCallback() {
        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null) return;
                for (Location location : locationResult.getLocations()) {
                    onLocationUpdated(location);
                    break;
                }
            }
        };
    }

    private void onLocationUpdated(Location location) {
        if (lastLocation != null) {
            double speed = location.getSpeed();
            // 초속 0.4 이상이면 걷는 걸로 판단.
            if(speed >= 0.001){
                speed = (Math.round(speed * 100) / 100.0);
                // m/s 저장
                runningViewModel.setMsSpeed(speed);
                if(runningViewModel.getTotalSpeed().getValue() != 0){
                    Double value = runningViewModel.getTotalSpeed().getValue();
                    runningViewModel.setTotalSpeed(value + speed);
                    runningViewModel.setSpeedCountTime(count++);
                }else{
                    runningViewModel.setTotalSpeed(speed);
                }
                Map<String, Integer> result = conversion.msToPace(speed);
                Integer minutes = result.get("minutes");
                Integer seconds = result.get("seconds");
                // 페이스를 초로 변환해서 저장
                runningViewModel.setMsPaceToSecond((minutes * 60) + seconds);
                // 페이스 저장
                String format = String.format("%d’%02d”", minutes, seconds);
                runningViewModel.setMsPace(format);

                double distance = lastLocation.distanceTo(location);
                totalDistance += distance;
                // 원래 미터값
                runningViewModel.setOriDistance((double) Math.round(totalDistance * 10) / 10.0);
                // km 변환값(화면에 표시용)
                runningViewModel.setDistance(Math.round((totalDistance / 1000) * 100) / 100.0);

                double latitude = location.getLatitude(); // 위도
                double longitude = location.getLongitude(); // 경도
                if(runningViewModel.getInitLatitude().getValue() == null && runningViewModel.getInitLongitude().getValue() == null) {
                    runningViewModel.setInitLatitude(latitude);
                    runningViewModel.setInitLongitude(longitude);
                }
                runningViewModel.setLatitude(latitude);
                runningViewModel.setLongitude(longitude);
            }
            Log.d("자른 이동거리", String.valueOf((double) Math.round(totalDistance * 10) / 10.0));
        }
        lastLocation = location;
    }

    public void startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(1000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper());
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        System.out.println("들어옴");
        createNotificationChannel();
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_round)
                .setContentTitle("Location Service Running")
                .setContentText("Location data is being collected.")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);
        Notification notification = builder.build();
        startForeground(NOTIFICATION_ID, notification);

        return START_NOT_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if(locationCallback != null && fusedLocationProviderClient != null){
            fusedLocationProviderClient.removeLocationUpdates(locationCallback);
        }
        stopForeground(true);
    }
}
