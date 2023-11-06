package com.runapp.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import androidx.activity.ComponentActivity;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import com.bumptech.glide.Glide;
import com.runapp.R;
import com.runapp.database.AppDatabase;
import com.runapp.databinding.ActivitySelectBinding;
import com.runapp.dto.response.ApiResponseListDTO;
import com.runapp.dto.response.RunningMateResponseDTO;
import com.runapp.model.RunningMate;
import com.runapp.service.RunningService;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private AppDatabase db;
    private RunningService runningService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        runningService = new RunningService(getApplicationContext());

        binding = ActivitySelectBinding.inflate(getLayoutInflater());

        View view = binding.getRoot();

        setContentView(view);

        db = AppDatabase.getDatabase(getApplicationContext());
        Context context = SelectActivity.this;
        ImageView imageViewOne = binding.singleGif;

        // 움짤 표시
        Glide.with(context)
                        .load(R.drawable.run_character)
                                .into(imageViewOne);

        // 혼자 달리기 눌렀을 경우
        binding.btnSingle.setOnClickListener(v ->{
            // AlertDialog.Builder 인스턴스 생성
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            // single_popup.xml을 가져와서 객체로 생성
            View customView = inflater.inflate(R.layout.single_popup, null);

            builder.setView(customView);

            // builder 내용으로 AlertDialog 생성
            AlertDialog dialog = builder.create();

            // AlertDialog 보이기
            dialog.show();

            Button btnCancel = customView.findViewById(R.id.single_cancel);
            Button btnStart = customView.findViewById(R.id.single_start);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            // 확인 버튼에 대한 클릭 리스너
            btnStart.setOnClickListener(b-> {
                // 확인 버튼을 누르면 카운트다운 액티비티로 넘어감.
                Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                // 다른 액티비티로 값을 넘길 때 쓴다. 키 밸류로 구분
                intent.putExtra("run_type", "ALONE");
                countdownActivityResultLauncher.launch(intent);
                dialog.dismiss();
            });
        });

        // 함께 달리기 눌렀을 경우
        binding.btnMulti.setOnClickListener(v ->{
            getRunningMate();
        });

        // 나의 기록 보기
        binding.btnMyRecord.setOnClickListener(v ->{
            Intent intent = new Intent(this, MyRecordActivity.class);
            startActivity(intent);
        });

        // 설정버튼
        binding.btnSetting.setOnClickListener(v ->{
            Intent intent = new Intent(this, SettingActivity.class);
            startActivity(intent);
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
//        runningService.countNotTranslateRunningData(new RunningService.CountResultListener() {
//            @Override
//            public void onResult(int count) {
//                // UI Thread에서 int 값 받아서 처리
//                Log.d("로그", "전송되지 않은 데이터의 개수: " + count);
//                TextView dateView = findViewById(R.id.no_connect_data);
//                dateView.setText(String.valueOf(count) + "개");
//            }
//        });
    }

    // 카운트다운이 끝났을 때 콜백 메서드
    ActivityResultLauncher<Intent> countdownActivityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == Activity.RESULT_OK) {
                    String runType = result.getData().getStringExtra("run_type");
                    // 카운트다운 액티비티가 끝나면 셀렉트 액티비티에서 러닝 액티비티로 바뀜.
                    Intent nextActivityIntent = new Intent(SelectActivity.this, RunningActivity.class);
                    nextActivityIntent.putExtra("run_type", runType);
                    startActivity(nextActivityIntent);
                }
            });

    private void getRunningMate(){
        runningService.deleteRunningMateDataList();
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
                runningService.addRunningMateDataList(runningMates);
                // 데이터 저장 후 RunningMateActivity 시작
                Intent intent = new Intent(SelectActivity.this, RunningMateActivity.class);
                startActivity(intent);
            }

            @Override
            public void onFailure(Call<ApiResponseListDTO<RunningMateResponseDTO>> call, Throwable t) {

            }
        });
    }




}