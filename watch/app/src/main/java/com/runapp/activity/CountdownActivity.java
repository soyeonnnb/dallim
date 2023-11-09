package com.runapp.activity;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.TypedValue;
import android.view.View;
import android.widget.TextView;

import androidx.activity.ComponentActivity;
import androidx.annotation.Nullable;

import com.runapp.R;
import com.runapp.databinding.ActivityCountdownBinding;
import com.runapp.view.CountdownTimerView;

public class CountdownActivity extends ComponentActivity {
    private ActivityCountdownBinding binding;
    private TextView countdownText;
    private final int countdownTime = 3;
    private Handler countdownHandler;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCountdownBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        countdownText = binding.countdownText;
        countdownHandler = new Handler(Looper.getMainLooper());

        startSmoothCountdown();
    }

    private void startCountdown(){
        new Thread(() ->{
            int time = countdownTime;
            while (time >= 0){
                int finalTime = time;
                countdownHandler.post(() -> {
                    if (finalTime == 0){
                        countdownText.setText("시작");
                        countdownText.setTextSize(TypedValue.COMPLEX_UNIT_SP,60);
                    }else{
                        countdownText.setText(String.valueOf(finalTime));
                    }

                    // 여기서 애니메이션 업데이트
                    float angle = (float) finalTime / countdownTime * 360;
                    binding.countdownTimerView.setAngle(angle);
                    binding.countdownTimerView.invalidate(); // 뷰 갱신
                });
                try{
                    Thread.sleep(1000);
                } catch (InterruptedException e){
                    e.printStackTrace();
                }
                time--;
            }
            finish();
        }).start();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        countdownHandler.removeCallbacksAndMessages(null);
    }

    private void startSmoothCountdown() {
        CountdownTimerView countdownTimerView = binding.countdownTimerView;
        final int animationDuration = countdownTime * 1000; // 3 seconds

        ValueAnimator animator = ValueAnimator.ofFloat(360, 0);
        animator.setDuration(animationDuration);
        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            long startTime = -1; // 애니메이션 시작 시간을 추적하기 위한 변수

            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                if (startTime < 0) {
                    startTime = System.currentTimeMillis(); // 최초 업데이트에서 현재 시간을 기록합니다.
                }

                // 실제 경과 시간을 계산합니다.
                long currentTime = System.currentTimeMillis();
                long elapsedTime = currentTime - startTime;

                // 경과 시간에 기초하여 예상 완료 비율을 계산합니다.
                float fraction = (float) elapsedTime / animationDuration;
                fraction = Math.min(fraction, 1f); // 최대 1로 제한합니다.

                float currentAngle = 360 - (360 * fraction);

                // 시간을 계산하여 텍스트 뷰 업데이트
                int secondsRemaining = countdownTime - (int)(fraction * countdownTime);
                if (secondsRemaining == 0) {
                    countdownText.setText("START");
                    countdownText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 60);
                    countdownTimerView.setAngle(360);
                    countdownTimerView.setColor(getResources().getColor(R.color.red));
                    countdownTimerView.invalidate();

                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        System.out.println("여긴 들어왔나");
                        String type = getIntent().getStringExtra("run_type");
                        Intent returnIntent = new Intent();
                        returnIntent.putExtra("run_type", type);
                        setResult(Activity.RESULT_OK, returnIntent);
                        finish();
                    }, 1000);

                    animation.cancel();
                } else {
                    countdownText.setText(String.valueOf(secondsRemaining));
                    countdownTimerView.setAngle(currentAngle);
                    countdownTimerView.invalidate();
                }
            }
        });

        animator.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                super.onAnimationEnd(animation);
            }
        });
        animator.start();
    }
}
