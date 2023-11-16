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
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences("dallimPreference", Context.MODE_PRIVATE);
        sharedPreferences.edit().putString("AccessToken", token).apply();
    }

    @ReactMethod
    public void getToken(Promise promise) {
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences("dallimPreference", Context.MODE_PRIVATE);
       String token = sharedPreferences.getString("AccessToken", null);
        if (token != null) {
             promise.resolve(token);
        } else {
            promise.reject("TOKEN_NOT_FOUND", new Throwable("Token not found"));
        }
    }
}
