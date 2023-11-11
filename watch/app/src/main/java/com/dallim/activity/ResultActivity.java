package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

import com.dallim.R;
import com.dallim.databinding.ActivityResultBinding;
import com.dallim.databinding.ActivityRunningBinding;
import com.dallim.dto.response.OneRunningDataResponseDTO;
import com.dallim.service.RunningService;
import com.dallim.util.Conversion;
import com.dallim.util.PreferencesUtil;

import java.util.Map;

public class ResultActivity extends AppCompatActivity {

    private SharedPreferences prefs;
    private ActivityResultBinding binding;
    private RunningService runningService;
    private Conversion conversion = new Conversion();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityResultBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        runningService = new RunningService(getApplicationContext());

        View view = binding.getRoot();

        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());

        runningService.getRecentRunningData(new RunningService.RecentRunningDataCallback() {
            @Override
            public void onRecentRunningDataLoaded(OneRunningDataResponseDTO recentRunningData) {
                String totalTime = conversion.secondsToTimeString(recentRunningData.getTotal_time());
                double totalDistance = conversion.mToKM(recentRunningData.getTotal_distance());
                Map<String, Integer> result = conversion.sToPace(recentRunningData.getAverage_pace());
                int minutes = result.get("minutes");
                int seconds = result.get("seconds");

                // UI 조작 코드를 메인 스레드에서 실행
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        binding.time.setText(totalTime);
                        binding.distance.setText(String.valueOf(totalDistance+"km"));
                        binding.speed.setText(String.valueOf(minutes + "’ " + seconds + "”"));
                        binding.heartRate.setText(String.valueOf(recentRunningData.getAverage_heart_rate()));
                    }
                });
            }
        });

        Button closeBtn = view.findViewById(R.id.close);



        closeBtn.setOnClickListener(b -> {
            Intent intent = new Intent(ResultActivity.this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}