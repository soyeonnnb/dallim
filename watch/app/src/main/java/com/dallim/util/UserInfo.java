package com.dallim.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.dallim.dto.response.ApiResponseDTO;
import com.dallim.dto.response.UserInfoResponseDTO;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserInfo {
    private SharedPreferences prefs;
    // Callback 인터페이스 추가
    public interface UserInfoCallback {
        void onSuccess();
        void onError(String message);
    }

    public void getUserInfo(Context context, UserInfoCallback callback){
        prefs = PreferencesUtil.getEncryptedSharedPreferences(context);

        String accessToken = AccessToken.getInstance().getAccessToken();

        Call<ApiResponseDTO<UserInfoResponseDTO>> call = ApiUtil.getApiService().getUserInfo("Bearer " + accessToken);
        call.enqueue(new Callback<ApiResponseDTO<UserInfoResponseDTO>>() {
            @Override
            public void onResponse(Call<ApiResponseDTO<UserInfoResponseDTO>> call, Response<ApiResponseDTO<UserInfoResponseDTO>> response) {
                if (response.isSuccessful() && response.body().getData() != null){
                    Log.d("성공", String.valueOf(response.body().getData().toString()));
                    SharedPreferences.Editor edit = prefs.edit();
                    edit.putString("nickname", response.body().getData().getNickName());
                    edit.putLong("characterId", response.body().getData().getCharacterId());
                    edit.putString("email", response.body().getData().getEmail());
                    edit.putLong("userId", response.body().getData().getUserId());
                    edit.putLong("characterIndex", response.body().getData().getCharacterIndex());
                    edit.putLong("planetIndex", response.body().getData().getPlanetIndex());
                    edit.putInt("level", response.body().getData().getLevel());
                    edit.putInt("evolutionStage", response.body().getData().getEvolutionStage());
                    edit.apply();
                    callback.onSuccess();
                } else {
                    callback.onError("유저 정보를 가져오는데 실패했습니다.");
                }
            }

            @Override
            public void onFailure(Call<ApiResponseDTO<UserInfoResponseDTO>> call, Throwable t) {
                callback.onError("서버 에러 발생");
            }
        });
    }

}
