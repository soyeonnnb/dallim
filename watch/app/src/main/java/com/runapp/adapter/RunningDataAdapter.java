package com.runapp.adapter;

import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.RelativeSizeSpan;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.runapp.R;
import com.runapp.model.RunningData;

import java.util.List;

public class RunningDataAdapter extends RecyclerView.Adapter<RunningDataAdapter.ViewHolder> {

    private List<RunningData> runningDataList;

    public RunningDataAdapter(List<RunningData> runningDataList) {
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
        String character = runningData.character;
        // 데이터를 ViewHolder의 뷰에 바인딩합니다.
        holder.formattedDate.setText(String.valueOf(runningData.formattedDate));

        // heartRate에 "bpm"을 포함한 문자열을 설정하고, "bpm" 부분의 글자 크기를 조정합니다.
        String distanceText = String.valueOf(runningData.distance) + " km";
        SpannableString spannableDistance = new SpannableString(distanceText);
        int indexOfDISTANCE = distanceText.indexOf("km");
        if (indexOfDISTANCE != -1) {
            spannableDistance.setSpan(new RelativeSizeSpan(0.70f), indexOfDISTANCE, indexOfDISTANCE + 2, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.distance.setText(spannableDistance);

        // heartRate에 "bpm"을 포함한 문자열을 설정하고, "bpm" 부분의 글자 크기를 조정합니다.
        String speedText = String.valueOf(runningData.speed) + " min/km";
        SpannableString spannableSpeed = new SpannableString(speedText);
        int indexOfSPEED = speedText.indexOf("min/km");
        if (indexOfSPEED != -1) {
            spannableSpeed.setSpan(new RelativeSizeSpan(0.70f), indexOfSPEED, indexOfSPEED + 6, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.speed.setText(spannableSpeed);

        // heartRate에 "bpm"을 포함한 문자열을 설정하고, "bpm" 부분의 글자 크기를 조정합니다.
        String heartRateText = String.valueOf(runningData.heartRate) + " bpm";
        SpannableString spannableHeartRate = new SpannableString(heartRateText);
        int indexOfBPM = heartRateText.indexOf("bpm");
        if (indexOfBPM != -1) {
            spannableHeartRate.setSpan(new RelativeSizeSpan(0.70f), indexOfBPM, indexOfBPM + 3, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.heartRate.setText(spannableHeartRate);
        holder.time.setText(convertTime(runningData.time));
        int resId = holder.itemView.getContext().getResources().getIdentifier(character, "drawable", holder.itemView.getContext().getPackageName());
        holder.myRecordCharacter.setImageResource(resId);
    }

    @Override
    public int getItemCount() {
        return runningDataList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView formattedDate, distance, speed, heartRate, time;
        public ImageView myRecordCharacter;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            formattedDate = itemView.findViewById(R.id.formatted_date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            heartRate = itemView.findViewById(R.id.heartRate);
            time = itemView.findViewById(R.id.time);
            myRecordCharacter = itemView.findViewById(R.id.my_record_character);
        }
    }

    public void setData(List<RunningData> newData) {
        this.runningDataList = newData;
    }

    // ms를 분:초로 변환해주는 컨버터(ex 00:00)
    public SpannableString convertTime(Long time){
        int totalSeconds = (int)(time / 1000);
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;

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
}

