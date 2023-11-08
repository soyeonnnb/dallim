package com.dallim;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class TokenModule extends ReactContextBaseJavaModule {
    public TokenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TokenModule";
    }

    @ReactMethod
    public void setToken(String token) {
        Log.d("DDDDDDDDDD", "TokenModule - setToken");
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences("dallimPreference", Context.MODE_PRIVATE);
        Log.d("DDDDDDDDDD", "TokenModule - setToken - dallimPreference");
        sharedPreferences.edit().putString("AccessToken", token).apply();
        Log.d("DDDDDDDDDD", "TokenModule - setToken - AccessToken"+token);
    }

    @ReactMethod
    public void getToken(Promise promise) {
        Log.d("DDDDDDDDDD", "TokenModule - getToken");
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences("dallimPreference", Context.MODE_PRIVATE);
        Log.d("DDDDDDDDDD", "TokenModule - getToken - dallimPreference");
       String token = sharedPreferences.getString("AccessToken", null);
        Log.d("DDDDDDDDDD", "TokenModule - getToken - AccessToken");
        if (token != null) {
            Log.d("DDDDDDDDDD", "TokenModule - getToken -  promise.resolve(token)");
            promise.resolve(token);
        } else {
            Log.d("DDDDDDDDDD", "TokenModule - getToken -   promise.reject");
            promise.reject("TOKEN_NOT_FOUND", new Throwable("Token not found"));
        }
    }
}
