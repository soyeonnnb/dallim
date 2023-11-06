package com.dallim;


import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RemoteViews;
import android.widget.TextView;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * Implementation of App Widget functionality.
 */
public class CalendarWidget extends AppWidgetProvider {

    public static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
    public static final String DATA_FETCH_ACTION = "com.dallim.DATA_FETCH_ACTION";
    public static final String EXTRA_ITEM = "com.dallim.EXTRA_ITEM";
    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId, String[] attendances) {
        Log.d("DDDDDDDDDD", "Widget - updateAppWidget");

        // RemoteViews를 사용하여 위젯 UI 업데이트
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.calendar_widget);

// 출석 데이터 리스트 예시
         attendances[0]="2023-11-01";
        attendances[1]="2023-11-03";
        attendances[2]="2023-11-06";




        // 오늘의 날짜 정보 가져오기
        // 날짜 (월) 업데이트
            Calendar todayCal = Calendar.getInstance(Locale.KOREA);
            int currentMonth = todayCal.get(Calendar.MONTH);

        String currentMonthText = (currentMonth + 1) + "월";
        views.setTextViewText(R.id.tv_date, currentMonthText);
        Log.d("DDDDDDDDDD", "updateAppWidget"+currentMonthText);

        String [] calendarArray = new String[35];

        // 이번달 1일의 요일을 구함
        todayCal.set(Calendar.DAY_OF_MONTH, 1);
        int dayOfWeek = todayCal.get(Calendar.DAY_OF_WEEK);

        int daysInMonth = todayCal.getActualMaximum(Calendar.DAY_OF_MONTH);

        for(int i=1;i<=daysInMonth;i++){
            calendarArray[i+dayOfWeek-2]=i+"";
        }
        Log.d("DDDDDDDDDD", "updateAppWidget"+" "+dayOfWeek+" "+daysInMonth);
        Log.d("DDDDDDDDDD", "updateAppWidget"+" calArr"+ Arrays.toString(calendarArray));

        // 달력 날짜를 TextView에 설정하는 로직 개선
        for (int i = 0; i < calendarArray.length; i++) {
            String dayText = calendarArray[i]; // 날짜 텍스트

            // 배열의 값이 null이 아닌 경우에만 UI 업데이트
            if (dayText != null) {
                int textViewId = context.getResources().getIdentifier("cal" + (i + 1), "id", context.getPackageName());
                views.setTextViewText(textViewId, dayText);
            }

            if (dayText != null && Integer.parseInt(dayText) == todayCal.get(Calendar.DAY_OF_MONTH)) {
                int textViewId = context.getResources().getIdentifier("cal" + (i + 1), "id", context.getPackageName());
                Log.d("DDDDDDDDDD", "updateAppWidget - todayDate: " + textViewId);
                views.setInt(textViewId, "setBackgroundResource", R.drawable.border);
            }
        }

        // 출석 데이터를 순회하며 처리
        for (String attendanceDate : attendances) {
            try {
                // 출석 날짜 파싱
                Date date = formatter.parse(attendanceDate);
                todayCal.setTime(date);

                // 해당하는 날짜의 일(day) 가져오기
                int dayOfMonth = todayCal.get(Calendar.DAY_OF_MONTH);
                Log.d("DDDDDDDDDD", "updateAppWidget"+" dayOfMonth"+dayOfMonth);

                // 해당하는 TextView ID를 구성하기 - 예시: R.id.cal1, R.id.cal2, ...
                int textViewId = context.getResources().getIdentifier("cal" + (dayOfMonth+dayOfWeek-1), "id", context.getPackageName());

                // 체크 이미지 ID 구성하기 - 예시: R.id.check_image_view_1, R.id.check_image_view_2, ...
                int checkImageViewId = context.getResources().getIdentifier("check_image_view_" + (dayOfMonth+dayOfWeek-1), "id", context.getPackageName());

                // 출석 표시
                views.setViewVisibility(checkImageViewId, View.VISIBLE);
                views.setTextColor(textViewId, Color.parseColor("#FF000000")); // 출석한 날짜의 글자 색 변경


            } catch (ParseException e) {
                e.printStackTrace();
                // 날짜 파싱에 실패한 경우 로그 처리
            }
        }


        Intent intent = new Intent(context, MainActivity.class); // 앱의 메인 액티비티로 이동

// FLAG_ACTIVITY_NEW_TASK는 새로운 태스크에서 액티비티를 시작하려 할 때 필요합니다.
// 특히 위젯과 같은 백그라운드 컴포넌트에서 액티비티를 시작할 때 사용됩니다.
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        Log.d("DDDDDDDDDD", "Widget - intent1 end");

        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        Log.d("DDDDDDDDDD", "Widget - getActivity end");
        views.setOnClickPendingIntent(R.id.calendar_button, pendingIntent);

// 위젯 매니저를 통해 위젯 업데이트
        appWidgetManager.updateAppWidget(appWidgetId, views);

    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        // 데이터 가져오기 액션을 체크
        if (DATA_FETCH_ACTION.equals(intent.getAction())) {
            // 인텐트에서 데이터 가져오기
            String[] attendances = intent.getStringArrayExtra(EXTRA_ITEM);

            // 모든 위젯 인스턴스 업데이트
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(new ComponentName(context, CalendarWidget.class));
            for (int appWidgetId : appWidgetIds) {
                updateAppWidget(context, appWidgetManager, appWidgetId, attendances);
            }
        }
    }





}
