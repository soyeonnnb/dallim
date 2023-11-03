package com.runapp.util;

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
        // 여기서 알람 노티피케이션 또는 대화 상자를 표시할 수 있습니다.
        // 예를 들어 Toast 메시지를 사용할 수 있습니다:
        Toast.makeText(context, "인터넷 연결이 없습니다!", Toast.LENGTH_LONG).show();

        // 여기에 기기를 꺼버리는 코드를 추가할 수 없습니다.
        // 안드로이드 보안 정책상 일반 앱은 기기를 직접 끄는 것을 허용하지 않습니다.
    }
}
