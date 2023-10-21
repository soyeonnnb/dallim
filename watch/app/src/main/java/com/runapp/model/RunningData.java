package com.runapp.model;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class RunningData {
    @PrimaryKey(autoGenerate = true)
    public int id;

    public float distance;
    public float speed;
    public int heartRate;
    public long time;
}
