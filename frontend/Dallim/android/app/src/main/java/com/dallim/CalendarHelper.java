package com.dallim;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

public class CalendarHelper {

    public static String getCurrentMonthText() {
        Calendar todayCal = Calendar.getInstance(Locale.KOREA);
        int currentMonth = todayCal.get(Calendar.MONTH);
        return (currentMonth + 1) + "월";
    }

    public static void setupCalendarDisplay(Context context, LinearLayout linearLayout) {
        Log.d("DDDDDDDDDD", "setupCalendarDisplay");
        // 오늘의 날짜 정보 가져오기
        Calendar todayCal = Calendar.getInstance(Locale.KOREA);
        int currentYear = todayCal.get(Calendar.YEAR);
        int currentMonth = todayCal.get(Calendar.MONTH);

        // 이번달 1일의 요일을 구함
        todayCal.set(Calendar.DAY_OF_MONTH, 1);
        int dayOfWeek = todayCal.get(Calendar.DAY_OF_WEEK);

        Log.d("DDDDDDDDDD", "setupCalendarDisplay dayOfWeek "+dayOfWeek);
        String[] days = {"일", "월", "화", "수", "목", "금", "토"};
        LinearLayout firstWeekLayout = (LinearLayout) linearLayout.getChildAt(0);

        Log.d("DDDDDDDDDD", "setupCalendarDisplay  days.length "+days.length);
        for (int i = 0; i < days.length; i++) {
            Log.d("DDDDDDDDDD", "setupCalendarDisplay days[i]  "+days[i]);
            TextView dayTextView = (TextView) firstWeekLayout.getChildAt(i);
            Log.d("DDDDDDDDDD", "setupCalendarDisplay days[i]  "+days[i]);
            dayTextView.setText(days[i]);
            Log.d("DDDDDDDDDD", "setupCalendarDisplay days[i]  "+days[i]);
        }

        // 이번 달의 일수만큼 TextView에 날짜 추가
        int daysInMonth = todayCal.getActualMaximum(Calendar.DAY_OF_MONTH);
        int dayCounter = 1;
        boolean isDateSettingStarted = false;

        Log.d("DDDDDDDDDD", "setupCalendarDisplay  linearLayout.getChildCount() "+linearLayout.getChildCount());
        for (int i = 1; i < linearLayout.getChildCount(); i++) {
            LinearLayout weekLayout = (LinearLayout) linearLayout.getChildAt(i);

            Log.d("DDDDDDDDDD", "setupCalendarDisplay  weekLayout.getChildCount() "+weekLayout.getChildCount());
            for (int j = 0; j < weekLayout.getChildCount(); j++) {
                if (dayCounter > daysInMonth) break;

                // 2주차의 시작 TextView의 인덱스를 조정
                if (!isDateSettingStarted) {
                    j = dayOfWeek - 1;
                    isDateSettingStarted = true;
                }

                TextView dayView = (TextView) weekLayout.getChildAt(j);
                dayView.setText(String.valueOf(dayCounter));

                Log.d("DDDDDDDDDD", "setupCalendarDisplay  String.valueOf(dayCounter) "+String.valueOf(dayCounter));
                dayCounter++;
            }
        }
    }
}
