package com.runapp.model;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class RunningViewModel extends ViewModel {

    private final MutableLiveData<Float> heartRate = new MutableLiveData<>();
    private final MutableLiveData<String> elapsedTime = new MutableLiveData<>();
    private final MutableLiveData<Float> speed = new MutableLiveData<>();

    public void setHeartRate(float rate) {
        heartRate.setValue(rate);
    }

    public LiveData<Float> getHeartRate() {
        return heartRate;
    }

    public void setElapsedTime(String time) {
        elapsedTime.setValue(time);
    }

    public LiveData<String> getElapsedTime() {
        return elapsedTime;
    }

    public void setSpeed(float speed) {
        this.speed.setValue(speed);
    }

    public LiveData<Float> getSpeed() {
        return speed;
    }
}
