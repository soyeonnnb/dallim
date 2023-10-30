package com.runapp.adapter;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;
import com.runapp.fragment.RunningAniFragment;
import com.runapp.fragment.RunningStateFragment;
import java.util.ArrayList;
import java.util.List;

/*
* ViewPager2에서 표시될 프래그먼트를 관리해준다.
* 우리 서비스는 RunningActivity에서 2개의 프래그먼트를 사용한다.
*/
public class ViewPagerAdapter extends FragmentStateAdapter {

    private final List<Fragment> fragmentList;

    // Activity에 보여줄 프래그먼트를 리스트에 정의해 놓는다.
    public ViewPagerAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
        fragmentList = new ArrayList<>();
        fragmentList.add(new RunningStateFragment());
        fragmentList.add(new RunningAniFragment());
    }

    // 뷰 페이저가 보여줄 전체 페이지의 수를 반환
    @Override
    public int getItemCount() {
        return fragmentList.size();
    }

    // 주어진 위치에 해당하는 프래그먼트를 반환한다. 0은 State, 1은 Ani
    @NonNull
    @Override
    public Fragment createFragment(int position) {
        return fragmentList.get(position);
    }

}

