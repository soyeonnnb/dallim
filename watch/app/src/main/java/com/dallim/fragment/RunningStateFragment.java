package com.dallim.fragment;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.dallim.R;
import com.dallim.databinding.FragmentRunningStateBinding;
import com.dallim.util.PreferencesUtil;
import com.dallim.view.RunningMateRecordViewModel;
import com.dallim.view.RunningViewModel;
import com.dallim.util.Conversion;
import com.dallim.util.MyApplication;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class RunningStateFragment extends Fragment {

    private RunningViewModel runningViewModel;
    private FragmentRunningStateBinding binding;
    private SharedPreferences prefs;
    private RunningMateRecordViewModel runningMateRecordViewModel;
    private double lastDistance;
    private List<Double> mateDistance;
    private Boolean value;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getContext());

        long characterIndex = prefs.getLong("characterIndex", 0L);
        int evolutionStage = prefs.getInt("evolutionStage", 0);
        long planetIndex = prefs.getLong("planetIndex", 0);

        // Inflate the layout for this fragment
        binding = FragmentRunningStateBinding.inflate(getLayoutInflater());
        // Inflate the layout for this fragment
        View view = binding.getRoot();

        // 캐릭터 배경이미지 설정
        String characterType = characterIndex == 0 ? "rabbit" :
                characterIndex == 1 ? "penguin" :
                        characterIndex == 2 ? "panda" :
                                "chick";
        String evolutionSuffix = evolutionStage == 1 ? "_background_running" : "egg_background_running";
        String characterResourceName = characterType + evolutionSuffix;
        int characterResId = getResources().getIdentifier(characterResourceName, "drawable", getContext().getPackageName());
        FrameLayout backgroundImage = view.findViewById(R.id.running_background);
        backgroundImage.setBackgroundResource(characterResId);

        // ViewModel의 심박수 데이터를 구독하고 UI 업데이트
        runningViewModel.getHeartRate().observe(getViewLifecycleOwner(), heartRate -> {
            // heartRate는 심박수 값입니다.
            TextView heartRateView = view.findViewById(R.id.tv_heart_rate);
            heartRateView.setText(String.valueOf(((int) heartRate.doubleValue())) + "bpm");
        });

        // ViewModel의 시간 데이터를 구독하고 UI 업데이트
        runningViewModel.getElapsedTime().observe(getViewLifecycleOwner(), elapsedTime -> {
            // elapsedTime은 "MM:SS" 형식의 문자열입니다.
            TextView timeView = view.findViewById(R.id.tv_time);
            timeView.setText(elapsedTime);
        });

        // ms로 들어옴
        runningViewModel.getMsPace().observe(getViewLifecycleOwner(), pace -> {
            TextView paceView = view.findViewById(R.id.tv_pace);
            paceView.setText(pace);
        });

        runningViewModel.getDistance().observe(getViewLifecycleOwner(), distance -> {
            TextView distanceView = view.findViewById(R.id.tv_distance);
            if (distance.equals(0.0)) {
                distanceView.setText("0.00km");
            } else {
                distanceView.setText(distance.toString() + "km");
            }
        });

        Glide.with(this)
                .asGif()
                .load(R.raw.down_arrow)
                .diskCacheStrategy(DiskCacheStrategy.RESOURCE)
                .into((android.widget.ImageView) view.findViewById(R.id.down_arrow));

        binding.btnFinish.setOnClickListener(v -> {
            LayoutInflater inflater1 = requireActivity().getLayoutInflater();
            View dialogView = inflater1.inflate(R.layout.modal, null);

            Button cancel = dialogView.findViewById(R.id.cancel);
            Button finish = dialogView.findViewById(R.id.finish);

            TextView text = dialogView.findViewById(R.id.text_view);
            if(value){
                text.setText("지금 종료하면\n포기하게 됩니다.\n종료하시겠습니까?");
            }else{
                text.setText("달리기를\n종료하시겠습니까?");
            }
            finish.setText("종료");

            AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
            builder.setView(dialogView);

            AlertDialog dialog = builder.create();

            if (dialog.getWindow() != null) {
                dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0x80000000));
            }
            dialog.show();

            cancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            finish.setOnClickListener(b ->{
                // 만약 함께 달리기면
                if(value){
                    runningMateRecordViewModel.setGiveUp((Boolean) true);
                }
                getActivity().finish();
                dialog.dismiss();
            });
        });
        return view;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Activity activity = getActivity();
        // Activity와 동일한 ViewModel 인스턴스 가져오기
        if (activity != null) {
            // 액티비티를 통해 애플리케이션의 Application 객체를 가져옵니다.
            MyApplication myApplication = (MyApplication) activity.getApplication();
            // ViewModel을 초기화할 때 애플리케이션의 Application 객체를 사용합니다.
            runningViewModel = new ViewModelProvider(myApplication).get(RunningViewModel.class);

            value = runningViewModel.getPairCheck().getValue();
            if (value) {
                runningMateRecordViewModel = new ViewModelProvider(myApplication).get(RunningMateRecordViewModel.class);
                mateDistance = runningMateRecordViewModel.getMateRecord().getValue().getDistance();
                // 마지막 거리 저장
                lastDistance = mateDistance.get(mateDistance.size() - 1);
            }
        }
    }
    // 현재 시간을 표시하는 메서드 정의
    private void updateTime(TextView timeView) {
        // 현재 시간을 가져오는 코드
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());
        String currentTime = dateFormat.format(new Date());

        // TextView에 현재 시간 설정
        timeView.setText(currentTime);
    }


}