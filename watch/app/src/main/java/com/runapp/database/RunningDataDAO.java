package com.runapp.database;

import androidx.room.Dao;
import androidx.room.Insert;

import com.runapp.model.RunningData;

@Dao
public interface RunningDataDAO {
    @Insert
    void insert(RunningData runningData);
}