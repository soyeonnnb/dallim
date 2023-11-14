package com.dallim.adapter;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dallim.R;
import com.dallim.activity.LoadingActivity;
import com.dallim.model.RunningMate;
import com.dallim.service.RunningService;
import com.dallim.util.Conversion;
import com.dallim.util.PreferencesUtil;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class RunningMateDataAdapter extends RecyclerView.Adapter<RunningMateDataAdapter.ViewHolder> {

    private List<RunningMate> runningMateList;
    private Conversion conversion = new Conversion();
    private static SharedPreferences prefs;
    private static Activity activity;

    public RunningMateDataAdapter(Context context, List<RunningMate> runningMateList, Activity activity) {
        this.runningMateList = runningMateList;
        this.activity = activity;
        prefs = PreferencesUtil.getEncryptedSharedPreferences(context);
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_running_mate_data, parent, false);
        return new ViewHolder(view, activity);
    }

    @Override
    public void onBindViewHolder(@NonNull RunningMateDataAdapter.ViewHolder holder, int position) {
        RunningMate runningMate = runningMateList.get(position);
        holder.currentRunningMate = runningMate;

        holder.formattedDate.setText(formatDate(runningMate.getCreatedAt()));
        
        holder.time.setText(convertTime((long) runningMate.getTotalTime()));

        // 상대방이 달린 캐릭터
        int evolutionStage = runningMate.getEvolutionStage();
        int characterIndex = runningMate.getCharacterIndex();
        if (evolutionStage == 0){
            if(characterIndex == 0){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.rabbitegg_background_black);
            }else if(characterIndex == 1){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.penguinegg_background_black);
            }else if(characterIndex == 2){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.pandaegg_background_black);
            }else if(characterIndex == 3){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.chickegg_background_black);
            }
        } else {
            if(characterIndex == 0){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.rabbit_background_black);
            }else if(characterIndex == 1){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.penguin_background_black);
            }else if(characterIndex == 2){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.panda_background_black);
            }else if(characterIndex == 3){
                holder.runningMateRecordCharacter.setBackgroundResource(R.drawable.chick_background_black);
            }
        }

        // 상대방이 달린 거리
        double totalDistance = conversion.mToKM(runningMate.getTotalDistance());
        String distanceText = String.valueOf(totalDistance + " km");
        SpannableString spannableDistance = new SpannableString(distanceText);
        int indexOfDISTANCE = distanceText.indexOf("km");
        if (indexOfDISTANCE != -1) {
            spannableDistance.setSpan(new RelativeSizeSpan(0.70f), indexOfDISTANCE, indexOfDISTANCE + 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.distance.setText(spannableDistance);

        // 상대방이 달린 페이스
        double averagePace = runningMate.getAveragePace();
        Map<String, Integer> result = conversion.sToPace(averagePace);
        Integer minutes = result.get("minutes");
        Integer seconds = result.get("seconds");
        String speedText = String.valueOf(minutes + "’" + seconds + "”");
        SpannableString spannableSpeed = new SpannableString(speedText);
        holder.speed.setText(spannableSpeed);

        holder.nickname.setText(runningMate.getNickName());
    }

    @Override
    public int getItemCount() {
        return runningMateList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView formattedDate, distance, speed, nickname, time;
        public LinearLayout runningMateRecordCharacter;
        public RunningMate currentRunningMate;
        public Activity activity;

        public ViewHolder(@NonNull View itemView, Activity activity) {
            super(itemView);
            this.activity = activity;
            formattedDate = itemView.findViewById(R.id.formatted_date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            nickname = itemView.findViewById(R.id.nickname);
            time = itemView.findViewById(R.id.time);
            runningMateRecordCharacter = itemView.findViewById(R.id.running_mate_record_character);

            // 러닝메이트 선택
            LinearLayout viewById = itemView.findViewById(R.id.running_mate_record_character);
            viewById.setOnClickListener(v -> {
                SharedPreferences.Editor edit = prefs.edit();
                // 이제 activity를 사용하여 LayoutInflater 얻기
                LayoutInflater inflater1 = activity.getLayoutInflater();
                View dialogView = inflater1.inflate(R.layout.modal, null);

                TextView text = dialogView.findViewById(R.id.text_view);
                text.setText("함께 달리기\n시작하시겠습니까?");

                Button cancel = dialogView.findViewById(R.id.cancel);
                Button finish = dialogView.findViewById(R.id.finish);
                finish.setText("시작");

                AlertDialog.Builder builder = new AlertDialog.Builder(activity);
                builder.setView(dialogView);

                AlertDialog dialog = builder.create();

                if (dialog.getWindow() != null) {
                    dialog.getWindow().setBackgroundDrawable(new ColorDrawable(0xD0000000));
                }
                dialog.show();

                cancel.setOnClickListener(b ->{
                    dialog.dismiss();
                });

                finish.setOnClickListener(b ->{
                    Intent intent = new Intent(activity, LoadingActivity.class);
                    intent.putExtra("running_record_id", currentRunningMate.getRunningRecordId());

                    Log.e("상대 진화", String.valueOf(currentRunningMate.getEvolutionStage()));
                    Log.e("상대 캐릭터", String.valueOf(currentRunningMate.getCharacterIndex()));
                    // 상대방 캐릭터 저장
                    edit.putInt("mate_evolution_stage", currentRunningMate.getEvolutionStage());
                    edit.putInt("mate_character_index", currentRunningMate.getCharacterIndex());
                    edit.apply();
                    activity.startActivity(intent);
                    dialog.dismiss();
                });
            });
        }
    }

    public void setData(List<RunningMate> newData) {
        this.runningMateList = newData;
    }

    // ms를 분:초로 변환해주는 컨버터(ex 00:00)
    public SpannableString convertTime(Long time){
        int minutes = (int) (time / 60);
        int seconds = (int) (time % 60);

        String timeStr = String.format("%02d분 %02d초", minutes, seconds);
        SpannableString spannableString = new SpannableString(timeStr);

        // "분"과 "초"의 위치를 찾습니다.
        int indexOfMinute = timeStr.indexOf("분");
        int indexOfSecond = timeStr.indexOf("초");

        // "분"과 "초"에 대해 RelativeSizeSpan을 적용하여 텍스트 크기를 줄입니다.
        if(indexOfMinute != -1) {
            spannableString.setSpan(new RelativeSizeSpan(0.60f), indexOfMinute, indexOfMinute+1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        if(indexOfSecond != -1) {
            spannableString.setSpan(new RelativeSizeSpan(0.60f), indexOfSecond, indexOfSecond+1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }

        return spannableString;
    }

    public String formatDate(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM월 dd일 (E)", Locale.KOREAN);
        return date.format(formatter);
    }
}
