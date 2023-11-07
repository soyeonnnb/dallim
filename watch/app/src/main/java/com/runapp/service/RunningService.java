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
import com.runapp.dto.response.ApiResponseDTO;
import com.runapp.dto.response.ApiResponseListDTO;
import com.runapp.dto.response.RunningMateResponseDTO;
import com.runapp.dto.response.RunningMateRunningRecordDTO;
import com.runapp.model.RunningData;
import com.runapp.model.RunningMate;
import com.runapp.model.RunningMateRecord;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;

import java.sql.SQLOutput;
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

    // 비연동 데이터 상태 업데이트(전송 상태로 바꿈)
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

    // sqlite에 러닝메이트 데이터 추가
    public void addRunningMateRunningData(RunningMateRecord runningMateRecord) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateRecordDAO().insertRunningMateRunningRecord(runningMateRecord);
                Log.d("로그", "저장 성공");
            }
        });
    }

    // sqlite에서 러닝메이트 러닝 데이터 삭제
    public void deleteRunningMateRunningData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateRecordDAO().deleteAll();
            }
        });
    }

    // 내 러닝메이트 리스트 가져오기
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
                        runningMate.setObjectId(dto.getId());
                        runningMate.setAveragePace(dto.getAveragePace());
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

    // 내 러닝메이트 달리기 기록 가져오기
    public void getRunningMateRunningRecord(Activity currentActivity, String objectId){
        deleteRunningMateRunningData();
        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;
        System.out.println(objectId);
        Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call = ApiUtil.getApiService().getRunningMateRecord(token, "6547d077843b0e094bfe4c63");
        call.enqueue(new Callback<ApiResponseDTO<RunningMateRunningRecordDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call, Response<ApiResponseDTO<RunningMateRunningRecordDTO>> response) {
                if (response.isSuccessful() && response != null){
                    System.out.println(response.toString());
                    System.out.println(response.body().toString());
                    System.out.println(response.body().getData().toString());
                    Log.d("성공", "성공");
                }else{
                    Log.d("실패", "실패1");
                }
                // 러닝메이트 저장
//                RunningMateRecord ru = new RunningMateRecord();
//                addRunningMateRunningData(ru);
//                // 데이터 저장 후 RunningMateActivity 시작
//                Intent intent = new Intent(currentActivity, RunningMateActivity.class);
//                currentActivity.startActivity(intent);
            }
            @Override
            public void onFailure(Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call, Throwable t) {
                Log.e("에러", t.getMessage());
                Log.d("실패", "실패2");
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
