package com.dallim.adapter;

import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dallim.R;
import com.dallim.model.RunningData;
import com.dallim.util.Conversion;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class MyRunningDataAdapter extends RecyclerView.Adapter<MyRunningDataAdapter.ViewHolder> {

    private List<RunningData> runningDataList;
    private Conversion conversion = new Conversion();

    public MyRunningDataAdapter(List<RunningData> runningDataList) {
        this.runningDataList = runningDataList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_running_data, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        RunningData runningData = runningDataList.get(position);
        // 데이터를 ViewHolder의 뷰에 바인딩합니다.

        holder.formattedDate.setText(String.valueOf(formatDate(runningData.getDate())));

        Log.e("거리", String.valueOf(runningData.getTotalDistance()));

        // 총 거리
        double totalDistance = conversion.mToKM(runningData.getTotalDistance());
        Log.e("km거리", String.valueOf(totalDistance));
        String distanceText = String.valueOf(totalDistance + " km");
        SpannableString spannableDistance = new SpannableString(distanceText);
        holder.distance.setText(spannableDistance);

        // 페이스
        double averagePace = runningData.getAveragePace();
        Map<String, Integer> result = conversion.sToPace(averagePace);
        Integer minutes = result.get("minutes");
        Integer seconds = result.get("seconds");
        String speedText = String.valueOf(minutes + "' " + seconds + "''");
        SpannableString spannableSpeed = new SpannableString(speedText);
        holder.speed.setText(spannableSpeed);

        // 평균 심박수
        String heartRateText = String.valueOf(runningData.getAverageHeartRate()) + " BPM";
        SpannableString spannableHeartRate = new SpannableString(heartRateText);
        int indexOfBPM = heartRateText.indexOf("BPM");
        if (indexOfBPM != -1) {
            spannableHeartRate.setSpan(new RelativeSizeSpan(1.0f), indexOfBPM, indexOfBPM + 3, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.heartRate.setText(spannableHeartRate);

        holder.time.setText(convertTime(runningData.getTotalTime()));
        Long characterId = runningData.getCharacterId();
        int evolutionStage = runningData.getEvolutionStage();
        if (evolutionStage == 0){
            if(characterId == 0){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.rabbitegg_background_black);
            }else if(characterId == 1){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.penguinegg_background_black);
            }else if(characterId == 2){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.pandaegg_background_black);
            }else if(characterId == 3){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.chickegg_background_black);
            }
        }else{
            if(characterId == 0){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.rabbit_background_black);
            }else if(characterId == 1){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.penguin_background_black);
            }else if(characterId == 2){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.panda_background_black);
            }else if(characterId == 3){
                holder.myRecordCharacter.setBackgroundResource(R.drawable.chick_background_black);
            }
        }

    }

    @Override
    public int getItemCount() {
        return runningDataList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView formattedDate, distance, speed, heartRate, time;
        public LinearLayout myRecordCharacter;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            formattedDate = itemView.findViewById(R.id.formatted_date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            heartRate = itemView.findViewById(R.id.heart_rate);
            time = itemView.findViewById(R.id.time);
            myRecordCharacter = itemView.findViewById(R.id.my_record_character);
        }
    }

    public void setData(List<RunningData> newData) {
        this.runningDataList = newData;
    }

    // ms를 분:초로 변환해주는 컨버터(ex 00:00)
    public SpannableString convertTime(Long time) {
        int hours = (int) (time / 3600);
        int minutes = (int) ((time % 3600) / 60);
        int seconds = (int) (time % 60);

        String timeStr = String.format("%02d:%02d:%02d", hours, minutes, seconds);
        return new SpannableString(timeStr);
    }


    public String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일", Locale.KOREAN);
        return sdf.format(date);
    }
}

