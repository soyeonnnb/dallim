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

    // 전송되지 않은 데이터의 개수를 가져옴
    @Query("SELECT COUNT(*) FROM runningdata WHERE NOT is_translation")
    int countNotTranslated();

    // 전송되지 않은 데이터 전송하기
    @Query("SELECT * FROM runningdata WHERE NOT is_translation")
    List<RunningData> getNotTranslation();
}