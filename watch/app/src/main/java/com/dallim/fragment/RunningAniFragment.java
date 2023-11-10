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
    private Boolean value = false;
    private String myCha;
    private String mateCha;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getContext());
        long characterIndex = prefs.getLong("characterIndex", 0L);
        int evolutionStage = prefs.getInt("evolutionStage", 0);
        long planetIndex = prefs.getLong("planetIndex", 0);
        int mateEvolutionStage = prefs.getInt("mate_evolution_stage", -1);
        int mateCharacterIndex = prefs.getInt("mate_character_index", -1);
        System.out.println(mateEvolutionStage);
        System.out.println(mateCharacterIndex);

        binding = FragmentRunningAniBinding.inflate(getLayoutInflater());
        // Inflate the layout for this fragment
        View view = binding.getRoot();

        // 행성 이미지 설정
        String planetResourceName = "planet" + (planetIndex == 0 ? "black" :
                planetIndex == 1 ? "yellow" :
                        planetIndex == 2 ? "blue" :
                                planetIndex == 3 ? "purple" :
                                        "red");
        int planetResId = getResources().getIdentifier(planetResourceName, "drawable", getContext().getPackageName());
        ImageView planetView = view.findViewById(R.id.running_planet);
        planetView.setImageResource(planetResId);

        // 캐릭터 이미지 설정
        String characterType = characterIndex == 0 ? "rabbit" :
                characterIndex == 1 ? "penguin" :
                        characterIndex == 2 ? "panda" :
                                "chick";
        String evolutionSuffix = evolutionStage == 1 ? "_run" : "egg_run";
        String characterResourceName = characterType + evolutionSuffix;
        int characterResId = getResources().getIdentifier(characterResourceName, "drawable", getContext().getPackageName());

        Glide.with(this)
                .load(characterResId)
                .into(binding.myCha);

        // ViewModel의 시간 데이터를 구독하고 UI 업데이트
        runningViewModel.getElapsedTime().observe(getViewLifecycleOwner(), elapsedTime -> {
            // elapsedTime은 "MM:SS" 형식의 문자열입니다.
            TextView timeView = view.findViewById(R.id.ani_time);
            timeView.setText(elapsedTime);
        });

        runningViewModel.getDistance().observe(getViewLifecycleOwner(), distance -> {
            TextView distanceView = view.findViewById(R.id.ani_distance);
            distanceView.setText(distance.toString());
        });

        if (value) {
            runningViewModel.getDistanceDifference().observe(getViewLifecycleOwner(), distanceDifference -> {
                String km = formatDistance(distanceDifference);
                TextView distanceDifferenceView = view.findViewById(R.id.distance_difference);
                TextView distanceKm = view.findViewById(R.id.distance_difference_km);
                distanceDifferenceView.setText(String.valueOf(km));

                Log.d("거리 차이", km);
                // 거리에 따라 색 변경
                if (km.contains("+")) {
                    distanceDifferenceView.setTextColor(ContextCompat.getColor(getContext(), R.color.green));
                    distanceKm.setTextColor(ContextCompat.getColor(getContext(), R.color.green));
                } else if (km.contains("-")) {
                    distanceDifferenceView.setTextColor(ContextCompat.getColor(getContext(), R.color.red));
                    distanceKm.setTextColor(ContextCompat.getColor(getContext(), R.color.red));
                } else {
                    distanceDifferenceView.setTextColor(ContextCompat.getColor(getContext(), R.color.white));
                    distanceKm.setTextColor(ContextCompat.getColor(getContext(), R.color.white));
                }

                showMateCharacter(distanceDifference, mateEvolutionStage, mateCharacterIndex);
            });
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
            value = runningViewModel.getPairCheck().getValue();
            if (value) {
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
        if (kilometers <= 0.00) {
            // 정확히 0일 경우 그대로 출력
            return String.format("%.2f", kilometers);
        } else {
            // 0.01 이상일 경우 '+' 기호를 붙여서 출력
            return String.format("+%.2f", kilometers);
        }
    }

    // 상대방 캐릭터 표시 로직
    private void showMateCharacter(double distanceDifference, int mateEvolutionStage, int mateCharacterIndex) {
        // 먼저 모든 캐릭터를 숨깁니다.
        hideAllMateCharacters();

        ImageView mateView = null;

        // 거리 차이에 따른 캐릭터 선택
        if (distanceDifference > -250 && distanceDifference <= 0) {
            mateView = binding.mateCha4;
        } else if (distanceDifference > -500 && distanceDifference <= -250) {
            mateView = binding.mateCha5;
        } else if (distanceDifference > -1000 && distanceDifference <= -500) {
            mateView = binding.mateCha6;
        } else if (distanceDifference < 250 && distanceDifference >= 0) {
            mateView = binding.mateCha3;
        } else if (distanceDifference < 500 && distanceDifference <= 250) {
            mateView = binding.mateCha2;
        } else if (distanceDifference < 1000 && distanceDifference <= 500) {
            mateView = binding.mateCha1;
        }

        // 상대방 캐릭터의 이미지 설정
        if (mateView != null) {
            mateView.setVisibility(View.VISIBLE);
            // 캐릭터 타입 결정
            String[] characterTypes = {"rabbit", "penguin", "panda", "chick"};
            String characterType = characterTypes[mateCharacterIndex]; // 여기서 인덱스 범위 검사 필요

            // 진화 단계에 따른 접미사 결정
            String evolutionSuffix = (mateEvolutionStage == 1) ? "_run" : "egg_run";

            // 리소스 이름 생성
            String characterResourceName = characterType + evolutionSuffix;
            int characterResId = getResources().getIdentifier(characterResourceName, "drawable", getContext().getPackageName());

            // 이미지 설정
            Glide.with(this)
                    .load(characterResId)
                    .into(mateView);
        }
    }

    // 모든 ImageView를 숨기는 메소드
    private void hideAllMateCharacters() {
        binding.mateCha1.setVisibility(View.INVISIBLE);
        binding.mateCha2.setVisibility(View.INVISIBLE);
        binding.mateCha3.setVisibility(View.INVISIBLE);
        binding.mateCha4.setVisibility(View.INVISIBLE);
        binding.mateCha5.setVisibility(View.INVISIBLE);
        binding.mateCha6.setVisibility(View.INVISIBLE);
    }
}
