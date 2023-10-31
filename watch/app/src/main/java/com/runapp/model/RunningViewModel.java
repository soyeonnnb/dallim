package com.runapp.model;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;


public class RunningViewModel extends ViewModel {

    private final MutableLiveData<Double> heartRate = new MutableLiveData<>();
    private final MutableLiveData<String> elapsedTime = new MutableLiveData<>();
    private final MutableLiveData<String> msPace = new MutableLiveData<>();
    private final MutableLiveData<Double> msSpeed = new MutableLiveData<>();
    private final MutableLiveData<Double> distance = new MutableLiveData<>();
    private final MutableLiveData<Double> stepCounter = new MutableLiveData<>();
    private final MutableLiveData<Double> latitude = new MutableLiveData<>();
    private final MutableLiveData<Double> longitude = new MutableLiveData<>();
    private MutableLiveData<RunningData> runningData = new MutableLiveData<>();

    public MutableLiveData<RunningData> getRunningData() {
        return runningData;
    }
    public void setHeartRate(double rate) {
        heartRate.setValue(rate);
    }

    public LiveData<Double> getHeartRate() {
        return heartRate;
    }

    public void setDistance(double value) {
        distance.setValue(value);
    }
    public void setMsPace(String value) {
        msPace.setValue(value);
    }

    public LiveData<Double> getDistance() {
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

    public MutableLiveData<Double> getMsSpeed() {
        return msSpeed;
    }

    public void setRunningData(MutableLiveData<RunningData> runningData) {
        this.runningData = runningData;
    }

    public void setStepCounter(double value) {
        this.stepCounter.setValue(value);
    }

    public void setMsSpeed(double value) {
        this.msSpeed.setValue(value);
    }

    public LiveData<Double> getStepCounter() {
        return stepCounter;
    }

    public MutableLiveData<Double> getLatitude() {
        return latitude;
    }

    public MutableLiveData<Double> getLongitude() {
        return longitude;
    }
    public void setLatitude(double latitude){
        this.latitude.setValue(latitude);
    }
    public void setLongitude(double longitude){
        this.longitude.setValue(longitude);
    }
}
