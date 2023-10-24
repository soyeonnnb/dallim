package com.runapp.database;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import com.runapp.model.RiverData;

import java.util.List;

@Dao
public interface RiverDataDAO {
    @Insert
    void insert(RiverData riverData);

    @Query("SELECT * FROM riverdata")
    List<RiverData> getAll();

    @Query("SELECT * FROM riverdata")
    RiverData getOneData();

    @Query("DELETE FROM riverData")
    void deleteAll();
}
