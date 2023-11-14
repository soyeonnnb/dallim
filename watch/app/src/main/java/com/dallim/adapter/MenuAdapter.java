package com.dallim.adapter;

import android.content.Context;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;

import com.dallim.R;
import com.dallim.model.MenuItem;
import com.dallim.util.PreferencesUtil;

import java.util.List;

public class MenuAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<MenuItem> menuItems;
    private OnItemClickListener listener;
    private static final int TYPE_LOGO = 0;
    private static final int TYPE_USER_INFO = 1;
    private static final int TYPE_MENU_ITEM = 2;
    private SharedPreferences prefs;

    public MenuAdapter(Context context, List<MenuItem> menuItems) {
        this.menuItems = menuItems;
        prefs = PreferencesUtil.getEncryptedSharedPreferences(context);
    }

    public interface OnItemClickListener {
        void onItemClick(int position);
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        this.listener = listener;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == TYPE_LOGO) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.menu_logo, parent, false);
            return new LogoViewHolder(view);
        } else if(viewType == TYPE_USER_INFO){
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.user_info, parent, false);
            return new UserInfoViewHolder(view);
        }else {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_select_menu, parent, false);
            return new MenuItemViewHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if (getItemViewType(position) == TYPE_LOGO) {
            // 헤더 뷰 설정
            LogoViewHolder logoViewHolder = (LogoViewHolder) holder;
            // 여기에 헤더(유저 정보) 설정 코드 작성
        } else if(getItemViewType(position) == TYPE_USER_INFO) {

            String nickname = prefs.getString("nickname", "");
            System.out.println(nickname);
            Long planetIndex = prefs.getLong("planetIndex", 0L);
            int level = prefs.getInt("level", 0);
            Long characterIndex = prefs.getLong("characterIndex", 0L);
            int evolutionStage = prefs.getInt("evolutionStage", 0);
            int userExp = prefs.getInt("userExp", 0);

            TextView userLevelTv = holder.itemView.findViewById(R.id.user_level);
            TextView nicknameTv = holder.itemView.findViewById(R.id.user_nickname);
            ImageView userCharImgIv = holder.itemView.findViewById(R.id.user_char_img);
            ImageView userPlanetImgIv = holder.itemView.findViewById(R.id.user_planet_img);
            TextView userExpPercentTv = holder.itemView.findViewById(R.id.user_exp_percent);
            ProgressBar userExpBarPb = holder.itemView.findViewById(R.id.user_exp_bar);

            userLevelTv.setText("Level " + String.valueOf(level));
            nicknameTv.setText(nickname);
            userExpPercentTv.setText(String.valueOf(userExp)+"%");
            // 진화 전
            if (evolutionStage == 0){
                if (characterIndex == 0){
                    userCharImgIv.setImageResource(R.drawable.rabbitegg);
                }else if ( characterIndex == 1){
                    userCharImgIv.setImageResource(R.drawable.penguinegg);
                }else if ( characterIndex == 2){
                    userCharImgIv.setImageResource(R.drawable.pandaegg);
                }else if ( characterIndex == 3){
                    userCharImgIv.setImageResource(R.drawable.chickegg);
                }
            }else{
                if (characterIndex == 0){
                    userCharImgIv.setImageResource(R.drawable.rabbit);
                }else if ( characterIndex == 1){
                    userCharImgIv.setImageResource(R.drawable.penguin);
                }else if ( characterIndex == 2){
                    userCharImgIv.setImageResource(R.drawable.panda);
                }else if ( characterIndex == 3){
                    userCharImgIv.setImageResource(R.drawable.chick);
                }
            }

            if (planetIndex == 0) {
                userPlanetImgIv.setImageResource(R.drawable.profile_back_black);
            }else if (planetIndex == 1){
                userPlanetImgIv.setImageResource(R.drawable.profile_back_yellow);
            }else if (planetIndex == 2){
                userPlanetImgIv.setImageResource(R.drawable.profile_back_blue);
            }else if (planetIndex == 3){
                userPlanetImgIv.setImageResource(R.drawable.profile_back_purple);
            }else if (planetIndex == 4){
                userPlanetImgIv.setImageResource(R.drawable.profile_back_red);
            }

            userExpBarPb.setProgress(userExp);

        }else{
            // 메뉴 아이템 설정
            MenuItemViewHolder menuItemHolder = (MenuItemViewHolder) holder;
            MenuItem menuItem = menuItems.get(position - 2); // 헤더 위치 조정
            menuItemHolder.menuIcon.setImageResource(menuItem.getIcon());
            menuItemHolder.menuTitle.setText(menuItem.getTitle());
        }
    }

    @Override
    public int getItemCount() {
        return menuItems.size()+2;
    }

    @Override
    public int getItemViewType(int position) {
        if (position == 0) {
            // 첫 번째 항목은 헤더로 처리
            return TYPE_LOGO;
        } else if(position == 1){
            // 두 번째 항복은 유저 정보
            return TYPE_USER_INFO;
        }else {
            // 그 외는 메뉴 아이템으로 처리
            return TYPE_MENU_ITEM;
        }
    }

    // 로고 뷰 홀더
    class LogoViewHolder extends RecyclerView.ViewHolder {
        // 헤더 뷰 구성요소 정의
        public LogoViewHolder(View itemView) {
            super(itemView);
            // 헤더 뷰 초기화
        }
    }

    // 유저정보 뷰 홀더
    class UserInfoViewHolder extends RecyclerView.ViewHolder {
        public UserInfoViewHolder(View itemView) {
            super(itemView);
        }
    }

    public class MenuItemViewHolder  extends RecyclerView.ViewHolder {
        ImageView menuIcon;
        TextView menuTitle;

        public MenuItemViewHolder (View itemView) {
            super(itemView);
            menuIcon = itemView.findViewById(R.id.menu_icon);
            menuTitle = itemView.findViewById(R.id.menu_item);

            // 각 항목에 대한 클릭 리스너 설정
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int position = getAdapterPosition();
                    if (position != RecyclerView.NO_POSITION && listener != null) {
                        listener.onItemClick(position);
                    }
                }
            });
        }
    }
}
