package com.runapp.database;

import androidx.room.Insert;

import com.runapp.dto.response.UserInfoResponseDTO;

public interface UserDAO {

    @Insert
    public void inset(UserInfoResponseDTO userInfoResponseDTO);
}
