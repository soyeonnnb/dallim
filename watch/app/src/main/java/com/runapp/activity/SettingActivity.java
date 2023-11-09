package com.runapp.activity;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.runapp.R;
import com.runapp.databinding.ActivitySettingBinding;
import com.runapp.dto.RunningDataDTO;
import com.runapp.model.RunningData;
import com.runapp.service.RunningService;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;
import com.runapp.util.NetworkUtil;
import com.runapp.util.PreferencesUtil;

import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SettingActivity extends AppCompatActivity {
    private ActivitySettingBinding binding;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private SharedPreferences prefs;
    private RunningService runningService;
    private int unlinkCount = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySettingBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);
        runningService = new RunningService(getApplicationContext());

        // 비연동 데이터 연동하기
        binding.btnLinkData.setOnClickListener(v ->{
            if (unlinkCount == 0){
                Toast.makeText(SettingActivity.this, "비연동 데이터가 없습니다.", Toast.LENGTH_SHORT).show();
            }else{
                AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

                LayoutInflater inflater = getLayoutInflater();
                // unlink_user.xml을 가져와서 객체로 생성
                View customView = inflater.inflate(R.layout.link_data, null);

                TextView linkDataTv = customView.findViewById(R.id.link_data_tv);
                String format = String.format("%d개의 데이터를" + "\n" + "연동하시겠습니까?", unlinkCount);
                linkDataTv.setText(format);

                builder.setView(customView);

                // builder 내용으로 AlertDialog 생성ㅇ
                AlertDialog dialog = builder.create();

                // AlertDialog 보이기
                dialog.show();

                Button unlinkCancel = customView.findViewById(R.id.unlink_cancel);
                Button unlinkStart = customView.findViewById(R.id.unlink_start);

                
                // 비연동 데이터 업데이트
                unlinkStart.setOnClickListener(b ->{
                    runningService.getNotTranslateRunningData(new RunningService.GetResultListener() {
                        @Override
                        public void onResult(List<RunningData> runningDataList) {
                            String accessToken = AccessToken.getInstance().getAccessToken();
                            String token = "Bearer " + accessToken;
                            for(RunningData r : runningDataList){
                                if(new NetworkUtil().isOnline(getApplicationContext())){
                                    RunningDataDTO runningDataDTO = r.toDTO();
                                    Log.d("보내는리스트", String.valueOf(runningDataDTO.toString()));
                                    ApiUtil.getApiService().postRunningData(token, runningDataDTO).enqueue(new Callback<Void>() {
                                        // api 호출이 완료되면 콜백 실행
                                        @Override
                                        public void onResponse(Call<Void> call, Response<Void> response) {
                                            if(response.isSuccessful()){
                                                Log.d("데이터 전송", "몽고디비로 데이터 전송 성공");
                                                Toast.makeText(SettingActivity.this, "기록 저장 성공", Toast.LENGTH_SHORT).show();
                                                runningService.updateRunningDataIsTranslate(r.getId(), true);
                                            }else{
                                                Log.d("데이터 전송", "몽고디비로 데이터 전송 실패");
                                                Toast.makeText(SettingActivity.this, "기록 저장 실패", Toast.LENGTH_SHORT).show();
                                            }
                                        }

                                        @Override
                                        public void onFailure(Call<Void> call, Throwable t) {
                                            Log.d("데이터 전송", t.toString());
                                        }
                                    });
                                }
                            }
                        }
                    });
                    dialog.dismiss();
                });

                unlinkCancel.setOnClickListener(b ->{
                    dialog.dismiss();
                });
            }
        });

        // 연동해제 버튼 누르면
        binding.btnUnlink.setOnClickListener(v ->{
            Intent intent = new Intent(SettingActivity.this, UnlinkActivity.class);
            startActivity(intent);

//            String email = prefs.getString("email", null);
//            String nickname = prefs.getString("nickname", null);
//            int level = prefs.getInt("level", 0);

//            // AlertDialog.Builder 인스턴스 생성
//            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);
//
//            LayoutInflater inflater = getLayoutInflater();
//            // unlink_user.xml을 가져와서 객체로 생성
//            View customView = inflater.inflate(R.layout.unlink_user, null);
//
//            TextView userEmail = customView.findViewById(R.id.user_email);
//            userEmail.setText("이메일:" + email);
//            TextView userNickname = customView.findViewById(R.id.nickname);
//            userNickname.setText("닉네임:" + nickname);
//            TextView userLevel = customView.findViewById(R.id.level);
//            userLevel.setText("레벨:" + String.valueOf(level) + " LV");
//
//            builder.setView(customView);
//
//            // builder 내용으로 AlertDialog 생성
//            AlertDialog dialog = builder.create();
//
//            // AlertDialog 보이기
//            dialog.show();
//
//            Button btnCancel = customView.findViewById(R.id.unlink_cancel);
//            Button btnStart = customView.findViewById(R.id.unlink_start);
//
//            // 취소 버튼에 대한 클릭 리스너
//            btnCancel.setOnClickListener(b ->{
//                dialog.dismiss();
//            });
//
//            // 확인 버튼에 대한 클릭 리스너
//            btnStart.setOnClickListener(b-> {
//                prefs.edit().clear().apply();
//                runningService.deleteRunningMateData();
//                runningService.deleteRunningData();
//                Toast.makeText(SettingActivity.this, "연동을 해제하였습니다.", Toast.LENGTH_SHORT).show();
//                dialog.dismiss();
//
//                // 모든 액티비티를 종료하고 메인 액티비티로 이동하는 인텐트 생성
//                Intent intent = new Intent(SettingActivity.this, MainActivity.class);
//                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
//                startActivity(intent);
//
//                // 현재 액티비티 종료
//                finish();
//            });
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        runningService.countNotTranslateRunningData(new RunningService.CountResultListener() {
            @Override
            public void onResult(int count) {
                // UI Thread에서 int 값 받아서 처리
                Log.d("로그", "전송되지 않은 데이터의 개수: " + count);
                ImageView dateView = findViewById(R.id.btn_link_data);
                unlinkCount = count;
                // 비연동 데이터가 있으면
                if (unlinkCount != 0){
                    dateView.setImageResource(R.drawable.unknown_nodata);
                }
                // 없으면
                else{
                    dateView.setImageResource(R.drawable.unknown_data);
                }
            }
        });

//        String email = prefs.getString("email", null);
//        TextView viewEmail = binding.email;
//        viewEmail.setText(email);
    }
}