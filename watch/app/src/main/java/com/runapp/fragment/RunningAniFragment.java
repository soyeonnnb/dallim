package com.runapp.fragment;

import android.app.Activity;
import android.content.Intent;
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
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.runapp.R;
import com.runapp.activity.MainActivity;
import com.runapp.databinding.FragmentRunningAniBinding;
import com.runapp.model.runningMate.Pace;
import com.runapp.util.Conversion;
import com.runapp.util.MyApplication;
import com.runapp.util.PreferencesUtil;
import com.runapp.view.RunningViewModel;

import org.w3c.dom.Text;

public class RunningAniFragment extends Fragment {

    private FragmentRunningAniBinding binding;
    private SharedPreferences prefs;
    private RunningViewModel runningViewModel;
    private Conversion conversion = new Conversion();

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
        // ms로 들어옴
        runningViewModel.getMsPace().observe(getViewLifecycleOwner(), pace ->{
            TextView paceView = view.findViewById(R.id.ani_pace);
            paceView.setText(pace);
        });

        runningViewModel.getDistance().observe(getViewLifecycleOwner(), distance ->{
            TextView distanceView = view.findViewById(R.id.ani_distance);
            distanceView.setText(distance.toString());
        });

        TextView distanceDifferenceView = view.findViewById(R.id.distance_difference);
        if (runningViewModel.getDistanceDifference().getValue() != null && runningViewModel.getDistanceDifference().getValue() == -1.0){
            distanceDifferenceView.setVisibility(View.GONE);
        } else if(runningViewModel.getDistanceDifference().getValue() != null && runningViewModel.getDistanceDifference().getValue() != 0){
            Log.e("차이", String.valueOf(runningViewModel.getDistanceDifference().getValue()));
            distanceDifferenceView = view.findViewById(R.id.distance_difference);
            distanceDifferenceView.setText(String.valueOf(runningViewModel.getDistanceDifference().getValue()));
        }


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
        }
    }
}
