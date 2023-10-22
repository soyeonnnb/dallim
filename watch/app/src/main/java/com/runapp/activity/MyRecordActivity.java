package com.runapp.activity;

import android.os.Bundle;

import androidx.activity.ComponentActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.runapp.R;
import com.runapp.adapter.RunningDataAdapter;
import com.runapp.database.AppDatabase;
import com.runapp.model.RunningData;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class MyRecordActivity extends ComponentActivity {

    private AppDatabase db;
    private Executor executor = Executors.newSingleThreadExecutor();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_record);

        db = AppDatabase.getDatabase(this);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        RunningDataAdapter adapter = new RunningDataAdapter(new ArrayList<>());
        recyclerView.setAdapter(adapter);

        executor.execute(new Runnable() {
            @Override
            public void run() {
                List<RunningData> runningDataList = db.runningDataDAO().getAll();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        adapter.setData(runningDataList); // 어댑터에 데이터 설정
                        adapter.notifyDataSetChanged();
                    }
                });
            }
        });
    }


}