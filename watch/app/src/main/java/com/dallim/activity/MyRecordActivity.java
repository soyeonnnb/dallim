package com.dallim.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewConfiguration;
import android.widget.TextView;

import androidx.activity.ComponentActivity;
import androidx.core.view.InputDeviceCompat;
import androidx.core.view.MotionEventCompat;
import androidx.core.view.ViewConfigurationCompat;
import androidx.recyclerview.widget.RecyclerView;
import androidx.wear.widget.WearableRecyclerView;

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

        WearableRecyclerView recyclerView = findViewById(R.id.my_record_id);
        recyclerView.setLayoutManager(layoutManager);
        MyRunningDataAdapter adapter = new MyRunningDataAdapter(new ArrayList<>());
        recyclerView.setAdapter(adapter);

        recyclerView.requestFocus();


        recyclerView.setOnGenericMotionListener(new View.OnGenericMotionListener() {
            @Override
            public boolean onGenericMotion(View v, MotionEvent ev) {
                if (ev.getAction() == MotionEvent.ACTION_SCROLL &&
                        ev.isFromSource(InputDeviceCompat.SOURCE_ROTARY_ENCODER)) {

                    // 로터리 입력에 따라 스크롤 값을 계산
                    float delta = -ev.getAxisValue(MotionEventCompat.AXIS_SCROLL) *
                            ViewConfigurationCompat.getScaledVerticalScrollFactor(
                                    ViewConfiguration.get(v.getContext()), v.getContext());

                    // RecyclerView를 스크롤합니다.
                    recyclerView.scrollBy(0, Math.round(delta));

                    return true;
                }
                return false;
            }
        });

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