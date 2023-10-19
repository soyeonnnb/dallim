package com.runapp.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import androidx.activity.ComponentActivity;
import com.runapp.databinding.ActivityMainBinding;

public class MainActivity extends ComponentActivity {

    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        // 레이아웃의 최상위 뷰를 가져옴
        View view = binding.getRoot();
        // 액티비티의 컨텐츠 뷰로 view를 설정. 여기서 화면에 뭐가 보일지 결정
        setContentView(view);

        binding.btnStart.setOnClickListener(v -> {
            // Start the RunningActivity when the button is clicked
            Intent intent = new Intent(MainActivity.this, SelectActivity.class);
            startActivity(intent);
        });
    }
}
