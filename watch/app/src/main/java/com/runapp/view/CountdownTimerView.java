package com.runapp.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

import androidx.annotation.Nullable;

public class CountdownTimerView extends View {
    private final Paint paint;
    private final RectF rectF;
    private float angle;

    public CountdownTimerView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        int strokeWidth = 14; // 원하는 두께로 설정할 수 있습니다.

        // 페인트 설정
        paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(strokeWidth);
        // 원하는 색상으로 설정할 수 있습니다.
        paint.setColor(context.getResources().getColor(android.R.color.holo_blue_light));

        // 원의 테두리를 위한 사각형 만들기
        rectF = new RectF();

        // 각도 초기화
        angle = 360;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawArc(rectF, -90, angle, false, paint);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        // 뷰의 너비와 높이를 기반으로 RectF 경계 설정
        int strokeWidth = (int) paint.getStrokeWidth();
        rectF.set(strokeWidth, strokeWidth, w - strokeWidth, h - strokeWidth);
    }

    public void setColor(int color){
        paint.setColor(color);
    }

    public void setAngle(float angle) {
        this.angle = angle;
    }
}
