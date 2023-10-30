package com.runapp.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import com.runapp.model.RunningData;

import java.util.List;

@Dao
public interface RunningDataDAO {
    @Insert
    void insert(RunningData runningData);

    @Query("SELECT * FROM runningdata")
    List<RunningData> getAll();

    @Query("DELETE FROM runningData")
    void deleteAll();
}