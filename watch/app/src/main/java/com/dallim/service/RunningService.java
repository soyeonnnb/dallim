package com.dallim.service;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.lifecycle.ViewModelProvider;

import com.dallim.activity.RunningMateActivity;
import com.dallim.database.AppDatabase;
import com.dallim.dto.response.ApiResponseDTO;
import com.dallim.dto.response.ApiResponseListDTO;
import com.dallim.dto.response.RunningMateResponseDTO;
import com.dallim.dto.response.RunningMateRunningRecordDTO;
import com.dallim.model.RunningData;
import com.dallim.model.RunningMate;
import com.dallim.model.RunningMateRecord;
import com.dallim.util.AccessToken;
import com.dallim.util.ApiUtil;
import com.dallim.util.MyApplication;
import com.dallim.view.RunningMateRecordViewModel;

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
    RunningMateRecordViewModel runningMateRecordViewModel;
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
                Log.d("sqlite 러닝메이트 기록 저장", "성공");
            }
        });
    }

    // sqlite에서 러닝메이트 데이터 삭제
    public void deleteRunningMateData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateDAO().deleteAll();
                Log.d("sqlite 러닝메이트 기록 삭제", "성공");
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
                long start = System.currentTimeMillis();
                db.runningMateRecordDAO().insertRunningMateRunningRecord(runningMateRecord);
                long end = System.currentTimeMillis();
                Log.d("시간", String.valueOf(end - start));
                Log.d("sqlite에 러닝메이트 기록 추가", "성공");
            }
        });
    }

    // sqlite에서 러닝메이트 러닝 데이터 삭제
    public void deleteRunningMateRunningData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateRecordDAO().deleteRunningMateRunningRecord();
            }
        });
    }

    // sqlite에서 러닝메이트 러닝 기록 가져오기
    public void getRunningMateRunningData(DataCallback callback) {
        long startTime = System.currentTimeMillis();
        executor.execute(new Runnable() {
            @Override
            public void run() {
                RunningMateRecord records = db.runningMateRecordDAO().getRunningMateRunningRecord();
                long endTime = System.currentTimeMillis();
                System.out.println("데이터" + records);
                Log.d("시간", "걸린 시간" + (endTime - startTime));
                // 메인 스레드에서 콜백을 실행합니다.
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        callback.onDataLoaded(records);
                    }
                });
            }
        });
    }

    // 내 러닝메이트 리스트 가져오기
    public void getRunningMate(Activity currentActivity){
        // 기존 데이터 삭제
        deleteRunningMateData();

        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;
        Log.d("액세스", token);
        Call<ApiResponseListDTO<RunningMateResponseDTO>> call = ApiUtil.getApiService().getRunningMate(token);
        Log.d("응답", "들어옴");
        Log.d("call 로그", call.toString());
        call.enqueue(new Callback<ApiResponseListDTO<RunningMateResponseDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseListDTO<RunningMateResponseDTO>> call, Response<ApiResponseListDTO<RunningMateResponseDTO>> response) {
                List<RunningMate> runningMates = new ArrayList<>();
                Log.d("내 러닝메이트 리스트(성공)", response.body().getData().toString());
                if (response.isSuccessful() && response != null){
                    List<RunningMateResponseDTO> data = response.body().getData();
                    for(RunningMateResponseDTO dto : data){
                        RunningMate runningMate = new RunningMate();
                        runningMate.setUserId(dto.getUserId());
                        runningMate.setRunningRecordId(dto.getRunningRecordId());
                        runningMate.setRunningMateId(dto.getRunningMateId());
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
                    // 러닝메이트 저장
                    addRunningMateDataList(runningMates);
                    // 데이터 저장 후 RunningMateActivity 시작
                    Intent intent = new Intent(currentActivity, RunningMateActivity.class);
                    currentActivity.startActivity(intent);
                }else{
                    Log.e("내 러닝메이트 리스트(실패) ", response.errorBody().toString());
                    // 이후 에러처리 해야함.
                }
            }
            @Override
            public void onFailure(Call<ApiResponseListDTO<RunningMateResponseDTO>> call, Throwable t) {
                Log.e("내 러닝메이트 리스트(응답실패)", t.getMessage());

                t.printStackTrace();
            }
        });
    }

    // 내 러닝메이트 달리기 기록 가져오기
    public void getRunningMateRunningRecord(Activity currentActivity, String objectId, DataCallback callback){
        // 기존에 있던 러닝메이트 달리기 기록 삭제
        deleteRunningMateRunningData();

        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;
        long start = System.currentTimeMillis();
        Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call = ApiUtil.getApiService().getRunningMateRecord(token, objectId);
        call.enqueue(new Callback<ApiResponseDTO<RunningMateRunningRecordDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call, Response<ApiResponseDTO<RunningMateRunningRecordDTO>> response) {
                if (response.isSuccessful() && response != null){
                    long end1 = System.currentTimeMillis();
                    Log.d("스프링api", String.valueOf(end1-start));
                    RunningMateRunningRecordDTO mateRunningData = response.body().getData();
                    RunningMateRecord runningMateRecord = new RunningMateRecord();
                    runningMateRecord.setDistance(mateRunningData.getDistance());
                    runningMateRecord.setAveragePace(mateRunningData.getAveragePace());
                    runningMateRecord.setTotalTime(mateRunningData.getTotalTime());
                    Log.d("러닝메이트 기록 가져오기(성공)", runningMateRecord.toString());

                    // 러닝메이트 기록 추가
                    addRunningMateRunningData(runningMateRecord);
                    long end2 = System.currentTimeMillis();
                    Log.d("sqlite", String.valueOf(end2-start));

                    runningMateRecordViewModel= new ViewModelProvider((MyApplication) context).get(RunningMateRecordViewModel .class);
                    callback.onDataLoaded(runningMateRecord);
                }else{
                    Log.e("러닝메이트 기록 가져오기(실패)", response.errorBody().toString());
                    // 에러처리
                }
            }
            @Override
            public void onFailure(Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call, Throwable t) {
                Log.e("러닝메이트 기록 가져오기(응답실패)", t.getMessage());
            }
        });
    }

    public interface CountResultListener {
        void onResult(int count);
    }
    public interface GetResultListener {
        void onResult(List<RunningData> runningDataList);
    }
    public interface DataCallback {
        void onDataLoaded(RunningMateRecord records);
    }
}
