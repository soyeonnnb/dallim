package com.dallim.view;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.dallim.model.RunDetail;
import com.dallim.model.RunningData;

import java.util.ArrayList;
import java.util.List;


public class RunningViewModel extends ViewModel {

    private final MutableLiveData<Double> heartRate = new MutableLiveData<>();
    private final MutableLiveData<String> elapsedTime = new MutableLiveData<>();
    private final MutableLiveData<String> msPace = new MutableLiveData<>();
    private final MutableLiveData<Double> msSpeed = new MutableLiveData<>();
    private final MutableLiveData<Double> distance = new MutableLiveData<>();
    private final MutableLiveData<Double> StepCount = new MutableLiveData<>();
    private final MutableLiveData<Double> latitude = new MutableLiveData<>();
    private final MutableLiveData<Double> longitude = new MutableLiveData<>();
    private final MutableLiveData<Double> msPaceToSecond = new MutableLiveData<>();
    // 미터값
    private final MutableLiveData<Double> oriDistance = new MutableLiveData<>();
    private final MutableLiveData<Double> totalHeartRate = new MutableLiveData<>();
    private final MutableLiveData<Integer> heartCountTime = new MutableLiveData<>();
    private MutableLiveData<RunningData> runningData = new MutableLiveData<>();
    private final MutableLiveData<List<RunDetail>> runDetailList = new MutableLiveData<>();
    private final MutableLiveData<Long> totalTime = new MutableLiveData<>();
    private final MutableLiveData<Integer> speedCountTime = new MutableLiveData<>();
    private final MutableLiveData<Double> totalSpeed = new MutableLiveData<>();
    private final MutableLiveData<Double> initLatitude = new MutableLiveData<>();
    private final MutableLiveData<Double> initLongitude = new MutableLiveData<>();
    private final MutableLiveData<Double> distanceDifference = new MutableLiveData<>();
    private final MutableLiveData<Boolean> pairCheck = new MutableLiveData<>();

    public RunningViewModel() {
        distanceDifference.setValue(0.0);
        heartRate.setValue(0.0);
        msSpeed.setValue(0.0);
        distance.setValue(0.00);
        msPaceToSecond.setValue(0.0);
        oriDistance.setValue(0.0);
        totalHeartRate.setValue(0.0);
        totalTime.setValue(0L);
        totalSpeed.setValue(0.0);
        msPace.setValue("0’00”");
        heartCountTime.setValue(0);
        StepCount.setValue(0.0);
    }

    public void clearData(){
        distanceDifference.setValue(0.0);
        heartRate.setValue(0.0);
        msSpeed.setValue(0.0);
        distance.setValue(0.00);
        msPaceToSecond.setValue(0.0);
        oriDistance.setValue(0.0);
        totalHeartRate.setValue(0.0);
        totalTime.setValue(0L);
        totalSpeed.setValue(0.0);
        msPace.setValue("0’00”");
        heartCountTime.setValue(0);
        StepCount.setValue(0.0);
        elapsedTime.setValue("00:00");
        latitude.setValue(0.0);
        longitude.setValue(0.0);
        runningData.setValue(new RunningData());
        runDetailList.setValue(new ArrayList<>());
        initLatitude.setValue(0.0);
        initLongitude.setValue(0.0);
        pairCheck.setValue(false);
        speedCountTime.setValue(0);
    }

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

    public void setStepCount(double value) {
        this.StepCount.setValue(value);
    }

    public void setMsSpeed(double value) {
        this.msSpeed.setValue(value);
    }

    public LiveData<Double> getStepCount() {
        return StepCount;
    }

    public MutableLiveData<Double> getLatitude() {
        return latitude;
    }

    public MutableLiveData<Double> getLongitude() {
        return longitude;
    }

    public MutableLiveData<Double> getMsPaceToSecond() { return msPaceToSecond; }
    public void setMsPaceToSecond(double second){
        this.msPaceToSecond.setValue(second);
    }
    public void setLatitude(double latitude){
        this.latitude.setValue(latitude);
    }
    public void setLongitude(double longitude){
        this.longitude.setValue(longitude);
    }
    public void setOriDistance(double oriDistance){
        this.oriDistance.setValue(oriDistance);
    }

    public MutableLiveData<Double> getOriDistance() {
        return oriDistance;
    }

    public MutableLiveData<Double> getTotalHeartRate() {
        return totalHeartRate;
    }
    public void setTotalHeartRate(double totalHeartRate){
        this.totalHeartRate.setValue(totalHeartRate);
    }
    public void setHeartCountTime(int heartCountTime){
        this.heartCountTime.setValue(heartCountTime);
    }
    public MutableLiveData<Integer> getHeartCountTime() {
        return heartCountTime;
    }
    public LiveData<List<RunDetail>> getRunDetailList() {
        if (runDetailList.getValue() == null) {
            runDetailList.setValue(new ArrayList<>());
        }
        return runDetailList;
    }
    public void setRunDetailList(List<RunDetail> dataList) {
        runDetailList.setValue(dataList);
    }

    public LiveData<Long> getTotalTime() {
        return totalTime;
    }

    public MutableLiveData<Integer> getSpeedCountTime() {
        return speedCountTime;
    }

    public MutableLiveData<Double> getTotalSpeed() {
        return totalSpeed;
    }
    public void setTotalTime(Long value) {
        totalTime.setValue(value);
    }
    public void setTotalSpeed(Double value) {
        totalSpeed.setValue(value);
    }
    public void setSpeedCountTime(Integer value) {
        speedCountTime.setValue(value);
    }

    public MutableLiveData<Double> getInitLatitude() {
        return initLatitude;
    }

    public MutableLiveData<Double> getInitLongitude() {
        return initLongitude;
    }
    public void setInitLongitude(Double value) {
        initLongitude.setValue(value);
    }
    public void setInitLatitude(Double value) {
        initLatitude.setValue(value);
    }

    public LiveData<Double> getDistanceDifference() {
        return distanceDifference;
    }
    public void setDistanceDifference(Double value) {
        distanceDifference.setValue(value);
    }

    public MutableLiveData<Boolean> getPairCheck() {
        return pairCheck;
    }
    public void setPairCheck(boolean value) {
        pairCheck.setValue(value);
    }
}
