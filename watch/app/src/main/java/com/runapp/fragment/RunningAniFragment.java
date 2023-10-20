package com.runapp.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.runapp.R;
import com.runapp.databinding.FragmentRunningAniBinding;

public class RunningAniFragment extends Fragment {

    private FragmentRunningAniBinding binding;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        binding = FragmentRunningAniBinding.inflate(getLayoutInflater());
        // Inflate the layout for this fragment
        View view =binding.getRoot();

        Glide.with(this)
                .load(R.drawable.run_character)
                .into(binding.myCha);

        return view;
    }
}
