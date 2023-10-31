package com.runapp.util;

import android.app.Application;
import androidx.lifecycle.ViewModelStore;
import androidx.lifecycle.ViewModelStoreOwner;

public class MyApplication extends Application implements ViewModelStoreOwner {

    private ViewModelStore viewModelStore;

    @Override
    public void onCreate() {
        super.onCreate();
        viewModelStore = new ViewModelStore();
    }

    @Override
    public ViewModelStore getViewModelStore() {
        return viewModelStore;
    }
}
