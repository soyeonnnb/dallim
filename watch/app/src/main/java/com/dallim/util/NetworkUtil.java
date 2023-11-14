package com.dallim.util;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.widget.Toast;

public class NetworkUtil extends BroadcastReceiver {

    @Override
    public void onReceive(final Context context, final Intent intent) {
        if (!isOnline(context)) {
            // 인터넷 연결이 없을 때 사용자에게 알림
            showAlert(context);
        }
    }

    public boolean isOnline(Context context) {
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        // 네트워크 정보가 있고 연결되어 있으면 true를 반환
        return netInfo != null && netInfo.isConnected();
    }

    private void showAlert(Context context) {
        Toast.makeText(context, "인터넷 연결이 없습니다!", Toast.LENGTH_LONG).show();
    }
}
