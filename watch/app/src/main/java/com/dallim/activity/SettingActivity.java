package com.dallim.activity;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.dallim.R;
import com.dallim.databinding.ActivitySettingBinding;
import com.dallim.dto.RunningDataDTO;
import com.dallim.model.RunningData;
import com.dallim.service.RunningService;
import com.dallim.util.AccessToken;
import com.dallim.util.ApiUtil;
import com.dallim.util.NetworkUtil;
import com.dallim.util.PreferencesUtil;

import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SettingActivity extends AppCompatActivity {
    private ActivitySettingBinding binding;
    private SharedPreferences prefs;
    private RunningService runningService;
    private int unlinkCount = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySettingBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        runningService = new RunningService(getApplicationContext());

        // 비연동 데이터 연동하기
        binding.btnLinkData.setOnClickListener(v ->{
            if (unlinkCount == 0){
                Toast.makeText(SettingActivity.this, "비연동 데이터가 없습니다.", Toast.LENGTH_SHORT).show();
            }else{
                LayoutInflater inflater = SettingActivity.this.getLayoutInflater();
                View dialogView = inflater.inflate(R.layout.unlink_data_modal, null);

                TextView textView = dialogView.findViewById(R.id.text_view);
                textView.setText("데이터를 동기화\n하시겠습니까?");

                TextView dataCountView = dialogView.findViewById(R.id.data_count);
                dataCountView.setText(String.valueOf(unlinkCount) + "개");

                Button unlinkCancel = dialogView.findViewById(R.id.cancel);
                Button unlinkStart = dialogView.findViewById(R.id.finish);
                unlinkStart.setText("연동");

                AlertDialog.Builder builder = new AlertDialog.Builder(SettingActivity.this);
                builder.setView(dialogView);

                AlertDialog dialog = builder.create();

                if (dialog.getWindow() != null) {
                    dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
                }
                dialog.show();

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

            String email = prefs.getString("email", null);
            String nickname = prefs.getString("nickname", null);
            String type = prefs.getString("type", null);

            LayoutInflater inflater = SettingActivity.this.getLayoutInflater();
            View dialogView = inflater.inflate(R.layout.unlink_modal, null);

            TextView text = dialogView.findViewById(R.id.text_view);
            Button cancel = dialogView.findViewById(R.id.cancel);
            Button unlinkBtn = dialogView.findViewById(R.id.finish);
            TextView nicknameTv = dialogView.findViewById(R.id.nickname);
            TextView emailTv = dialogView.findViewById(R.id.email);
            ImageView typeIv = dialogView.findViewById(R.id.social_type);

            nicknameTv.setText(nickname);
            text.setText("연동을 해제하시겠습니까?");
            emailTv.setText(email);
            if("kakao".equals(type)){
                typeIv.setImageResource(R.drawable.kakao);
            }else{
                typeIv.setImageResource(R.drawable.naver);
            }
            unlinkBtn.setText("해제");

            AlertDialog.Builder builder = new AlertDialog.Builder(SettingActivity.this);
            builder.setView(dialogView);

            AlertDialog dialog = builder.create();

            if (dialog.getWindow() != null) {
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
            }
            dialog.show();

            cancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            unlinkBtn.setOnClickListener(b ->{
                prefs.edit().clear().apply();
                runningService.deleteRunningMateData();
                runningService.deleteRunningData();
                Toast.makeText(SettingActivity.this, "연동을 해제하였습니다.", Toast.LENGTH_SHORT).show();
                dialog.dismiss();

                // 모든 액티비티를 종료하고 메인 액티비티로 이동하는 인텐트 생성
                Intent intent = new Intent(SettingActivity.this, MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);

                // 현재 액티비티 종료
                finish();
            });
        });

        binding.watchReset.setOnClickListener(v -> {
            LayoutInflater inflater = SettingActivity.this.getLayoutInflater();
            View dialogView = inflater.inflate(R.layout.modal, null);

            Button cancel = dialogView.findViewById(R.id.cancel);
            Button finish = dialogView.findViewById(R.id.finish);

            TextView text = dialogView.findViewById(R.id.text_view);
            text.setText("내 기록을\n초기화 하시겠습니까?\n(워치에 저장된\n내 기록만 초기화됩니다)");
            finish.setText("초기화");

            AlertDialog.Builder builder = new AlertDialog.Builder(SettingActivity.this);
            builder.setView(dialogView);

            AlertDialog dialog = builder.create();

            if (dialog.getWindow() != null) {
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xA0000000));
            }
            dialog.show();

            cancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            finish.setOnClickListener(b ->{
                // 내 러닝 데이터 전부 삭제(sqlite 데이터)
                runningService.deleteRunningData();
                dialog.dismiss();

                Toast.makeText(this, "기록이 초기화되었습니다.", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(SettingActivity.this, MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
                finish();
            });

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
                    dateView.setImageResource(R.drawable.unknown_data);
                }
                // 없으면
                else{
                    dateView.setImageResource(R.drawable.unknown_nodata);
                }
            }
        });
    }
}