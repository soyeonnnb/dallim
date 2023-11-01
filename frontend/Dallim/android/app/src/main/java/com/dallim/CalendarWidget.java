package com.dallim;


import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RemoteViews;
import android.widget.TextView;


import java.util.Arrays;
import java.util.Calendar;
import java.util.Locale;

/**
 * Implementation of App Widget functionality.
 */
public class CalendarWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        Log.d("DDDDDDDDDD", "Widget - updateAppWidget");

        // RemoteViews를 사용하여 위젯 UI 업데이트
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.calendar_widget);

        // 날짜 (월) 업데이트
        String currentMonthText = CalendarHelper.getCurrentMonthText();
        views.setTextViewText(R.id.tv_date, currentMonthText);
        Log.d("DDDDDDDDDD", "updateAppWidget"+currentMonthText);

        String [] calendarArray = new String[42];
        calendarArray[0]="일";
        calendarArray[1]="월";
        calendarArray[2]="화";
        calendarArray[3]="수";
        calendarArray[4]="목";
        calendarArray[5]="금";
        calendarArray[6]="토";



//        CalendarHelper.setupCalendarDisplay(context, linearLayout);


        // 오늘의 날짜 정보 가져오기
        Calendar todayCal = Calendar.getInstance(Locale.KOREA);
        int currentYear = todayCal.get(Calendar.YEAR);
        int currentMonth = todayCal.get(Calendar.MONTH);

        // 이번달 1일의 요일을 구함
        todayCal.set(Calendar.DAY_OF_MONTH, 1);
        int dayOfWeek = todayCal.get(Calendar.DAY_OF_WEEK);

        int daysInMonth = todayCal.getActualMaximum(Calendar.DAY_OF_MONTH);

        for(int i=1;i<=daysInMonth;i++){
            calendarArray[i+dayOfWeek+6]=i+"";
        }
        Log.d("DDDDDDDDDD", "updateAppWidget"+" "+dayOfWeek+" "+daysInMonth);
        Log.d("DDDDDDDDDD", "updateAppWidget"+" calArr"+ Arrays.toString(calendarArray));

        views.setTextViewText(R.id.cal1, calendarArray[0]);
        views.setTextViewText(R.id.cal2, calendarArray[1]);
        views.setTextViewText(R.id.cal3, calendarArray[2]);
        views.setTextViewText(R.id.cal4, calendarArray[3]);
        views.setTextViewText(R.id.cal5, calendarArray[4]);
        views.setTextViewText(R.id.cal6, calendarArray[5]);
        views.setTextViewText(R.id.cal7, calendarArray[6]);
        views.setTextViewText(R.id.cal8, calendarArray[7]);
        views.setTextViewText(R.id.cal9, calendarArray[8]);
        views.setTextViewText(R.id.cal10, calendarArray[9]);
        views.setTextViewText(R.id.cal11, calendarArray[10]);
        views.setTextViewText(R.id.cal12, calendarArray[11]);
        views.setTextViewText(R.id.cal13, calendarArray[12]);
        views.setTextViewText(R.id.cal14, calendarArray[13]);
        views.setTextViewText(R.id.cal15, calendarArray[14]);
        views.setTextViewText(R.id.cal16, calendarArray[15]);
        views.setTextViewText(R.id.cal17, calendarArray[16]);
        views.setTextViewText(R.id.cal18, calendarArray[17]);
        views.setTextViewText(R.id.cal19, calendarArray[18]);
        views.setTextViewText(R.id.cal20, calendarArray[19]);
        views.setTextViewText(R.id.cal21, calendarArray[20]);
        views.setTextViewText(R.id.cal22, calendarArray[21]);
        views.setTextViewText(R.id.cal23, calendarArray[22]);
        views.setTextViewText(R.id.cal24, calendarArray[23]);
        views.setTextViewText(R.id.cal25, calendarArray[24]);
        views.setTextViewText(R.id.cal26, calendarArray[25]);
        views.setTextViewText(R.id.cal27, calendarArray[26]);
        views.setTextViewText(R.id.cal28, calendarArray[27]);
        views.setTextViewText(R.id.cal29, calendarArray[28]);
        views.setTextViewText(R.id.cal30, calendarArray[29]);
        views.setTextViewText(R.id.cal31, calendarArray[30]);
        views.setTextViewText(R.id.cal32, calendarArray[31]);
        views.setTextViewText(R.id.cal33, calendarArray[32]);
        views.setTextViewText(R.id.cal34, calendarArray[33]);
        views.setTextViewText(R.id.cal35, calendarArray[34]);
        views.setTextViewText(R.id.cal36, calendarArray[35]);
        views.setTextViewText(R.id.cal37, calendarArray[36]);
        views.setTextViewText(R.id.cal38, calendarArray[37]);
        views.setTextViewText(R.id.cal39, calendarArray[38]);
        views.setTextViewText(R.id.cal40, calendarArray[39]);
        views.setTextViewText(R.id.cal41, calendarArray[40]);
        views.setTextViewText(R.id.cal42, calendarArray[41]);


        Intent intent = new Intent(context, MainActivity.class); // 앱의 메인 액티비티로 이동
        intent.putExtra("route", "Chart"); // 네비게이션 라우트 정보 추가
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        views.setOnClickPendingIntent(R.id.calendar_button, pendingIntent);


        // 위젯 매니저를 통해 위젯 업데이트
        appWidgetManager.updateAppWidget(appWidgetId, views);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("DDDDDDDDDD", "Widget - onReceive");
        super.onReceive(context, intent);

        if (intent.getAction().equals(Intent.ACTION_SCREEN_ON)||intent.getAction().equals(AppWidgetManager.ACTION_APPWIDGET_UPDATE) ){
            // 화면이 켜질 때 위젯 업데이트 로직
            Log.d("DDDDDDDDDD", "Widget - onReceive - SCREEN");
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, CalendarWidget.class));
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
        Intent intent = new Intent(context, CalendarWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);

        // PendingIntent.FLAG_IMMUTABLE 플래그 추가
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);


        long interval = 60*60 ; // 1 hour in milliseconds 1분으로 바꿔봄


        alarmManager.setRepeating
                (AlarmManager.RTC_WAKEUP, System.currentTimeMillis(), interval, pendingIntent);
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        Log.d("DDDDDDDDDD", "Widget - onDisabled");
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, CalendarWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);

        // PendingIntent.FLAG_IMMUTABLE 플래그 추가
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        alarmManager.cancel(pendingIntent);
    }


}
