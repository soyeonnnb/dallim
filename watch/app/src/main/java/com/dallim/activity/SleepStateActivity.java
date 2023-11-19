package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.res.ResourcesCompat;
import androidx.core.view.InputDeviceCompat;
import androidx.core.view.MotionEventCompat;
import androidx.core.view.ViewConfigurationCompat;

import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
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
        View view = binding.getRoot();
        setContentView(view);

        ScrollView scrollView = findViewById(R.id.sleep_id);
        scrollView.requestFocus();

        scrollView.setOnGenericMotionListener(new View.OnGenericMotionListener() {
            @Override
            public boolean onGenericMotion(View v, MotionEvent ev) {
                if (ev.getAction() == MotionEvent.ACTION_SCROLL &&
                        ev.isFromSource(InputDeviceCompat.SOURCE_ROTARY_ENCODER)) {

                    // 로터리 입력에 따라 스크롤 값을 계산
                    float delta = -ev.getAxisValue(MotionEventCompat.AXIS_SCROLL) *
                            ViewConfigurationCompat.getScaledVerticalScrollFactor(
                                    ViewConfiguration.get(v.getContext()), v.getContext());

                    // RecyclerView를 스크롤합니다.
                    scrollView.scrollBy(0, Math.round(delta));

                    return true;
                }
                return false;
            }
        });

        binding.closeBtn.setOnClickListener(v -> {
            LayoutInflater inflater = getLayoutInflater();
            ScrollView scrollView1 = (ScrollView) inflater.inflate(R.layout.modal, null);

            scrollView1.post(new Runnable() {
                @Override
                public void run() {
                    scrollView1.setOnGenericMotionListener((v1, event) -> false);
                    scrollView1.requestFocus();
                }
            });

            TextView text = scrollView1.findViewById(R.id.text_view);
            Typeface typeface = ResourcesCompat.getFont(getApplicationContext(), R.font.oagothic_medium);
            text.setTypeface(typeface);
            text.setText("설정을 완료하지 않으면\n기록 수집에 문제가 발생합니다.\n\n설정을 완료하셨습니까?");

            Button cancel = scrollView1.findViewById(R.id.cancel);
            Button finish = scrollView1.findViewById(R.id.finish);
            finish.setText("확인");

            AlertDialog.Builder builder = new AlertDialog.Builder(SleepStateActivity.this);
            builder.setView(scrollView1);

            AlertDialog dialog = showDialogWithRotaryInput(scrollView1, scrollView1);


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

    private void setupRotaryInputListener(ScrollView scrollView) {
        scrollView.setOnGenericMotionListener(new View.OnGenericMotionListener() {
            @Override
            public boolean onGenericMotion(View v, MotionEvent ev) {
                if (ev.getAction() == MotionEvent.ACTION_SCROLL &&
                        ev.isFromSource(InputDeviceCompat.SOURCE_ROTARY_ENCODER)) {
                    float delta = -ev.getAxisValue(MotionEventCompat.AXIS_SCROLL) *
                            ViewConfigurationCompat.getScaledVerticalScrollFactor(
                                    ViewConfiguration.get(v.getContext()), v.getContext());

                    int scrollAmount = Math.round(delta * 10); // 스크롤 양 조정
                    scrollView.scrollBy(0, scrollAmount);
                    return true;
                }
                return false;
            }
        });
    }

    private AlertDialog showDialogWithRotaryInput(View dialogView, ScrollView scrollView) {
        AlertDialog.Builder builder = new AlertDialog.Builder(SleepStateActivity.this);
        builder.setView(dialogView);

        AlertDialog dialog = builder.create();
        if (dialog.getWindow() != null) {
            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
        }

        dialog.show();

        setupRotaryInputListener(scrollView);
        scrollView.requestFocus();

        return dialog;
    }
}