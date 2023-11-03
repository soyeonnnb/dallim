package com.dallim;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class DirectRunWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

        Log.d("DDDDDDDDDD", "DallimWidget - updateAppWidget");

        // RemoteViews를 사용하여 위젯 UI 업데이트
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.directrun_widget);

        // 기존 위젯 업데이트 코드 (필요에 따라 유지)
        appWidgetManager.updateAppWidget(appWidgetId, views);

        Intent intent = new Intent(context, MainActivity.class); // 앱의 메인 액티비티로 이동

// FLAG_ACTIVITY_NEW_TASK는 새로운 태스크에서 액티비티를 시작하려 할 때 필요합니다.
// 특히 위젯과 같은 백그라운드 컴포넌트에서 액티비티를 시작할 때 사용됩니다.
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Log.d("DDDDDDDDDD", " DirectRunWidget - intent1 end");

        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        Log.d("DDDDDDDDDD", "DirectRunWidget - getActivity end");
        views.setOnClickPendingIntent(R.id.directrun, pendingIntent);

// 위젯 매니저를 통해 위젯 업데이트
        appWidgetManager.updateAppWidget(appWidgetId, views);



    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        Log.d("DDDDDDDDDD", "DallimWidget - onUpdate");
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}