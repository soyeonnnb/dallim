package com.runapp.view;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.ScrollView;

// MyScrollView.java
public class MyScrollView extends ScrollView {

    private OnScrollViewListener mOnScrollViewListener;

    public MyScrollView(Context context) {
        super(context);
    }

    public MyScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MyScrollView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setOnScrollViewListener(OnScrollViewListener listener) {
        this.mOnScrollViewListener = listener;
    }

    @Override
    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        super.onScrollChanged(l, t, oldl, oldt);
        if (mOnScrollViewListener != null) {
            mOnScrollViewListener.onScrollChanged(this, l, t, oldl, oldt);
        }
    }

    public interface OnScrollViewListener {
        void onScrollChanged(ScrollView scrollView, int x, int y, int oldx, int oldy);
    }
}
