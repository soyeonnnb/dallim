package com.dallim.service;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.dallim.activity.ResultActivity;
import com.dallim.database.AppDatabase;
import com.dallim.dto.response.ApiResponseDTO;
import com.dallim.dto.response.ApiResponseListDTO;
import com.dallim.dto.response.OneRunningDataResponseDTO;
import com.dallim.dto.response.RunningMateResponseDTO;
import com.dallim.dto.response.RunningMateRunningRecordDTO;
import com.dallim.model.RunningData;
import com.dallim.model.RunningMate;
import com.dallim.model.RunningMateRecord;
import com.dallim.util.AccessToken;
import com.dallim.util.Retrofit;
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

    // 러닝 데이터 추가(메인 스레드에서 분리하기 위해서)
    public void addRunningData(RunningData runningData) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningDataDAO().insert(runningData);

                // 러닝 데이터가 추가된 후에 결과 액티비티를 호출
                Intent intent = new Intent(context, ResultActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
            }
        });
    }

    // sqlite에서 가장 최근 내기록 가져오기
    public void getRecentRunningData(RecentRunningDataCallback callback) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                // 최근 내 기록을 데이터베이스에서 가져오는 로직을 구현하고, 가져온 데이터를 callback으로 전달
                OneRunningDataResponseDTO latestOneRunningData = db.runningDataDAO().getLatestOneRunningData();

                // callback을 통해 가져온 데이터를 전달
                callback.onRecentRunningDataLoaded(latestOneRunningData);
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
    public void getRunningMateRunningData(RunningMateDataRecordCallback callback) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    RunningMateRecord records = db.runningMateRecordDAO().getRunningMateRunningRecord();
                    // 메인 스레드에서 콜백을 실행합니다.
                    new Handler(Looper.getMainLooper()).post(new Runnable() {
                        @Override
                        public void run() {
                            if (records != null){
                                callback.onDataLoaded(records);
                            } else {
                                callback.onError("인터넷 연결을 확인해주세요");
                            }
                        }
                    });
                }catch (Exception e){
                    callback.onError("인터넷 연결을 확인해주세요");
                }
            }
        });
    }

    // 내 러닝메이트 리스트 가져오기
    public void getRunningMate(Activity currentActivity, RunningMateListCallback callback){
        // 기존 데이터 삭제
        deleteRunningMateData();

        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;
        Call<ApiResponseListDTO<RunningMateResponseDTO>> call = Retrofit.getApiService().getRunningMate(token);
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
                        runningMate.setEvolutionStage(dto.getEvolutionStage());
                        runningMates.add(runningMate);
                    }
                    // 러닝메이트 저장
                    addRunningMateDataList(runningMates);
                    callback.onSuccess();
                }else{
                    Log.e("내 러닝메이트 리스트(실패) ", response.errorBody().toString());
                    callback.onError("인터넷 연결을 확인해주세요");
                }
            }
            @Override
            public void onFailure(Call<ApiResponseListDTO<RunningMateResponseDTO>> call, Throwable t) {
                Log.e("내 러닝메이트 리스트(응답실패)", t.getMessage());
                callback.onError("인터넷 연결을 확인해주세요");
            }
        });
    }

    // 내 러닝메이트 달리기 기록 가져오기
    public void getRunningMateRunningRecord(Activity currentActivity, String objectId, RunningMateDataRecordCallback callback){
        // 기존에 있던 러닝메이트 달리기 기록 삭제
        deleteRunningMateRunningData();

        String accessToken = AccessToken.getInstance().getAccessToken();
        String token = "Bearer " + accessToken;
        Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call = Retrofit.getApiService().getRunningMateRecord(token, objectId);
        call.enqueue(new Callback<ApiResponseDTO<RunningMateRunningRecordDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call, Response<ApiResponseDTO<RunningMateRunningRecordDTO>> response) {
                if (response.isSuccessful() && response != null){
                    long end1 = System.currentTimeMillis();
                    RunningMateRunningRecordDTO mateRunningData = response.body().getData();
                    RunningMateRecord runningMateRecord = new RunningMateRecord();
                    runningMateRecord.setDistance(mateRunningData.getDistance());
                    runningMateRecord.setAveragePace(mateRunningData.getAveragePace());
                    runningMateRecord.setTotalTime(mateRunningData.getTotalTime());
                    Log.d("러닝메이트 기록 가져오기(성공)", runningMateRecord.toString());

                    // 러닝메이트 기록 추가
                    addRunningMateRunningData(runningMateRecord);
//                    runningMateRecordViewModel= new ViewModelProvider((MyApplication) context).get(RunningMateRecordViewModel .class);

                    callback.onDataLoaded(runningMateRecord);
                }else{
                    Log.e("러닝메이트 기록 가져오기(실패)", response.errorBody().toString());
                    callback.onError("인터넷 연결을 확인해주세요");
                }
            }
            @Override
            public void onFailure(Call<ApiResponseDTO<RunningMateRunningRecordDTO>> call, Throwable t) {
                Log.e("러닝메이트 기록 가져오기(응답실패)", t.getMessage());
                callback.onError("인터넷 연결을 확인해주세요");
            }
        });
    }

    // 비연동 데이터 개수 리스너
    public interface CountResultListener {
        void onResult(int count);
    }

    public interface GetResultListener {
        void onResult(List<RunningData> runningDataList);
    }

    // 러닝메이트 달리기 기록 가져오기
    public interface RunningMateDataRecordCallback  {
        void onDataLoaded(RunningMateRecord records);
        void onError(String message);
    }

    // 내 최근 러닝데이터 기록 가져오기
    public interface RecentRunningDataCallback {
        void onRecentRunningDataLoaded(OneRunningDataResponseDTO recentRunningData);
    }

    // 러닝메이트 리스트 가져오기 콜백
    public interface RunningMateListCallback {
        void onSuccess();
        void onError(String message);
    }

    //
}
