package com.dallim.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.SweepGradient;
import android.util.AttributeSet;
import android.view.View;

import androidx.annotation.Nullable;

public class CountdownTimerView extends View {
    private final Paint paint;
    private final RectF rectF;
    private float angle;

    public CountdownTimerView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        int strokeWidth = 10; // 원하는 두께로 설정할 수 있습니다.

        // 페인트 설정
        paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(strokeWidth);
        // 원하는 색상으로 설정할 수 있습니다.

        // 원의 테두리를 위한 사각형 만들기
        rectF = new RectF();

        // 각도 초기화
        angle = 360;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        // 그라데이션에 사용할 색상 배열입니다. 시작 색상과 끝 색상을 같게 하여 그라데이션이 부드럽게 이어지도록 합니다.
        int[] colors = {
                getResources().getColor(android.R.color.holo_blue_light),
                getResources().getColor(android.R.color.holo_purple),
                getResources().getColor(android.R.color.holo_orange_light),
                getResources().getColor(android.R.color.holo_blue_light) // 시작 색상을 다시 추가합니다.
        };

        // 각 색상이 위치할 곳을 지정합니다. 값은 0과 1 사이여야 하며, 각도에 해당하는 위치입니다.
        float[] positions = {
                0f, // 0도
                0.33f, // 120도
                0.67f, // 240도
                1f // 360도, 즉 0도로 다시 돌아옴
        };

        // 그라데이션 객체를 생성합니다.
        SweepGradient gradient = new SweepGradient(rectF.centerX(), rectF.centerY(), colors, positions);

        paint.setShader(gradient); // Shader 설정

        // 원을 그립니다. 여기서는 -90도에서 시작하여 시계 반대 방향으로 그립니다.
        canvas.drawArc(rectF, -90, angle, false, paint);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        // 뷰의 너비와 높이를 기반으로 RectF 경계 설정
        int strokeWidth = (int) paint.getStrokeWidth();
        rectF.set(strokeWidth / 2, strokeWidth / 2, w - strokeWidth / 2, h - strokeWidth / 2);
    }

    public void setColor(int color) {
        paint.setColor(color);
    }

    public void setAngle(float angle) {
        this.angle = angle;
    }
}
