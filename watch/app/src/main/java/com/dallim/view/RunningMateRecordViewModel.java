package com.dallim.view;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.dallim.model.RunningMateRecord;

public class RunningMateRecordViewModel extends ViewModel {
    private final MutableLiveData<RunningMateRecord> mateRecord = new MutableLiveData<>();
    private final MutableLiveData<Boolean> giveUp = new MutableLiveData<>();
    private final MutableLiveData<Boolean> timeOver = new MutableLiveData<>();

    public void clearData(){
        mateRecord.setValue(new RunningMateRecord());
    }

    public MutableLiveData<RunningMateRecord> getMateRecord() {
        return mateRecord;
    }

    public MutableLiveData<Boolean> getTimeOver() {
        return timeOver;
    }

    public MutableLiveData<Boolean> getGiveUp() {
        return giveUp;
    }

    public void setMateRecord(RunningMateRecord value) {
        mateRecord.setValue(value);
    }
    public void setGiveUp(boolean value) {
        giveUp.setValue(value);
    }
    public void setTimeOver(boolean value) {
        timeOver.setValue(value);
    }
}
