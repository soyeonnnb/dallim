package com.runapp.database;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.runapp.model.RunningData;
import com.runapp.model.RunningMate;

@TypeConverters({DateConverter.class, RunningDataConverters.class})
@Database(entities = {RunningData.class, RunningMate.class}, version = 25) // RunningDate를 db의 엔터티로 사용. 버전은 2
public abstract class AppDatabase extends RoomDatabase { // Room 라이브러리를 사용함
    public abstract RunningDataDAO runningDataDAO();
    public abstract RunningMateDAO runningMateDAO();

    private static AppDatabase INSTANCE; // 싱글톤으로 관리하기 위함.

    public static AppDatabase getDatabase(Context context) {
        if (INSTANCE == null) {
            synchronized (AppDatabase.class) { // 여러 스레드가 동시에 이 블록에 못들어가도록 잠금.(즉 다중 스레드 환경에서 안전하게 인스턴스를 생성)
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                                    AppDatabase.class, "dallim")
                            .fallbackToDestructiveMigration() // db 스키마가 변경되면 이전 데이터를 삭제하고 새 db를 생성시킴.
                            .build();
                }
            }
        }
        return INSTANCE;
    }
}

