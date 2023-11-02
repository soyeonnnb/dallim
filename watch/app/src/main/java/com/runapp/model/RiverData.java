package com.runapp.model;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;

@Entity
public class RiverData {
    @PrimaryKey(autoGenerate = true)
    public int id;
    @ColumnInfo(name = "distance")
    public double distance;
    @ColumnInfo(name = "nickname")
    public String nickname;
    @ColumnInfo(name = "speed")
    public double speed;
    @ColumnInfo(name = "time")
    public long time;
    @ColumnInfo(name = "date")
    public Date date;
    @ColumnInfo(name = "formatted_date")
    public String formattedDate;
    @ColumnInfo(name = "character")
    public String character;
}
