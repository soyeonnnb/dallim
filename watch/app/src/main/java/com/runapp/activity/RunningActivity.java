package com.runapp.activity;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;
import com.runapp.adapter.ViewPagerAdapter;
import com.runapp.databinding.ActivityRunningBinding;

public class RunningActivity extends AppCompatActivity {

    private ActivityRunningBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Inflate the layout for this activity
        binding = ActivityRunningBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Set up the ViewPager with the sections adapter.
        ViewPager2 viewPager = binding.viewPager;
        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);
    }
}
