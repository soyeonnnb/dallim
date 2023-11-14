package com.dallim.activity;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.dallim.R;
import com.dallim.databinding.ActivityLoadingBinding;
import com.dallim.model.RunningMateRecord;
import com.dallim.service.RunningService;
import com.dallim.util.MyApplication;
import com.dallim.util.PreferencesUtil;
import com.dallim.view.RunningMateRecordViewModel;

public class LoadingActivity extends AppCompatActivity {

    private RunningService runningService;
    private SharedPreferences prefs;
    private Intent intent;
    private RunningMateRecordViewModel viewModel;
    private String runningRecordId;
    private ActivityLoadingBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityLoadingBinding.inflate(getLayoutInflater());
        View view = binding.getRoot();
        setContentView(view);

        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());
        SharedPreferences.Editor edit = prefs.edit();

        runningService = new RunningService(getApplicationContext());
        viewModel = new ViewModelProvider((MyApplication) getApplication()).get(RunningMateRecordViewModel.class);

        String runningRecordId1 = prefs.getString("runningRecordId", "");
        // 내부 저장소에 기록 아이디 있으면 삭제
        if (!runningRecordId1.equals("")){
            edit.remove("runningRecordId");
            edit.apply();
        }


        intent = getIntent();
        runningRecordId = intent.getStringExtra("running_record_id");
        if(runningRecordId.equals(null)){

        }else{
            edit.putString("runningRecordId", runningRecordId);
            edit.apply();
            // 러닝메이트 기록 가져와서 sqlite에 저장
            loadData();
        }

        Glide.with(this)
                .asGif()
                .load(R.raw.panda_run)
                .diskCacheStrategy(DiskCacheStrategy.RESOURCE)
                .into((android.widget.ImageView) view.findViewById(R.id.loading));
    }

    private void loadData() {
        // 서비스를 통해 데이터를 로드하고 콜백에서 ViewModel을 업데이트합니다.
        runningService.getRunningMateRunningRecord(this, runningRecordId, new RunningService.DataCallback() {
            @Override
            public void onDataLoaded(RunningMateRecord record) {
                viewModel.setMateRecord(record);
                startCountdownActivity();
            }
        });
    }

    private void startCountdownActivity() {
        Intent intent = new Intent(this, CountdownActivity.class);
        // 다른 액티비티로 값을 넘길 때 쓴다. 키 밸류로 구분
        intent.putExtra("run_type", "PAIR");
        countdownActivityResultLauncher.launch(intent);
    }

    // 카운트다운이 끝났을 때 콜백 메서드
    ActivityResultLauncher<Intent> countdownActivityResultLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == Activity.RESULT_OK) {
                    String runType = result.getData().getStringExtra("run_type");
                    // 카운트다운 액티비티가 끝나면 셀렉트 액티비티에서 러닝 액티비티로 바뀜.
                    Intent nextActivityIntent = new Intent(LoadingActivity.this, RunningActivity.class);
                    nextActivityIntent.putExtra("run_type", runType);
                    startActivity(nextActivityIntent);
                    finish();
                }
            });

}