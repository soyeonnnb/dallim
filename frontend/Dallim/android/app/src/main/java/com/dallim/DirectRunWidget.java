package com.dallim;

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

import java.util.HashMap;

/**
 * Implementation of App Widget functionality.
 */
public class DirectRunWidget extends AppWidgetProvider {

    public static final String DATA_FETCH_ACTION2 = "com.dallim.DATA_FETCH_ACTION2";
    public static final String EXTRA_ITEM2 = "com.dallim.EXTRA_ITEM2";


    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId, HashMap<String,String> userData ) {

        Log.d("DDDDDDDDDD", "DirectWidget ");

        // RemoteViews를 사용하여 위젯 UI 업데이트
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.directrun_widget);
        Log.d("DDDDDDDDDD", "DirectWidget - userData"+userData);

        int characterIndex =Integer.parseInt(userData.get("characterIndex"));
        int evolutionStage =Integer.parseInt(userData.get("evolutionStage"));
        Log.d("DDDDDDDDDD", "DirectWidget - updateAppWidget"+characterIndex+evolutionStage);
        int viewImageId = context.getResources().getIdentifier("direct_character_"+characterIndex+evolutionStage, "drawable", context.getPackageName());

        int id = R.id.direct_image;
        Log.d("DDDDDDDDDD", "DirectWidget - viewImageId+id"+viewImageId+id);
        views.setImageViewResource(id,viewImageId);
        // 기존 위젯 업데이트 코드 (필요에 따라 유지)
        appWidgetManager.updateAppWidget(appWidgetId, views);


    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        Log.d("DDDDDDDDDD", "DirectWidget - onReceive");
        // 데이터 가져오기 액션을 체크
        if (DATA_FETCH_ACTION2.equals(intent.getAction())) {
            // 인텐트에서 데이터 가져오기

            HashMap<String, String> userData = (HashMap<String, String>) intent.getSerializableExtra(EXTRA_ITEM2);
            Log.d("DDDDDDDDDD", "DirectWidget - userData"+userData);
            // 모든 위젯 인스턴스 업데이트
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, CalendarWidget.class));
            for (int appWidgetId : appWidgetIds) {
                updateAppWidget(context, appWidgetManager, appWidgetId, userData);
            }
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