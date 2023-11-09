package com.runapp.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;

import androidx.activity.ComponentActivity;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.wear.widget.WearableLinearLayoutManager;
import androidx.wear.widget.WearableRecyclerView;

import com.runapp.R;
import com.runapp.adapter.MenuAdapter;
import com.runapp.database.AppDatabase;
import com.runapp.databinding.ActivitySelectBinding;
import com.runapp.model.MenuItem;
import com.runapp.service.RunningService;
import com.runapp.util.CustomScrollingLayoutCallback;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private AppDatabase db;
    private RunningService runningService;
    private WearableRecyclerView recyclerView;
    private MenuAdapter menuAdapter;
    private List<MenuItem> menuList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        runningService = new RunningService(getApplicationContext());

        binding = ActivitySelectBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setEdgeItemsCenteringEnabled(true);

        menuList = new ArrayList<>();
        // Add items to the menuList here
        menuList.add(new MenuItem(R.drawable.penguinegg, "혼자 달리기"));
        menuList.add(new MenuItem(R.drawable.chickegg, "함께 달리기"));
        menuList.add(new MenuItem(R.drawable.pandaegg, "기록 보기"));
        menuList.add(new MenuItem(R.drawable.rabbitegg, "설정"));

        menuAdapter = new MenuAdapter(this, menuList);
        recyclerView.setAdapter(menuAdapter);

        CustomScrollingLayoutCallback customScrollingLayoutCallback =
                new CustomScrollingLayoutCallback();
        recyclerView.setLayoutManager(
                new WearableLinearLayoutManager(this, customScrollingLayoutCallback));


        db = AppDatabase.getDatabase(getApplicationContext());
        Context context = SelectActivity.this;

        // 클릭 이벤트 처리
        menuAdapter.setOnItemClickListener(new MenuAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                MenuItem clickedItem = menuList.get(position);
                switch (clickedItem.getTitle()) {
                    case "혼자 달리기":
//                         AlertDialog.Builder 인스턴스 생성
                        AlertDialog.Builder builder = new AlertDialog.Builder(SelectActivity.this, R.style.CustomDialogTheme);

                        LayoutInflater inflater = getLayoutInflater();
                        // single_popup.xml을 가져와서 객체로 생성
                        View customView = inflater.inflate(R.layout.single_popup, null);

                        builder.setView(customView);

                        // builder 내용으로 AlertDialog 생성
                        AlertDialog dialog = builder.create();

                        // AlertDialog 보이기
                        dialog.show();

                        Button btnCancel = customView.findViewById(R.id.single_cancel);
                        Button btnStart = customView.findViewById(R.id.single_start);

                        // 취소 버튼에 대한 클릭 리스너
                        btnCancel.setOnClickListener(b -> {
                            dialog.dismiss();
                        });

                        // 확인 버튼에 대한 클릭 리스너
                        btnStart.setOnClickListener(b -> {
                            // 확인 버튼을 누르면 카운트다운 액티비티로 넘어감.
                            Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                            // 다른 액티비티로 값을 넘길 때 쓴다. 키 밸류로 구분
                            intent.putExtra("run_type", "ALONE");
                            countdownActivityResultLauncher.launch(intent);
                            dialog.dismiss();
                        });
                        break;
                    case "함께 달리기":
                        runningService.getRunningMate(SelectActivity.this);
                        break;
                    case "기록 보기":
                        Intent intent = new Intent(SelectActivity.this, MyRecordActivity.class);
                        startActivity(intent);
                        break;
                    case "설정":
                        intent = new Intent(SelectActivity.this, SettingActivity.class);
                        startActivity(intent);
                        break;
                }
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    // 카운트다운이 끝났을 때 콜백 메서드
    ActivityResultLauncher<Intent> countdownActivityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == Activity.RESULT_OK) {
                    String runType = result.getData().getStringExtra("run_type");
                    // 카운트다운 액티비티가 끝나면 셀렉트 액티비티에서 러닝 액티비티로 바뀜.
                    Intent nextActivityIntent = new Intent(SelectActivity.this, RunningActivity.class);
                    nextActivityIntent.putExtra("run_type", runType);
                    startActivity(nextActivityIntent);
                }
            });

}