package com.dallim.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.dallim.R;
import com.dallim.adapter.RunningMateDataAdapter;
import com.dallim.database.AppDatabase;
import com.dallim.model.RunningMate;
import com.dallim.util.CenterZoomLayoutManager;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class RunningMateActivity extends AppCompatActivity {

    private AppDatabase db;
    private Executor executor = Executors.newSingleThreadExecutor();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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