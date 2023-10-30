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
import com.runapp.database.RiverDataDAO;
import com.runapp.databinding.ActivitySelectBinding;
import com.runapp.model.RiverData;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
    private RiverDataDAO riverDataDAO;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySelectBinding.inflate(getLayoutInflater());

        View view = binding.getRoot();

        setContentView(view);

        Context context = SelectActivity.this;
        ImageView imageViewOne = binding.singleGif;

        // 움짤 표시
        Glide.with(context)
                        .load(R.drawable.run_character)
                                .into(imageViewOne);

        // 혼자 달리기 눌렀을 경우
        binding.btnSingle.setOnClickListener(v ->{
            // AlertDialog.Builder 인스턴스 생성
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            // single_popup.xml을 가져와서 객체로 생성
            View customView = inflater.inflate(R.layout.single_popup, null);

            builder.setView(customView);

            // builder 내용으로 AlertDialog 생성
            AlertDialog dialog = builder.create();

            // AlertDialog 보이기
            dialog.show();

            Button btnCancel = customView.findViewById(R.id.single_cancel);
            Button btnStart = customView.findViewById(R.id.single_start);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            // 확인 버튼에 대한 클릭 리스너
            btnStart.setOnClickListener(b-> {
                // 확인 버튼을 누르면 카운트다운 액티비티로 넘어감.
                Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                // 다른 액티비티로 값을 넘길 때 쓴다. 키 밸류로 구분
                intent.putExtra("run_type", "ALONE");
                countdownActivityResultLauncher.launch(intent);
                dialog.dismiss();
            });
        });

        // 함께 달리기 눌렀을 경우
        binding.btnMulti.setOnClickListener(v ->{
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            View customView = inflater.inflate(R.layout.multi_popup, null);

            RiverData riverData = riverDataDAO.getOneData();

//            if(riverData != null){
//                TextView distanceView = findViewById(R.id.distance);
//                TextView timeView = findViewById(R.id.tv_time);
//                TextView distanceView = findViewById(R.id.distance);
//            }

            builder.setView(customView);

            // AlertDialog 생성
            AlertDialog dialog = builder.create();

            dialog.show();

            Button btnCancel = customView.findViewById(R.id.multi_cancel);
            Button btnStart = customView.findViewById(R.id.multi_start);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            // 확인 버튼에 대한 클릭 리스너
            btnStart.setOnClickListener(b-> {
                // 확인 버튼을 누르면 카운트다운 액티비티로 넘어감.
                Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                intent.putExtra("run_type", "PAIR"); // 인자로 넘겨줌
                countdownActivityResultLauncher.launch(intent);
                dialog.dismiss();
            });
        });

        // 나의 기록 보기
        binding.btnMyRecord.setOnClickListener(v ->{
            Intent intent = new Intent(this, MyRecordActivity.class);
            startActivity(intent);
        });
    }

    // 카운트다운이 끝났을 때 콜백 메서드
    ActivityResultLauncher<Intent> countdownActivityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == Activity.RESULT_OK) {
                    String runType = result.getData().getStringExtra("run_type");
                    // 카운트다운 액티비티가 끝나면 셀렉트 액티비티에서 러닝 액티비티로 바뀜.
                    Intent nextActivityIntent = new Intent(SelectActivity.this, RunningActivity.class);
                    nextActivityIntent.putExtra("run_type", runType);
                    startActivity(nextActivityIntent);
                }
            });
}