package com.runapp.service;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.runapp.R;
import com.runapp.activity.RunningActivity;

public class LocationService extends Service {
    public static final String ACTION_LOCATION_UPDATE = "com.runapp.activity.LocationService.LOCATION_UPDATE";
    private LocationManager locationManager;
    private LocationListener locationListener;

    @Override
    public void onCreate() {
        super.onCreate();

        // 위치 관리자 및 리스너 설정
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                // 위치가 변경될 때마다 브로드캐스트 메시지를 전송하여 액티비티에서 업데이트를 받을 수 있도록 합니다.
                Intent intent = new Intent(ACTION_LOCATION_UPDATE);
                intent.putExtra("location", location);
                LocalBroadcastManager.getInstance(LocationService.this).sendBroadcast(intent);
            }

            // 다른 콜백 메서드들은 필요에 따라 구현하세요.
        };

        // 위치 업데이트 요청
        try {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 10, locationListener);
        } catch (SecurityException e) {
            e.printStackTrace(); // 실제 앱에서는 적절한 오류 처리를 수행해야 합니다.
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Foreground 서비스 시작
        startForeground(1, getNotification());

        // 이 서비스가 강제 종료된 경우 시스템이 다시 생성하지 않도록 합니다.
        return START_NOT_STICKY;
    }

    private Notification getNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "location_channel")
                .setContentTitle("거리 속도 서비스")
                .setContentText("거리와 속도를 추적중입니다.")
                .setSmallIcon(R.drawable.heart) // 알림 아이콘 설정
                .setPriority(NotificationCompat.PRIORITY_LOW); // 알림 우선 순위 설정

        Intent intent = new Intent(this, RunningActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);
        builder.setContentIntent(pendingIntent);

        return builder.build();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        locationManager.removeUpdates(locationListener); // 위치 업데이트 중지
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
