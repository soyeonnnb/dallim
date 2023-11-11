package com.dallim.view;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.dallim.model.RunningMateRecord;

public class RunningMateRecordViewModel extends ViewModel {
    private final MutableLiveData<RunningMateRecord> mateRecord = new MutableLiveData<>();

    public void clearData(){
        mateRecord.setValue(new RunningMateRecord());
    }

    public MutableLiveData<RunningMateRecord> getMateRecord() {
        return mateRecord;
    }

    public void setMateRecord(RunningMateRecord value) {
        mateRecord.setValue(value);
    }
}
