package com.dallim.activity;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.ComponentActivity;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.wear.widget.WearableLinearLayoutManager;
import androidx.wear.widget.WearableRecyclerView;

import com.dallim.R;
import com.dallim.adapter.MenuAdapter;
import com.dallim.databinding.ActivitySelectBinding;
import com.dallim.model.MenuItem;
import com.dallim.service.RunningService;
import com.dallim.util.CustomScrollingLayoutCallback;
import com.dallim.util.TtsUtil;

import java.util.ArrayList;
import java.util.List;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
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

        // 클릭 이벤트 처리
        menuAdapter.setOnItemClickListener(new MenuAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(int position) {
                MenuItem clickedItem = menuList.get(position - 2);
                switch (clickedItem.getTitle()) {
                    case "혼자 달리기":
                        LayoutInflater inflater1 = getLayoutInflater();
                        View dialogView = inflater1.inflate(R.layout.modal, null);

                        TextView text = dialogView.findViewById(R.id.text_view);
                        text.setText("혼자 달리기\n시작하시겠습니까?");

                        Button cancel = dialogView.findViewById(R.id.cancel);
                        Button finish = dialogView.findViewById(R.id.finish);
                        finish.setText("시작");

                        AlertDialog.Builder builder = new AlertDialog.Builder(SelectActivity.this);
                        builder.setView(dialogView);

                        AlertDialog dialog = builder.create();
                        if (dialog.getWindow() != null) {
                            dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
                        }
                        dialog.show();

                        cancel.setOnClickListener(b ->{
                            dialog.dismiss();
                        });

                        finish.setOnClickListener(b ->{
                            Intent intent = new Intent(SelectActivity.this, CountdownActivity.class);
                            // 다른 액티비티로 값을 넘길 때 쓴다. 키 밸류로 구분
                            intent.putExtra("run_type", "ALONE");
                            countdownActivityResultLauncher.launch(intent);
                            dialog.dismiss();
                        });
                        break;
                    case "함께 달리기":
                        runningService.getRunningMate(SelectActivity.this, new RunningService.RunningMateListCallback() {
                            @Override
                            public void onSuccess() {
                                // 데이터 저장 후 RunningMateActivity 시작
                                Intent intent = new Intent(SelectActivity.this, RunningMateActivity.class);
                                startActivity(intent);
                            }

                            @Override
                            public void onError(String message) {
                                Toast.makeText(SelectActivity.this, message, Toast.LENGTH_SHORT).show();
                            }
                        });
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

    @Override
    protected void onDestroy() {
        super.onDestroy();
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