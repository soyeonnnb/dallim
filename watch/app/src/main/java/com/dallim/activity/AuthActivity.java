package com.dallim.activity;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.dallim.databinding.ActivityAuthBinding;
import com.dallim.dto.request.AccessTokenRequestDTO;
import com.dallim.dto.response.AccessTokenResponseDTO;
import com.dallim.dto.response.ApiResponseDTO;
import com.dallim.dto.response.AuthCodeResponseDTO;
import com.dallim.util.AccessToken;
import com.dallim.util.ApiUtil;
import com.dallim.util.PreferencesUtil;
import com.dallim.util.UserInfo;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthActivity extends AppCompatActivity {
    private CountDownTimer timer;
    private ActivityAuthBinding binding;
    private SharedPreferences pref;
    private UserInfo userInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAuthBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        pref = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        startTimer();

        // 인증번호 요청
        requestAuthenticationCode();

        // 인증번호 재발급 버튼 리스너
        binding.btnRegenerate.setOnClickListener(v -> {
            requestAuthenticationCode(); // 인증번호 다시 요청
            resetTimer(); // 타이머 재설정
        });

        binding.btnCancel.setOnClickListener(v -> {
            finish();
        });

        binding.btnVerify.setOnClickListener(v -> {
            verifyAuthenticationCode();
        });
    }

    // 인증번호 인증 여부 확인
    private void verifyAuthenticationCode(){
        AccessTokenRequestDTO requestDTO = new AccessTokenRequestDTO((String) binding.codeTextView.getText());
        System.out.println(requestDTO.getAuthCode());
        Call<ApiResponseDTO<AccessTokenResponseDTO>> call = ApiUtil.getApiService().verifyCode(requestDTO);
        call.enqueue(new Callback<ApiResponseDTO<AccessTokenResponseDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<AccessTokenResponseDTO>> call, Response<ApiResponseDTO<AccessTokenResponseDTO>> response) {
                // 액세스 토큰 있다면 암호화해서 저장
                System.out.println(response.body().getData());
                if (response.isSuccessful() && response.body().getData() != null){
                    SharedPreferences.Editor edit = pref.edit();
                    edit.putString("accessToken", response.body().getData().getAccessToken());
                    edit.apply();
                    AccessToken.getInstance().setAccessToken(response.body().getData().getAccessToken());
                    userInfo = new UserInfo();
                    userInfo.getUserInfo(getApplicationContext(), new UserInfo.UserInfoCallback() {
                        @Override
                        public void onSuccess() {
                            Toast.makeText(AuthActivity.this, "연동이 완료되었습니다.", Toast.LENGTH_SHORT).show();
                            setResult(Activity.RESULT_OK);
                            finish();
                        }
                        @Override
                        public void onError(String message) {
                            Toast.makeText(AuthActivity.this, message, Toast.LENGTH_SHORT).show();
                        }
                    });
                } else {
                    Toast.makeText(AuthActivity.this, "인증이 완료되지 않았습니다.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ApiResponseDTO<AccessTokenResponseDTO>> call, Throwable t) {
                Toast.makeText(AuthActivity.this, "통신 에러 발생", Toast.LENGTH_SHORT).show();
            }
        });
    }

    // 인증번호 생성 요청
    private void requestAuthenticationCode() {
        Call<ApiResponseDTO<AuthCodeResponseDTO>> call = ApiUtil.getApiService().generateCode();
        call.enqueue(new Callback<>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<AuthCodeResponseDTO>> call, Response<ApiResponseDTO<AuthCodeResponseDTO>> response) {
                if (response.isSuccessful()) {
                    Log.d("인증번호 생성 요청 성공", response.body().getData().getAuthCode().toString());
                    binding.codeTextView.setText(response.body().getData().getAuthCode());
                } else {
                    try {
                        String string = response.errorBody().string();
                        Log.e("인증번호 생성 요청 실패", response.errorBody().toString());
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
            }

            @Override
            public void onFailure(Call<ApiResponseDTO<AuthCodeResponseDTO>> call, Throwable t) {
                Log.e("인증번호 생성 요청 실패(서버)", t.getMessage().toString());
            }
        });
    }

    // 인증번호 타이머 시작
    private void startTimer() {
        if(timer != null) {
            timer.cancel();
        }

        timer = new CountDownTimer(180000, 1000) {
            public void onTick(long millisUntilFinished) {
                long minutes = (millisUntilFinished / 1000) / 60;
                long seconds = (millisUntilFinished / 1000) % 60;
                binding.timerTextView.setText(String.format("%02d:%02d", minutes, seconds));
            }

            public void onFinish() {
                binding.timerTextView.setText("00:00");
            }
        }.start();
    }

    // 인증번호 타이머 리셋
    private void resetTimer() {
        if(timer != null) {
            timer.cancel();
        }
        startTimer();
    }
}