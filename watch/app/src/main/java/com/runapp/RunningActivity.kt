package com.runapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import com.runapp.databinding.ActivityRunningBinding

class RunningActivity : ComponentActivity() {

    private lateinit var binding: ActivityRunningBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRunningBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}