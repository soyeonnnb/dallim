package com.runapp.service;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.PowerManager;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.lifecycle.ViewModelProvider;

import com.runapp.R;
import com.runapp.database.RunningDataConverters;
import com.runapp.model.RunDetail;
import com.runapp.util.MyApplication;
import com.runapp.view.RunningViewModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class TimerService extends Service {
    private Handler timerHandler;
    private Runnable timerRunnable;
    private long startTime;
    private static final int NOTIFICATION_ID = 10;
    private static final String CHANNEL_ID = "RunningService";
    public static final String TIMER_BR = "com.runapp.service.timerbroadcast";
    private RunningViewModel runningViewModel;
    private Long totalTime = 1L;
    private int speedCountTime = 0;
    private double totalSpeed = 0;
    private List<Double> mateRunningDetail = new ArrayList<>();
    private RunDetail mateRunDetail = new RunDetail();

    @SuppressLint("InvalidWakeLockTag")
    @Override
    public void onCreate() {
        super.onCreate();
        startTime = System.currentTimeMillis();
        timerHandler = new Handler();
        runningViewModel = new ViewModelProvider((MyApplication) getApplication()).get(RunningViewModel.class);
        createNotificationChannel();
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
                Log.d("로그", String.valueOf(elapsedTime));
                updateRunDetailList(elapsedTime);
                Intent intent = new Intent(TIMER_BR);
                intent.putExtra("elapsedTime", elapsedTime);
                sendBroadcast(intent);
                // 1초마다 현재 Runnable을 다시 실행하도록 예약
                timerHandler.postDelayed(this, 1000);
            }
        };
        timerHandler.post(timerRunnable);
    }

    private void updateRunDetailList(long elapsedTime) {
        System.out.println("ㅋㅋ" + elapsedTime);
        int seconds = (int) (elapsedTime / 1000);
        System.out.println(mateRunningDetail.toString());
        if (runningViewModel.getOriDistance() != null && runningViewModel.getOriDistance().getValue() != 0) {
            Double mateDistance = mateRunningDetail.get(seconds);
            Double curDistance = runningViewModel.getOriDistance().getValue();
            Log.d("메이트", String.valueOf(mateDistance));
            Log.d("내기록", String.valueOf(curDistance));
            runningViewModel.setDistanceDifference(Math.round((curDistance - mateDistance) * 10) / 10.0);
        }
        System.out.println(seconds);
        runningViewModel.setTotalTime((long) seconds);
        int minutes = seconds / 60;
        seconds = seconds % 60;

        RunDetail detail = new RunDetail();
        if (runningViewModel.getOriDistance().getValue() != null) {
            detail.setDistance(runningViewModel.getOriDistance().getValue());
        }
        if (runningViewModel.getMsPaceToSecond().getValue() != null) {
            detail.setPace(runningViewModel.getMsPaceToSecond().getValue());
        }
        if (runningViewModel.getMsSpeed().getValue() != null) {
            double speed = runningViewModel.getMsSpeed().getValue();
            detail.setSpeed(speed);
            if (speed <= 0.4) {
                detail.setState("STOP");
            } else if (speed > 0.4 && speed <= 1.5) {
                detail.setState("WALK");
            } else if (speed > 1.5 && speed <= 3.0) {
                detail.setState("RACEWALK");
            } else {
                detail.setState("RUN");
            }
        }
        if (runningViewModel.getHeartRate().getValue() != null) {
            detail.setHeartRate(runningViewModel.getHeartRate().getValue());
        }
        detail.setSecond(runningViewModel.getTotalTime().getValue());
        if (runningViewModel.getLongitude().getValue() != null) {
            detail.setLongitude(runningViewModel.getLongitude().getValue());
        }
        if (runningViewModel.getLatitude().getValue() != null) {
            detail.setLatitude(runningViewModel.getLatitude().getValue());
        }

        if (runningViewModel.getMsSpeed().getValue() != null) {
            speedCountTime++;
            runningViewModel.setSpeedCountTime(speedCountTime);
            totalSpeed += runningViewModel.getMsSpeed().getValue();
            runningViewModel.setTotalSpeed(totalSpeed);
        }
        List<RunDetail> runDetails = runningViewModel.getRunDetailList().getValue();
        if (runDetails == null) {
            runDetails = new ArrayList<>();
        }
        runDetails.add(detail);
        runningViewModel.setRunDetailList(runDetails);


        runningViewModel.setElapsedTime(String.format(Locale.getDefault(), "%02d:%02d", minutes, seconds));

    }

    public void stopTimer() {
        if (timerHandler != null && timerRunnable != null) {
            timerHandler.removeCallbacks(timerRunnable);
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && intent.hasExtra("running_mate_record")) {
            String runningMateRecordJson = intent.getStringExtra("running_mate_record");
            Log.e("출력", runningMateRecordJson);
            mateRunningDetail = RunningDataConverters.doubleFromString(runningMateRecordJson);
        }
        startForeground(NOTIFICATION_ID, getNotification());
        startTimer();

        return START_NOT_STICKY;
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
