package com.runapp.model;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;


public class RunningViewModel extends ViewModel {

    private final MutableLiveData<Float> heartRate = new MutableLiveData<>();
    private final MutableLiveData<String> elapsedTime = new MutableLiveData<>();
    private final MutableLiveData<String> msPace = new MutableLiveData<>();
    private final MutableLiveData<Float> msSpeed = new MutableLiveData<>();
    private final MutableLiveData<Float> distance = new MutableLiveData<>();
    private final MutableLiveData<Float> stepCounter = new MutableLiveData<>();
    private final MutableLiveData<Float> latitude = new MutableLiveData<>();
    private final MutableLiveData<Float> longitude = new MutableLiveData<>();
    private MutableLiveData<RunningData> runningData = new MutableLiveData<>();

    public MutableLiveData<RunningData> getRunningData() {
        return runningData;
    }
    public void setHeartRate(float rate) {
        heartRate.setValue(rate);
    }

    public LiveData<Float> getHeartRate() {
        return heartRate;
    }

    public void setDistance(float value) {
        distance.setValue(value);
    }
    public void setMsPace(String value) {
        msPace.setValue(value);
    }

    public LiveData<Float> getDistance() {
        return distance;
    }

    public void setElapsedTime(String time) {
        elapsedTime.setValue(time);
    }

    public LiveData<String> getElapsedTime() {
        return elapsedTime;
    }

    public MutableLiveData<String> getMsPace() {
        return msPace;
    }

    public MutableLiveData<Float> getMsSpeed() {
        return msSpeed;
    }

    public void setRunningData(MutableLiveData<RunningData> runningData) {
        this.runningData = runningData;
    }

    public void setStepCounter(float value) {
        this.stepCounter.setValue(value);
    }

    public void setMsSpeed(float value) {
        this.msSpeed.setValue(value);
    }

    public LiveData<Float> getStepCounter() {
        return stepCounter;
    }

    public MutableLiveData<Float> getLatitude() {
        return latitude;
    }

    public MutableLiveData<Float> getLongitude() {
        return longitude;
    }
    public void setLatitude(float latitude){
        this.latitude.setValue(latitude);
    }
    public void setLongitude(float longitude){
        this.longitude.setValue(longitude);
    }
}
