package com.runapp.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.runapp.model.RunningMate;
import com.runapp.model.RunningMateRecord;

import java.util.List;

@Dao
public interface RunningMateRecordDAO {

    // 러닝메이트 엔티티에 리스트 삽입
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertRunningMateRunningRecord(RunningMateRecord runningMateRecord);

    // 모든 러닝메이트 기록 데이터 삭제
    @Query("DELETE FROM runningmaterecord")
    void deleteAll();
}
