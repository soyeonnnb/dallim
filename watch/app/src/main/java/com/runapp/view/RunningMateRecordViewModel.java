package com.runapp.view;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.runapp.model.RunningMateRecord;

import java.util.List;

public class RunningMateRecordViewModel extends ViewModel {
    private final MutableLiveData<RunningMateRecord> mateRecord = new MutableLiveData<>();


    public MutableLiveData<RunningMateRecord> getMateRecord() {
        return mateRecord;
    }

    public void setMateRecord(RunningMateRecord value) {
        mateRecord.setValue(value);
    }
}
