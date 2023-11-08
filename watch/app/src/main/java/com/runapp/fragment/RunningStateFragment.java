package com.runapp.fragment;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.runapp.R;
import com.runapp.activity.MainActivity;
import com.runapp.databinding.FragmentRunningAniBinding;
import com.runapp.databinding.FragmentRunningStateBinding;
import com.runapp.view.RunningViewModel;
import com.runapp.util.Conversion;
import com.runapp.util.MyApplication;

public class RunningStateFragment extends Fragment {

    private RunningViewModel runningViewModel;
    private FragmentRunningStateBinding binding;
    private Conversion conversion = new Conversion();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentRunningStateBinding.inflate(getLayoutInflater());
        // Inflate the layout for this fragment
        View view = binding.getRoot();

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

        // ms로 들어옴
        runningViewModel.getMsPace().observe(getViewLifecycleOwner(), pace ->{
            TextView paceView = view.findViewById(R.id.tv_pace);
            paceView.setText(pace);
        });

        runningViewModel.getDistance().observe(getViewLifecycleOwner(), distance ->{
            TextView distanceView = view.findViewById(R.id.tv_distance);
            if (distance.equals(0.0)){
                distanceView.setText("0.00");
            }else{
                distanceView.setText(distance.toString());
            }
        });

        Glide.with(this)
                .asGif()
                .load(R.drawable.down_arrow)
                .into((android.widget.ImageView) view.findViewById(R.id.down_arrow));

        binding.btnFinish.setOnClickListener(v->{
            Intent intent = new Intent(getActivity(), MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            getActivity().finish(); // 현재 액티비티 종료 (옵션)
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
        }
    }

}
