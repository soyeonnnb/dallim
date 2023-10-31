package com.dallim;


import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.content.SharedPreferences;


import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

/**
 * Implementation of App Widget functionality.
 */
public class  Widget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        Log.d("DDDDDDDDDD", "Widget - updateAppWidget");
        // 현재 날짜를 가져오기
        Calendar calendar = Calendar.getInstance();
        Log.d("DDDDDDDDDD", "Widget "+calendar.toString());

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd", Locale.KOREA);
        Log.d("DDDDDDDDDD", "Widget "+dateFormat.toString());

        String currentDate = dateFormat.format(calendar.getTime());
        Log.d("DDDDDDDDDD", "Widget "+currentDate);

        // RemoteViews를 사용하여 위젯 UI 업데이트
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);
        views.setTextViewText(R.id.tv_date, currentDate);
        Log.d("DDDDDDDDDD", views.toString());

        // CalendarActivity 시작을 위한 Intent 설정
        Intent intent = new Intent(context, CalendarActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.gridview, pendingIntent);

        Log.d("DDDDDDDDDD", intent.toString());

        // 위젯 매니저를 통해 위젯 업데이트
        appWidgetManager.updateAppWidget(appWidgetId, views);
        Log.d("DDDDDDDDDD", appWidgetManager.toString());
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("DDDDDDDDDD", "Widget - onReceive");
        super.onReceive(context, intent);

        if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)||intent.getAction().equals(AppWidgetManager.ACTION_APPWIDGET_UPDATE) ){
            // 화면이 켜질 때 위젯 업데이트 로직
            Log.d("DDDDDDDDDD", "Widget - onReceive - SCREEN");
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, Widget.class));
            onUpdate(context, appWidgetManager, appWidgetIds);
        }

    }


    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        Log.d("DDDDDDDDDD", "Widget - onUpdate");
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            Log.d("DDDDDDDDDD", "Widget - onUpdate - upDate"+appWidgetId);
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }


    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        Log.d("DDDDDDDDDD", "Widget - onEnabled");

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, Widget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);

        // PendingIntent.FLAG_IMMUTABLE 플래그 추가
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        // 여기에서는 1시간마다 업데이트하도록 설정했습니다.
        long interval = 60 ; // 1 hour in milliseconds 1분으로 바꿔봄


        alarmManager.setRepeating
                (AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), interval, pendingIntent);
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        Log.d("DDDDDDDDDD", "Widget - onDisabled");
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, Widget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);

        // PendingIntent.FLAG_IMMUTABLE 플래그 추가
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        alarmManager.cancel(pendingIntent);
    }


}
