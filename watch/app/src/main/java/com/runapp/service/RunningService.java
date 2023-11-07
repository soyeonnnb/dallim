package com.runapp.service;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.runapp.activity.RunningMateActivity;
import com.runapp.database.AppDatabase;
import com.runapp.dto.response.ApiResponseListDTO;
import com.runapp.dto.response.RunningMateResponseDTO;
import com.runapp.model.RunningData;
import com.runapp.model.RunningMate;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RunningService {
    private AppDatabase db;

    private SharedPreferences prefs;
    private Context context;
    private final Executor executor = Executors.newSingleThreadExecutor();

    public RunningService(Context context) {
        this.context = context;
        db = AppDatabase.getDatabase(context);
    }

    
    // 비연동 러닝데이터 개수 가져오기
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

    // 비연동 러닝데이터 가져오기
    public void getNotTranslateRunningData(GetResultListener listener){
        executor.execute(new Runnable() {
            @Override
            public void run() {
                List<RunningData> notTranslation = db.runningDataDAO().getNotTranslation();
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        listener.onResult(notTranslation);
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
    public void deleteRunningMateData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateDAO().deleteAll();
                Log.d("로그", "삭제 성공");
            }
        });
    }

    public void updateRunningDataIsTranslate(Long id, boolean check){
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningDataDAO().updateTranslationStatus(id, check);
            }
        });
    }

    // sqlite에서 러닝 데이터 삭제
    public void deleteRunningData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningDataDAO().deleteAll();
            }
        });
    }

    // 내 러닝메이트 기록 가져오기
    public void getRunningMate(Activity currentActivity){
        deleteRunningMateData();
        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;
        Call<ApiResponseListDTO<RunningMateResponseDTO>> call = ApiUtil.getApiService().getRunningMate(token);
        call.enqueue(new Callback<ApiResponseListDTO<RunningMateResponseDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseListDTO<RunningMateResponseDTO>> call, Response<ApiResponseListDTO<RunningMateResponseDTO>> response) {
                List<RunningMate> runningMates = new ArrayList<>();
                System.out.println(response.body().getData());
                if (response.isSuccessful() && response != null){
                    List<RunningMateResponseDTO> dtoList = response.body().getData();
                    for(RunningMateResponseDTO dto : dtoList){
                        RunningMate runningMate = new RunningMate();
                        runningMate.setUserId(dto.getUserId());
                        runningMate.setAverageSpeed(dto.getAverageSpeed());
                        runningMate.setClear(dto.isClear());
                        runningMate.setTotalDistance(dto.getTotalDistance());
                        runningMate.setTotalTime(dto.getTotalTime());
                        runningMate.setCharacterIndex(dto.getCharacterIndex());
                        runningMate.setCreatedAt(dto.getCreatedAt());
                        runningMate.setLevel(dto.getLevel());
                        runningMate.setNickName(dto.getNickName());
                        runningMate.setPlanetIndex(dto.getPlanetIndex());
                        runningMates.add(runningMate);
                    }
                }else{
                    Log.d("실패", "실패1");
                }
                // 러닝메이트 저장
                addRunningMateDataList(runningMates);
                // 데이터 저장 후 RunningMateActivity 시작
                Intent intent = new Intent(currentActivity, RunningMateActivity.class);
                currentActivity.startActivity(intent);
            }

            @Override
            public void onFailure(Call<ApiResponseListDTO<RunningMateResponseDTO>> call, Throwable t) {

            }
        });
    }

    public interface CountResultListener {
        void onResult(int count);
    }
    public interface GetResultListener {
        void onResult(List<RunningData> runningDataList);
    }
}
