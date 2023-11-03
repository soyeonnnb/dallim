package com.runapp.util;

import android.content.Context;
import android.view.View;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

// 내 기록 보기에서 사이드로 가면 화면 작아지게 만드는 메서드
public class CenterZoomLayoutManager extends LinearLayoutManager {

    // 축소될 때 얼마나 축소될 지 결정
    private final float mShrinkAmount = 0.2f;
    // 중앙에서부터 얼마를 떨어지면 축소할지(작을 수록 빨리 축소됨)
    private final float mShrinkDistance = 0.9f;

    public CenterZoomLayoutManager(Context context) {
        super(context);
    }

    @Override
    public int scrollVerticallyBy(int dy, RecyclerView.Recycler recycler, RecyclerView.State state) {
        int scrolled = super.scrollVerticallyBy(dy, recycler, state);

        float midpoint = getHeight() / 2.f;
        float d0 = 0.f;
        float d1 = mShrinkDistance * midpoint;
        float s0 = 1.f;
        float s1 = 1.f - mShrinkAmount;
        for (int i = 0; i < getChildCount(); i++) {
            View child = getChildAt(i);
            float childMidpoint = (getDecoratedBottom(child) + getDecoratedTop(child)) / 2.f;
            float d = Math.min(d1, Math.abs(midpoint - childMidpoint));
            float scale = s0 + (s1 - s0) * (d - d0) / (d1 - d0);
            child.setScaleX(scale);
            child.setScaleY(scale);
        }
        return scrolled;
    }
}
