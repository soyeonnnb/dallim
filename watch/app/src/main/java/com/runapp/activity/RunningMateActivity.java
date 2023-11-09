package com.runapp.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.runapp.R;
import com.runapp.adapter.RunningMateDataAdapter;
import com.runapp.database.AppDatabase;
import com.runapp.model.RunningMate;
import com.runapp.model.RunningMateRecord;
import com.runapp.service.RunningService;
import com.runapp.util.CenterZoomLayoutManager;
import com.runapp.util.PreferencesUtil;
import com.runapp.view.RunningMateRecordViewModel;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class RunningMateActivity extends AppCompatActivity {

    private AppDatabase db;
    private Executor executor = Executors.newSingleThreadExecutor();
    private SharedPreferences prefs;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        CenterZoomLayoutManager layoutManager = new CenterZoomLayoutManager(this);
        setContentView(R.layout.activity_running_mate);

        db = AppDatabase.getDatabase(this);

        RecyclerView recyclerView = findViewById(R.id.rv_running_mate);
        recyclerView.setLayoutManager(layoutManager);
        RunningMateDataAdapter adapter = new RunningMateDataAdapter(this, new ArrayList<>(), RunningMateActivity.this);
        recyclerView.setAdapter(adapter);

        TextView tvNoData = findViewById(R.id.tv_no_data);

        executor.execute(new Runnable() {
            @Override
            public void run() {
                List<RunningMate> runningMateList = db.runningMateDAO().getAll();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (runningMateList.size() != 0) {
                            adapter.setData(runningMateList);
                            adapter.notifyDataSetChanged();
                            tvNoData.setVisibility(View.GONE); // 데이터 있으면 메시지 숨김
                        } else {
                            tvNoData.setVisibility(View.VISIBLE); // 데이터 없으면 메시지 보여줌
                        }
                    }
                });

            }
        });

    }


    @Override
    protected void onResume() {
        super.onResume();
    }
}