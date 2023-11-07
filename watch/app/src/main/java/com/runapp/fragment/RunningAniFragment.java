package com.runapp.fragment;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.runapp.R;
import com.runapp.activity.MainActivity;
import com.runapp.databinding.FragmentRunningAniBinding;
import com.runapp.model.runningMate.Pace;
import com.runapp.util.PreferencesUtil;

public class RunningAniFragment extends Fragment {

    private FragmentRunningAniBinding binding;
    private SharedPreferences prefs;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getContext());
        long characterIndex = prefs.getLong("characterIndex", 0L);
        boolean evolution = prefs.getBoolean("evolution", false);

        binding = FragmentRunningAniBinding.inflate(getLayoutInflater());
        // Inflate the layout for this fragment
        View view = binding.getRoot();

        if (evolution){
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

        binding.btnFinish.setOnClickListener(v->{
            Intent intent = new Intent(getActivity(), MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            getActivity().finish(); // 현재 액티비티 종료 (옵션)
        });

        return view;


    }
}
