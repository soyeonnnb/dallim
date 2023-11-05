package com.runapp.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.runapp.R;

public class TimerService extends Service {
    private Handler timerHandler;
    private Runnable timerRunnable;
    private long startTime;
    private static final int NOTIFICATION_ID = 10;
    private static final String CHANNEL_ID = "RunningService";
    public static final String TIMER_BR = "com.runapp.service.timerbroadcast";

    @Override
    public void onCreate() {
        super.onCreate();
        startTime = System.currentTimeMillis();
        timerHandler = new Handler();
        createNotificationChannel();
        startForeground(NOTIFICATION_ID, getNotification());
    }

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

    private Notification getNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_launcher_round)
                .setContentTitle("기록중")
                .setContentText("당신의 달리기를 기록하고 있어요");
        return builder.build();
    }

    public void startTimer() {
        timerRunnable = new Runnable() {
            @Override
            public void run() {
                // Broadcast an intent to update the timer in the activity.
                long elapsedTime = System.currentTimeMillis() - startTime;
                Intent intent = new Intent(TIMER_BR);
                intent.putExtra("elapsedTime", elapsedTime);
                sendBroadcast(intent);
                // 1초마다 현재 Runnable을 다시 실행하도록 예약
                timerHandler.postDelayed(this, 1000);
            }
        };
        timerHandler.post(timerRunnable);
    }

    public void stopTimer() {
        if (timerHandler != null && timerRunnable != null) {
            timerHandler.removeCallbacks(timerRunnable);
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startTimer();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        stopTimer();
        super.onDestroy();
        stopForeground(true);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
