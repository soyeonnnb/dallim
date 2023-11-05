package com.runapp.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.runapp.R;
import com.runapp.adapter.RunningMateDataAdapter;
import com.runapp.database.AppDatabase;
import com.runapp.model.RunningMate;
import com.runapp.util.CenterZoomLayoutManager;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class RunningMateActivity extends AppCompatActivity {

    private AppDatabase db;
    private Executor executor = Executors.newSingleThreadExecutor();
    private ViewPager2 viewPager2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        CenterZoomLayoutManager layoutManager = new CenterZoomLayoutManager(this);
        setContentView(R.layout.activity_running_mate);

        db = AppDatabase.getDatabase(this);

        RecyclerView recyclerView = findViewById(R.id.rv_running_mate);
        recyclerView.setLayoutManager(layoutManager);
        RunningMateDataAdapter adapter = new RunningMateDataAdapter(new ArrayList<>());
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
                            Log.d("run", "run 들어옴");
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
}