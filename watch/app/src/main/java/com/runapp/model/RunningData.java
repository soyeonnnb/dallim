package com.runapp.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity
public class RunningData {
    @PrimaryKey(autoGenerate = true)
    public int id;
    @ColumnInfo(name = "distance")
    public float distance;
    @ColumnInfo(name = "speed")
    public float speed;
    @ColumnInfo(name = "heart_rate")
    public int heartRate;
    @ColumnInfo(name = "time")
    public long time;
    @ColumnInfo(name = "date")
    public Date date;
    @ColumnInfo(name = "formatted_date")
    public String formattedDate;
    @ColumnInfo(name = "character")
    public String character;
}
