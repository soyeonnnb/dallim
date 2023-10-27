package com.runapp.util;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;

public class NetworkUtil {
    private ConnectivityManager cm;

    public NetworkUtil(Context context){
        cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
    }

    public boolean getNetworkConnected() {
        Network activeNetwork = cm.getActiveNetwork();
        NetworkCapabilities caps = cm.getNetworkCapabilities(activeNetwork);
        return caps != null;
    }
}
