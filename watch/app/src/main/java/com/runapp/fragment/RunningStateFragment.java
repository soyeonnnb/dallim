package com.runapp.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.runapp.R;
import com.runapp.model.RunningViewModel;

import java.util.Locale;

public class RunningStateFragment extends Fragment {

    private RunningViewModel runningViewModel;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_running_state, container, false);

        // ViewModel의 심박수 데이터를 구독하고 UI 업데이트
        runningViewModel.getHeartRate().observe(getViewLifecycleOwner(), heartRate -> {
            // heartRate는 심박수 값입니다.
            TextView heartRateView = view.findViewById(R.id.tv_heart_rate);
            heartRateView.setText(String.valueOf(heartRate));
        });

        // ViewModel의 시간 데이터를 구독하고 UI 업데이트
        runningViewModel.getElapsedTime().observe(getViewLifecycleOwner(), elapsedTime -> {
            // elapsedTime은 "MM:SS" 형식의 문자열입니다.
            TextView timeView = view.findViewById(R.id.tv_time);
            timeView.setText(elapsedTime);
        });

        final double MAX_REALISTIC_PACE = 20.0;

        runningViewModel.getSpeed().observe(getViewLifecycleOwner(), speed ->{

            if (speed <= 0) {
                TextView speedView = view.findViewById(R.id.tv_speed);
                speedView.setText("0''0'");
                return;
            }
            double paceMinutes = (1000 / speed) / 60; // m/s를 분/km로 변환

            if (paceMinutes > MAX_REALISTIC_PACE) {
                TextView speedView = view.findViewById(R.id.tv_speed);
                speedView.setText("정지");
                return;
            }

            int wholeMinutes = (int) paceMinutes;
            int seconds = (int) ((paceMinutes - wholeMinutes) * 60);

            TextView speedView = view.findViewById(R.id.tv_speed);
            speedView.setText(String.format(Locale.getDefault(), "%d''%02d'", wholeMinutes, seconds));
        });

        runningViewModel.getDistance().observe(getViewLifecycleOwner(), distance ->{
            TextView distanceView = view.findViewById(R.id.tv_distance);
            distanceView.setText(distance.toString());
        });
        return view;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Activity와 동일한 ViewModel 인스턴스 가져오기
        runningViewModel = new ViewModelProvider(requireActivity()).get(RunningViewModel.class);
    }
}
