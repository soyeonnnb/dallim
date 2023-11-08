package com.runapp.activity;

import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import com.runapp.R;
import com.runapp.database.RunningDataConverters;
import com.runapp.model.RunDetail;
import com.runapp.service.RunningService;
import com.runapp.util.PreferencesUtil;

import java.util.ArrayList;
import java.util.List;

public class LoadingActivity extends AppCompatActivity {

    private RunningService runningService;
    private SharedPreferences prefs;
    private Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        setContentView(R.layout.activity_loading);
        runningService = new RunningService(getApplicationContext());

        runningService.getRunningMateRunningData(new RunningService.DataCallback() {
            @Override
            public void onDataLoaded(List<String> records) {
                System.out.println(records);
                List<Double> value = new ArrayList<>();
                for (String json : records) {
                    List<RunDetail> runDetails = RunningDataConverters.toRunDetailList(json);
                    for(RunDetail r : runDetails){
                        double distance = r.getDistance();
                        value.add(distance);
                    }
                }
                System.out.println("성공");
                SharedPreferences.Editor edit = prefs.edit();
                System.out.println(value);
                String data = RunningDataConverters.doubleFromList(value);
                System.out.println(data);
                edit.putString("ex", data);
                edit.apply();
                intent = new Intent(LoadingActivity.this, CountdownActivity.class);
                intent.putExtra("running_mate_record", data);
            }
        });

        // 2초 후에 현재 액티비티를 종료합니다.
        new android.os.Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(intent);
                // 2초가 지난 후 실행할 코드
                finish(); // 액티비티 종료
            }
        }, 2000); // 2000 밀리초 후에 실행(2초)
    }

}