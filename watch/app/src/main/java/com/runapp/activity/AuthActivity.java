package com.runapp.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.runapp.R;
import com.runapp.databinding.ActivityAuthBinding;
import com.runapp.databinding.ActivityMainBinding;
import com.runapp.service.ApiService;
import com.runapp.util.ApiUtil;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AuthActivity extends AppCompatActivity {
    private CountDownTimer timer;
    private ActivityAuthBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAuthBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);
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
        Call<String> call = ApiUtil.getApiService().verifyCode(String.valueOf(binding.codeTextView));
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                // 액세스 토큰 있다면
                if (response.isSuccessful() && response.body() != null){
                    SharedPreferences sharedPreferences = getSharedPreferences("dallim", MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("access_token", response.body());
                    editor.apply();
                } else {
                    Toast.makeText(AuthActivity.this, "인증이 완료되지 않았습니다.", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                Toast.makeText(AuthActivity.this, "통신 에러 발생", Toast.LENGTH_SHORT).show();
            }
        });
    }

    // 인증번호 생성 요청
    private void requestAuthenticationCode() {
        Call<String> call = ApiUtil.getApiService().generateCode();
        call.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                if (response.isSuccessful()) {
                    binding.codeTextView.setText(response.body());
                } else {
                    Log.d("error", "실패");
                }
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                Log.d("error", "실패");
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