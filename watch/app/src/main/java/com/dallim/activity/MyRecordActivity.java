package com.dallim.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.activity.ComponentActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.dallim.R;
import com.dallim.adapter.MyRunningDataAdapter;
import com.dallim.database.AppDatabase;
import com.dallim.model.RunningData;
import com.dallim.util.CenterZoomLayoutManager;

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
        CenterZoomLayoutManager layoutManager = new CenterZoomLayoutManager(this);
        setContentView(R.layout.activity_my_record);

        db = AppDatabase.getDatabase(this);

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(layoutManager);
        MyRunningDataAdapter adapter = new MyRunningDataAdapter(new ArrayList<>());
        recyclerView.setAdapter(adapter);

        TextView tvNoData = findViewById(R.id.tv_no_data);

        executor.execute(new Runnable() {
            @Override
            public void run() {
                List<RunningData> runningDataList = db.runningDataDAO().getLatestTenRunningData();
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