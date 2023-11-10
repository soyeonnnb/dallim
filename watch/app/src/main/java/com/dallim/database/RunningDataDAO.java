package com.dallim.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import com.dallim.model.RunningData;

import java.util.List;

@Dao
public interface RunningDataDAO {
    @Insert
    void insert(RunningData runningData);

    // 내 러닝데이터 최근 10개 가져오기
    @Query("SELECT * FROM runningdata ORDER BY date DESC LIMIT 10")
    List<RunningData> getLatestTenRunningData();

    @Query("DELETE FROM runningData")
    void deleteAll();

    // 전송되지 않은 데이터의 개수를 가져옴
    @Query("SELECT COUNT(*) FROM runningdata WHERE NOT is_translation")
    int countNotTranslated();

    // 전송되지 않은 데이터 가져옴
    @Query("SELECT * FROM runningdata WHERE NOT is_translation")
    List<RunningData> getNotTranslation();

    // 전송했으면 상태 업데이트
    @Query("UPDATE runningdata SET is_translation = :isTranslation WHERE id = :runningDataId")
    void updateTranslationStatus(long runningDataId, boolean isTranslation);

}