package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.res.ResourcesCompat;

import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;

import com.dallim.R;
import com.dallim.databinding.ActivitySleepStateBinding;

public class SleepStateActivity extends AppCompatActivity {

    private ActivitySleepStateBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySleepStateBinding.inflate(getLayoutInflater());
        ScrollView view = binding.getRoot();
        setContentView(view);

        binding.closeBtn.setOnClickListener(v -> {
            LayoutInflater inflater = getLayoutInflater();
            View dialogView = inflater.inflate(R.layout.modal, null);

            TextView text = dialogView.findViewById(R.id.text_view);
            Typeface typeface = ResourcesCompat.getFont(getApplicationContext(), R.font.oagothic_medium);
            text.setTypeface(typeface);
            text.setText("설정을 완료하지 않으면\n기록 수집에 문제가 발생합니다.\n\n설정을 완료하셨습니까?");

            Button cancel = dialogView.findViewById(R.id.cancel);
            Button finish = dialogView.findViewById(R.id.finish);
            finish.setText("확인");

            AlertDialog.Builder builder = new AlertDialog.Builder(SleepStateActivity.this);
            builder.setView(dialogView);

            AlertDialog dialog = builder.create();
            if (dialog.getWindow() != null) {
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
            }
            dialog.show();

            cancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            finish.setOnClickListener(b ->{
                Intent intent = new Intent(SleepStateActivity.this, MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
                dialog.dismiss();
                finish();
            });
        });
    }
}