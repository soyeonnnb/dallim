package com.runapp.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.activity.ComponentActivity;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.runapp.R;
import com.runapp.adapter.RunningDataAdapter;
import com.runapp.database.AppDatabase;
import com.runapp.model.RunningData;
import com.runapp.util.CenterZoomLayoutManager;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class MyRecordActivity extends ComponentActivity {

    private AppDatabase db;
    private Executor executor = Executors.newSingleThreadExecutor();
    private ViewPager2 viewPager2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        CenterZoomLayoutManager layoutManager = new CenterZoomLayoutManager(this);
        setContentView(R.layout.activity_my_record);

        db = AppDatabase.getDatabase(this);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(layoutManager);
        RunningDataAdapter adapter = new RunningDataAdapter(new ArrayList<>());
        recyclerView.setAdapter(adapter);

        TextView tvNoData = findViewById(R.id.tv_no_data);

        executor.execute(new Runnable() {
            @Override
            public void run() {
                List<RunningData> runningDataList = db.runningDataDAO().getAll();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (runningDataList.size() != 0) {
                            adapter.setData(runningDataList);
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


}