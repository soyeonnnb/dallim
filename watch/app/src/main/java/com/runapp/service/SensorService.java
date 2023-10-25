package com.runapp.service;

import android.hardware.Sensor;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

public class SensorService {
    private SensorManager sensorManager;
    private SensorEventListener sensorEventListener;

    public SensorService(SensorManager sensorManager, SensorEventListener sensorEventListener) {
        this.sensorManager = sensorManager;
        this.sensorEventListener = sensorEventListener;
    }

    public void registerHeartRateSensor() {
        Sensor heartRateSensor = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_RATE);
        if (heartRateSensor != null) {
            sensorManager.registerListener(sensorEventListener, heartRateSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    public void registerStepCounterSensor() {
        Sensor stepCounterSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        if (stepCounterSensor != null) {
            sensorManager.registerListener(sensorEventListener, stepCounterSensor, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    public void unregisterSensors() {
        if (sensorManager != null && sensorEventListener != null) {
            sensorManager.unregisterListener(sensorEventListener);
        }
    }
}
