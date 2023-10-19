package com.runapp.activity;

import android.os.Bundle;
import android.view.View;

import androidx.activity.ComponentActivity;

import com.runapp.databinding.ActivitySelectBinding;

public class SelectActivity extends ComponentActivity {

    private ActivitySelectBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivitySelectBinding.inflate(getLayoutInflater());

        View view = binding.getRoot();

        setContentView(view);
    }
}