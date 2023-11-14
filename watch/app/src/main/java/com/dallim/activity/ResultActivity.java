package com.dallim.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.dallim.R;
import com.dallim.databinding.ActivityResultBinding;
import com.dallim.dto.response.OneRunningDataResponseDTO;
import com.dallim.service.RunningService;
import com.dallim.util.Conversion;
import com.dallim.util.PreferencesUtil;
import com.dallim.util.VibrateDevice;

import java.util.Map;

public class ResultActivity extends AppCompatActivity {

    private ActivityResultBinding binding;
    private RunningService runningService;
    private Conversion conversion = new Conversion();
    private String winOrLose = "";
    private int timeDifference;
    private String timeFormat;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        VibrateDevice vibrateDevice = new VibrateDevice();
        vibrateDevice.vibrateDevice(getApplicationContext());
        binding = ActivityResultBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        runningService = new RunningService(getApplicationContext());

        View view = binding.getRoot();

        runningService.getRecentRunningData(new RunningService.RecentRunningDataCallback() {
            @Override
            public void onRecentRunningDataLoaded(OneRunningDataResponseDTO recentRunningData) {
                String totalTime = conversion.secondsToTimeString(recentRunningData.getTotal_time());
                double totalDistance = conversion.mToKM(recentRunningData.getTotal_distance());
                Map<String, Integer> result = conversion.sToPace(recentRunningData.getAverage_pace());
                int minutes = result.get("minutes");
                int seconds = result.get("seconds");
                String type = recentRunningData.getType();
                if (type.equals("PAIR")){
                    winOrLose =  recentRunningData.getWin_or_lose();
                }

                // UI 조작 코드를 메인 스레드에서 실행
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        // 같이 달리기인 경우
                        if(type.equals("PAIR")){
                            binding.resultTx.setText("같이 달리기 결과");
                            if(winOrLose.equals("WIN")){
                                timeDifference = recentRunningData.getTime_difference().intValue();
                                timeFormat = conversion.secondsToTimeStringTwo(timeDifference);
                                binding.winLoseGiveup.setText("승리");
                                binding.winLoseGiveup.setTextColor(getResources().getColor(R.color.green));
                                binding.timeDifference.setText(timeFormat);
                                binding.timeDifference.setTextColor(getResources().getColor(R.color.green));
                            }else if(winOrLose.equals("LOSE")){
                                timeDifference = recentRunningData.getTime_difference().intValue();
                                timeFormat = conversion.secondsToTimeStringTwo(timeDifference);
                                binding.winLoseGiveup.setText("패배");
                                binding.winLoseGiveup.setTextColor(getResources().getColor(R.color.red));
                                binding.timeDifference.setText(timeFormat);
                                binding.timeDifference.setTextColor(getResources().getColor(R.color.red));
                            }else if(winOrLose.equals("GIVEUP")){
                                binding.winLoseGiveup.setText("포기");
                                binding.winLoseGiveup.setTextColor(getResources().getColor(R.color.red));
                                binding.timeDifference.setVisibility(View.GONE);
                            }
                        }
                        // 혼자 달리기인 경우
                        else{
                            binding.resultTx.setText("혼자 달리기 결과");
                            binding.winLoseGiveup.setVisibility(View.GONE);
                            binding.timeDifference.setVisibility(View.GONE);
                        }
                        binding.time.setText(totalTime);
                        binding.distance.setText(String.valueOf(totalDistance+"km"));
                        binding.speed.setText(String.valueOf(minutes + "’ " + seconds + "”"));
                        binding.heartRate.setText(String.valueOf(recentRunningData.getAverage_heart_rate()));

                    }
                });
            }
        });

        Button closeBtn = view.findViewById(R.id.close);



        closeBtn.setOnClickListener(b -> {
            Intent intent = new Intent(ResultActivity.this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}