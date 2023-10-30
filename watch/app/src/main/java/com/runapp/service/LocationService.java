package com.runapp.service;

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
import com.runapp.model.RunningViewModel;
import com.runapp.util.Conversion;
import com.runapp.util.MyApplication;

import java.util.Map;

public class LocationService extends Service {

    private static final String TAG = "LocationService";
    private FusedLocationProviderClient fusedLocationProviderClient;
    private Location lastLocation;
    private float totalDistance = 0f;
    private Conversion conversion;
    private LocationCallback locationCallback;
    private RunningViewModel runningViewModel;
    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID = "SensorServiceChannel";

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Location Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    private Notification getNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Location Service Running")
                .setContentText("Location data is being collected.");
        return builder.build();
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
            float distance = lastLocation.distanceTo(location);
            totalDistance += Math.round((distance / 1000) * 100) / 100.0;
            runningViewModel.setDistance(totalDistance);

            float speed = location.getSpeed();
            // 초속 0.4 이상이면 걷는 걸로 판단.
            if(speed >= 0.4){
                speed = (float) (Math.round(speed * 100) / 100.0);
                runningViewModel.setMsSpeed(speed);
                Map<String, Integer> result = conversion.msToPace(speed);
                Integer minutes = result.get("minutes");
                Integer seconds = result.get("seconds");
                String format = String.format("%d'%02d''", minutes, seconds);
                runningViewModel.setMsPace(format);
            }

            Log.d(TAG,  "총 이동거리" + totalDistance + "KM, 이동거리: " + distance + " M, 속도: " + speed + " m/s");
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
        createNotificationChannel();
        Notification notification = getNotification();
        startForeground(NOTIFICATION_ID, notification);

        return START_STICKY;
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
    }
}
