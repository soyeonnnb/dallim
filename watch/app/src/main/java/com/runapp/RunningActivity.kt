package com.runapp

import android.os.Bundle
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.activity.ComponentActivity
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.viewpager2.widget.ViewPager2
import com.runapp.adapter.ViewPagerAdapter
import com.runapp.databinding.ActivityRunningBinding

class RunningActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRunningBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRunningBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val viewPager: ViewPager2 = binding.viewPager
        val viewpagetFragmentAdapter = ViewPagerAdapter(this)
        viewPager.adapter = viewpagetFragmentAdapter

    }
}
