package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

import com.dallim.R;
import com.dallim.databinding.ActivityResultBinding;
import com.dallim.databinding.ActivityRunningBinding;
import com.dallim.service.RunningService;
import com.dallim.util.PreferencesUtil;

public class ResultActivity extends AppCompatActivity {

    private SharedPreferences prefs;
    private ActivityResultBinding binding;
    private RunningService runningService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityResultBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        runningService = new RunningService(getApplicationContext());

        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());

        View view = binding.getRoot();

        Button closeBtn = view.findViewById(R.id.close);

        closeBtn.setOnClickListener(b -> {
            finish();
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}