package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.dallim.R;
import com.dallim.databinding.ActivitySettingBinding;
import com.dallim.databinding.ActivityUnlinkBinding;
import com.dallim.service.RunningService;
import com.dallim.util.PreferencesUtil;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class UnlinkActivity extends AppCompatActivity {

    private ActivityUnlinkBinding binding;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private SharedPreferences prefs;
    private RunningService runningService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        binding = ActivityUnlinkBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();

        String email = prefs.getString("email", null);
        String nickname = prefs.getString("nickname", null);
        int level = prefs.getInt("level", 0);

        TextView emailText = binding.emailText;
        emailText.setText(email);
        TextView lvText = binding.lvText;
        lvText.setText(String.valueOf(level));
        TextView nicknameText = binding.nicknameText;
        nicknameText.setText(nickname);

        setContentView(view);
        runningService = new RunningService(getApplicationContext());



        // 취소 누르면
        binding.unlinkCancel.setOnClickListener(b -> {
            finish();
        });

        // 해제 누르면
        binding.unlinkOk.setOnClickListener(b -> {
            prefs.edit().clear().apply();
            runningService.deleteRunningMateRunningData();
            runningService.deleteRunningData();
            Toast.makeText(UnlinkActivity.this, "연동을 해제하였습니다.", Toast.LENGTH_SHORT).show();

            Intent intent = new Intent(UnlinkActivity.this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);

            finish();
        });

    }
}