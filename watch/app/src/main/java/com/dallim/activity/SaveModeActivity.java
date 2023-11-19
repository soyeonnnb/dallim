package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;

import com.dallim.R;
import com.dallim.databinding.ActivityResultBinding;
import com.dallim.databinding.ActivitySaveModeBinding;

public class SaveModeActivity extends AppCompatActivity {

    private ActivitySaveModeBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySaveModeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.cancel.setOnClickListener(b -> {
            finish();
        });

        binding.finish.setOnClickListener(b -> {
            Intent intent;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
                intent = new Intent(Settings.ACTION_BATTERY_SAVER_SETTINGS);
            } else {
                // 이전 버전의 안드로이드에서는 절전 모드 설정을 직접 열 수 없으므로 일반 설정 화면으로 이동
                intent = new Intent(Settings.ACTION_SETTINGS);
            }
            startActivity(intent);
            finish();
        });
    }
}