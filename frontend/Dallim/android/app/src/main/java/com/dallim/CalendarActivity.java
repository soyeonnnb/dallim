package com.dallim;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class CalendarActivity extends Activity {

    /**
     * 연/월 텍스트뷰
     */
    private TextView tvDate;

    /**
     * 일 저장 할 리스트
     */
    private ArrayList<String> dayList;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d("DDDDDDDDDD", "CalendarActivity - onCreate");
        super.onCreate(savedInstanceState);

        setContentView(R.layout.widget);

        // Views 초기화
        tvDate = (TextView) findViewById(R.id.tv_date);
        LinearLayout linearLayout = (LinearLayout) findViewById(R.id.gridview);

        // 오늘의 날짜 정보 가져오기
        Calendar todayCal = Calendar.getInstance(Locale.KOREA);
        int currentYear = todayCal.get(Calendar.YEAR);
        int currentMonth = todayCal.get(Calendar.MONTH);

        // 현재 날짜 텍스트뷰에 뿌려줌
        tvDate.setText(currentYear + "/" + (currentMonth + 1));

        Log.d("DDDDDDDDDD", "CalendarActivity - onCreate - ChildCount" + linearLayout.getChildCount());
        // Gridview 요일 표시를 위한 로직

        // 이번달 1일의 요일을 구함
        todayCal.set(Calendar.DAY_OF_MONTH, 1);
        int dayOfWeek = todayCal.get(Calendar.DAY_OF_WEEK);


        String[] days = {"일", "월", "화", "수", "목", "금", "토"};
        LinearLayout firstWeekLayout = (LinearLayout) linearLayout.getChildAt(0);
        for (int i = 0; i < days.length; i++) {
            TextView dayTextView = (TextView) firstWeekLayout.getChildAt(i);
            dayTextView.setText(days[i]);
        }



        // 이번 달의 일수만큼 TextView에 날짜 추가
        int daysInMonth = todayCal.getActualMaximum(Calendar.DAY_OF_MONTH);
        int dayCounter = 1;
        boolean isDateSettingStarted = false;

        for (int i = 1; i < linearLayout.getChildCount(); i++) {
            LinearLayout weekLayout = (LinearLayout) linearLayout.getChildAt(i);
            Log.d("DDDDDDDDDD", "CalendarActivity - onCreate -childView" +weekLayout.toString());

//            if (childView instanceof LinearLayout) {
//                LinearLayout weekLayout = (LinearLayout) childView;
                Log.d("DDDDDDDDDD", "CalendarActivity - onCreate -weekLayout" +weekLayout.getChildCount());
                for (int j = 0; j < weekLayout.getChildCount(); j++) {
                    if (dayCounter > daysInMonth) break;


//                    // 1주차는 건너뜀 (요일이므로)
//                    if (i == 0) continue;

                    // 2주차의 시작 TextView의 인덱스를 조정
                    if (!isDateSettingStarted) {
                        j = dayOfWeek - 1;
                        isDateSettingStarted = true;
                    }

                    TextView dayView = (TextView) weekLayout.getChildAt(j);
                    dayView.setText(String.valueOf(dayCounter));
                    Log.d("DDDDDDDDDD", "CalendarActivity - onCreate -dayCounter" +String.valueOf(dayCounter));
                    Log.d("DDDDDDDDDD", "CalendarActivity - onCreate -dayCounter" +dayView.toString()+" "+dayView.getId());
                    dayCounter++;
                }
//            }
        }

}}