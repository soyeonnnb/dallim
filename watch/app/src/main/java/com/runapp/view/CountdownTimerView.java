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
        rectF = new RectF(strokeWidth, strokeWidth, 305 + strokeWidth, 305 + strokeWidth); // 원하는 크기로 조정할 수 있습니다.

        // 각도 초기화
        angle = 360;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawArc(rectF, -90, angle, false, paint);
    }

    public void setColor(int color){
        paint.setColor(color);
    }

    public void setAngle(float angle) {
        this.angle = angle;
    }
}
