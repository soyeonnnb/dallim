package com.runapp.service;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.runapp.database.AppDatabase;
import com.runapp.model.RunningMate;

import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class RunningService {
    private AppDatabase db;

    private SharedPreferences prefs;
    private Context context;
    private final Executor executor = Executors.newSingleThreadExecutor();

    public RunningService(Context context) {
        this.context = context;
        db = AppDatabase.getDatabase(context);
    }

    
    // 전송되지 않은 러닝데이터 개수 가져오기
    public void countNotTranslateRunningData(CountResultListener listener){
        executor.execute(new Runnable() {
            @Override
            public void run() {
                int count = db.runningDataDAO().countNotTranslated();
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        listener.onResult(count);
                    }
                });
            }
        });
    }


    // sqlite에 러닝메이트 데이터 추가
    public void addRunningMateDataList(List<RunningMate> runningMates) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateDAO().insertRunningMate(runningMates);
                Log.d("로그", "저장 성공");
            }
        });
    }

    // sqlite에서 러닝메이트 데이터 삭제
    public void deleteRunningMateDataList() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateDAO().deleteAll();
                Log.d("로그", "삭제 성공");
            }
        });
    }

    public interface CountResultListener {
        void onResult(int count);
    }
}
