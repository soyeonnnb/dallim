package com.runapp

import android.annotation.SuppressLint
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.os.PersistableBundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.preference.PreferenceManager
import com.runapp.databinding.ActivityMainBinding
import java.util.Timer
import kotlin.concurrent.timer

class MainActivity : ComponentActivity(){

    private lateinit var binding: ActivityMainBinding

    private fun saveData(height: Float, weight: Float){
        val pref = PreferenceManager.getDefaultSharedPreferences(this)
        val editor = pref.edit()

        editor.putFloat("KEY_HEIGHT", height)
            .putFloat("KEY_WEIGHT", weight)
            .apply()
    }

    private fun loadData(){
        val pref = PreferenceManager.getDefaultSharedPreferences(this)
        val height = pref.getFloat("KEY_HEIGHT", 0f)
        val weight = pref.getFloat("KEY_WEIGHT", 0f)

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnStart.setOnClickListener{
            startActivity(Intent(this, RunningActivity::class.java))
        }

//        loadData()
//
//        binding.btnResult.setOnClickListener {
//            if (binding.weight.text.isNotBlank() && binding.height.text.isNotBlank()) {
//
//                saveData(
//                    binding.height.text.toString().toFloat(),
//                    binding.weight.text.toString().toFloat(),
//                )
//
//                val intent = Intent(this, ResultActivity::class.java).apply {
//                    putExtra("weight", binding.weight.text.toString().toFloat())
//                    putExtra("height", binding.height.text.toString().toFloat())
//                }
//
//                startActivity(intent)
//            }
//        }
    }

}