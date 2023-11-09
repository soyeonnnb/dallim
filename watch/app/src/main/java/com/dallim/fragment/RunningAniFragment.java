package com.dallim.fragment;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.dallim.R;
import com.dallim.databinding.FragmentRunningAniBinding;
import com.dallim.util.Conversion;
import com.dallim.util.MyApplication;
import com.dallim.util.PreferencesUtil;
import com.dallim.view.RunningMateRecordViewModel;
import com.dallim.view.RunningViewModel;

import java.util.List;

public class RunningAniFragment extends Fragment {

    private FragmentRunningAniBinding binding;
    private SharedPreferences prefs;
    private RunningViewModel runningViewModel;
    private RunningMateRecordViewModel runningMateRecordViewModel;
    private Conversion conversion = new Conversion();
    private double lastDistance;
    private List<Double> mateDistance;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getContext());
        long characterIndex = prefs.getLong("characterIndex", 0L);
        int evolutionStage = prefs.getInt("evolutionStage", 0);
        long planetIndex = prefs.getLong("planetIndex", 0);

        binding = FragmentRunningAniBinding.inflate(getLayoutInflater());
        // Inflate the layout for this fragment
        View view = binding.getRoot();
        ImageView viewById = view.findViewById(R.id.running_planet);
        System.out.println(planetIndex + " : 행성 번호");

        if (planetIndex == 0){
            viewById.setImageResource(R.drawable.planetblack);
        }else if (planetIndex == 1){
            viewById.setImageResource(R.drawable.planetyellow);
        }else if (planetIndex == 2){
            viewById.setImageResource(R.drawable.planetblue);
        }else if (planetIndex == 3){
            viewById.setImageResource(R.drawable.planetpurple);
        }else if (planetIndex == 4){
            viewById.setImageResource(R.drawable.planetred);
        }

        if (evolutionStage == 1){
            if (characterIndex == 0){
                Glide.with(this)
                        .load(R.drawable.rabbit_run)
                        .into(binding.myCha);
            }else if(characterIndex == 1){
                Glide.with(this)
                        .load(R.drawable.penguin_run)
                        .into(binding.myCha);
            }else if(characterIndex == 2){
                Glide.with(this)
                        .load(R.drawable.panda_run)
                        .into(binding.myCha);
            }else if(characterIndex == 3){
                Glide.with(this)
                        .load(R.drawable.chick_run)
                        .into(binding.myCha);
            }
        }else{
            if (characterIndex == 0){
                Glide.with(this)
                        .load(R.drawable.rabbitegg_run)
                        .into(binding.myCha);
            }else if(characterIndex == 1){
                Glide.with(this)
                        .load(R.drawable.penguinegg_run)
                        .into(binding.myCha);
            }else if(characterIndex == 2){
                Glide.with(this)
                        .load(R.drawable.pandaegg_run)
                        .into(binding.myCha);
            }else if(characterIndex == 3){
                Glide.with(this)
                        .load(R.drawable.chickegg_run)
                        .into(binding.myCha);
            }
        }

        // ViewModel의 시간 데이터를 구독하고 UI 업데이트
        runningViewModel.getElapsedTime().observe(getViewLifecycleOwner(), elapsedTime -> {
            // elapsedTime은 "MM:SS" 형식의 문자열입니다.
            TextView timeView = view.findViewById(R.id.ani_time);
            timeView.setText(elapsedTime);
        });

        runningViewModel.getDistance().observe(getViewLifecycleOwner(), distance ->{
            TextView distanceView = view.findViewById(R.id.ani_distance);
            distanceView.setText(distance.toString());
        });

        runningViewModel.getDistanceDifference().observe(getViewLifecycleOwner(), distanceDifference ->{
            String km = formatDistance(distanceDifference);
            TextView distanceDifferenceView = view.findViewById(R.id.distance_difference);
            TextView distanceKm = view.findViewById(R.id.distance_difference_km);
            distanceDifferenceView.setText(String.valueOf(km));

            Log.d("거리 차이", km);
            // 거리에 따라 색 변경
            if (km.contains("+")) {
                distanceDifferenceView.setTextColor(ContextCompat.getColor(getContext(), R.color.blue));
                distanceKm.setTextColor(ContextCompat.getColor(getContext(), R.color.blue));
            } else if (km.contains("-")) {
                distanceDifferenceView.setTextColor(ContextCompat.getColor(getContext(), R.color.red));
                distanceKm.setTextColor(ContextCompat.getColor(getContext(), R.color.red));
            }

            // 이긴 상태
            if(distanceDifference >= lastDistance){
                FragmentActivity activity = getActivity();
                if (activity != null){
                    activity.finish();
                }
            }

        });

        Glide.with(this)
                .asGif()
                .load(R.drawable.up_arrow)
                .into((android.widget.ImageView) view.findViewById(R.id.up_arrow));

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
            Boolean value = runningViewModel.getPairCheck().getValue();
            if(value){
                runningMateRecordViewModel = new ViewModelProvider(myApplication).get(RunningMateRecordViewModel.class);
                mateDistance = runningMateRecordViewModel.getMateRecord().getValue().getDistance();
                // 마지막 거리 저장
                lastDistance = mateDistance.get(mateDistance.size() - 1);
            }
        }
    }

    // 미터 값을 킬로미터로 변환하고 소수점 두 자리로 포매팅하는 메소드
    public String formatDistance(double meters) {
        double kilometers = meters / 1000.0; // 미터를 킬로미터로 변환
        return String.format("%.2f", kilometers); // 소수점 두 자리로 포매팅
    }
}
