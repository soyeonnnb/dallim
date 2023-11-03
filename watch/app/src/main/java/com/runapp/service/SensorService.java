package com.runapp.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelStoreOwner;

import com.runapp.view.RunningViewModel;

public class SensorService extends Service {
    private RunningViewModel runningViewModel;
    private SensorManager sensorManager;
    private SensorEventListener universalSensorListener;
    private double initialStepCount = 0;
    private double totalHeartRate = 0;
    private int heartCountTime = 0;
    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID = "SensorServiceChannel";
    private SharedPreferences preferences;

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID,
                    "Sensor Service Channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );

            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    private Notification getNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Sensor Service Running")
                .setContentText("Sensor data is being collected.");
        return builder.build();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        runningViewModel = new ViewModelProvider((ViewModelStoreOwner) getApplication()).get(RunningViewModel.class);
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        createNotificationChannel();
        Notification notification = getNotification();
        startForeground(NOTIFICATION_ID, notification);

        // 여기서 센서 및 기타 작업을 시작할 수 있습니다.

        registerHeartRateSensor();
        registerStepCountSensor();

        return START_STICKY;
    }

    public SensorService(){
        initializeSensorListener();
    }

    private void initializeSensorListener() {
        universalSensorListener = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                if (sensorEvent.sensor.getType() == Sensor.TYPE_HEART_RATE) {
                    double heartRate = sensorEvent.values[0];
                    if(heartRate != 0){
                        heartCountTime++;
                        runningViewModel.setHeartCountTime(heartCountTime);
                        totalHeartRate += heartRate;
                        runningViewModel.setTotalHeartRate(totalHeartRate);
                    }
                    heartRate = (Math.round(heartRate * 100) / 100.0);
                    runningViewModel.setHeartRate(heartRate);
                } else if (sensorEvent.sensor.getType() == Sensor.TYPE_STEP_COUNTER) {
                    double currentTotalSteps = sensorEvent.values[0];
                    if (initialStepCount == 0) {
                        initialStepCount = currentTotalSteps;
                    }
                    double sessionSteps = currentTotalSteps - initialStepCount;
                    runningViewModel.setStepCount(sessionSteps);
                    Log.d("발걸음", String.valueOf(sessionSteps));
                }
            }

            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {
                // 필요에 따라 정확도 변경 처리
            }
        };
    }


    public void registerHeartRateSensor() {
        Sensor heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE);
        if (heartRateSensor != null) {
            sensorManager.registerListener(universalSensorListener, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    public void registerStepCountSensor() {
        Sensor StepCountSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        if (StepCountSensor != null) {
            sensorManager.registerListener(universalSensorListener, StepCountSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    public void unregisterSensors() {
        if (sensorManager != null && universalSensorListener != null) {
            sensorManager.unregisterListener(universalSensorListener);
        }
    }

    @Override
    public void onDestroy() {
        unregisterSensors();
        stopForeground(true);

        super.onDestroy();
    }
}
