package com.dallim;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class ScreenOnReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("DDDDDDDDDD", "ScreenOnReceiver - onReceive");

        if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)) {
            Intent i = new Intent(context, CalendarActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 이 플래그를 추가해야 백그라운드에서 액티비티를 시작할 수 있습니다.
            context.startActivity(i);
        }
    }
}
