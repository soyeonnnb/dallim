package com.runapp.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import androidx.activity.ComponentActivity;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;

import com.bumptech.glide.Glide;
import com.runapp.R;
import com.runapp.databinding.ActivitySelectBinding;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
    ImageView imageViewOne;
    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySelectBinding.inflate(getLayoutInflater());

        View view = binding.getRoot();

        setContentView(view);

        context = SelectActivity.this;
        imageViewOne = binding.singleGif;

        Glide.with(context)
                        .load(R.drawable.run_character)
                                .into(imageViewOne);

        // 혼자 달리기 눌렀을 경우
        binding.btnSingle.setOnClickListener(v ->{
            // AlertDialog.Builder 인스턴스 생성
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            View customView = inflater.inflate(R.layout.single_popup, null);

            builder.setView(customView);

            // AlertDialog 생성
            AlertDialog dialog = builder.create();

            Button btnCancel = customView.findViewById(R.id.single_cancel);
            Button btnStart = customView.findViewById(R.id.single_start);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    dialog.dismiss();
                }
            });

            // 확인 버튼에 대한 클릭 리스너
            btnStart.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                    countdownActivityResultLauncher.launch(intent);
                    dialog.dismiss();
                }
            });


            // AlertDialog 보이기
            dialog.show();
        });

        // 함께 달리기 눌렀을 경우
        binding.btnMulti.setOnClickListener(v ->{
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            View customView = inflater.inflate(R.layout.multi_popup, null);

            builder.setView(customView);

            // AlertDialog 생성
            AlertDialog dialog = builder.create();

            Button btnCancel = customView.findViewById(R.id.multi_cancel);
            Button btnStart = customView.findViewById(R.id.multi_start);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    dialog.dismiss();
                }
            });

            // 확인 버튼에 대한 클릭 리스너
            btnStart.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                    countdownActivityResultLauncher.launch(intent);
                    dialog.dismiss();
                }
            });

            dialog.show();
        });

        // 나의 기록 보기
        binding.btnMyRecord.setOnClickListener(v ->{
            Intent intent = new Intent(this, MyRecordActivity.class);
            startActivity(intent);
        });
    }

    ActivityResultLauncher<Intent> countdownActivityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == Activity.RESULT_OK) {
                    // CountdownActivity가 성공적으로 끝났을 때의 작업을 수행합니다.
                    Intent nextActivityIntent = new Intent(SelectActivity.this, RunningActivity.class);
                    startActivity(nextActivityIntent);
                }
            });
}