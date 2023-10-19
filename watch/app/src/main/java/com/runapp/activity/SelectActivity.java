package com.runapp.activity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;

import androidx.activity.ComponentActivity;

import com.runapp.R;
import com.runapp.databinding.ActivitySelectBinding;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySelectBinding.inflate(getLayoutInflater());

        View view = binding.getRoot();

        setContentView(view);

        binding.btnSingle.setOnClickListener(v ->{
            // AlertDialog.Builder 인스턴스 생성
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            View customView = inflater.inflate(R.layout.single_popup, null);

            builder.setView(customView);

            // AlertDialog 생성
            AlertDialog dialog = builder.create();

            Button btnCancel = customView.findViewById(R.id.single_cancel);
            Button btnConfirm = customView.findViewById(R.id.single_confirm);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // 대화상자 닫기
                    dialog.dismiss();
                }
            });

            // 확인 버튼에 대한 클릭 리스너
            btnConfirm.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // "확인" 버튼 클릭 시 수행할 작업
                    // 필요에 따라 대화상자 닫기
                    dialog.dismiss();
                }
            });


            // AlertDialog 보이기
            dialog.show();
        });
    }
}