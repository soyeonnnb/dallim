package com.dallim;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 스플래시 스크린이 표시되는 동안 수행할 작업을 여기에 넣습니다.

        // 스플래시 스크린 후에 메인 액티비티를 시작합니다.
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish(); // 스플래시 액티비티를 종료합니다.
    }
}

