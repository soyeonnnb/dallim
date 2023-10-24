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
import com.runapp.model.RiverData;

import java.util.List;

public class RiverDataAdapter extends RecyclerView.Adapter<RiverDataAdapter.ViewHolder> {

    private List<RiverData> riverDataList;

    public RiverDataAdapter(List<RiverData> riverDataList) {
        this.riverDataList = riverDataList;
    }

    @NonNull
    @Override
    public RiverDataAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.multi_popup, parent, false);
        return new RiverDataAdapter.ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RiverDataAdapter.ViewHolder holder, int position) {
        RiverData riverData = riverDataList.get(position);
        String character = riverData.character;
        // 데이터를 ViewHolder의 뷰에 바인딩합니다.
        holder.formattedDate.setText(String.valueOf(riverData.formattedDate));

        // heartRate에 "bpm"을 포함한 문자열을 설정하고, "bpm" 부분의 글자 크기를 조정합니다.
        String distanceText = String.valueOf(riverData.distance) + " km";
        SpannableString spannableDistance = new SpannableString(distanceText);
        int indexOfDISTANCE = distanceText.indexOf("km");
        if (indexOfDISTANCE != -1) {
            spannableDistance.setSpan(new RelativeSizeSpan(0.70f), indexOfDISTANCE, indexOfDISTANCE + 2, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.distance.setText(spannableDistance);

        // heartRate에 "bpm"을 포함한 문자열을 설정하고, "bpm" 부분의 글자 크기를 조정합니다.
        String speedText = String.valueOf(riverData.speed) + " min/km";
        SpannableString spannableSpeed = new SpannableString(speedText);
        int indexOfSPEED = speedText.indexOf("min/km");
        if (indexOfSPEED != -1) {
            spannableSpeed.setSpan(new RelativeSizeSpan(0.70f), indexOfSPEED, indexOfSPEED + 6, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        }
        holder.speed.setText(spannableSpeed);


        holder.nickname.setText(riverData.nickname);
    }

    @Override
    public int getItemCount() {
        return riverDataList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView formattedDate, distance, speed, nickname, time;
        public ImageView riverRecordCharacter;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            formattedDate = itemView.findViewById(R.id.formatted_date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            nickname = itemView.findViewById(R.id.nickname);
            time = itemView.findViewById(R.id.time);
            riverRecordCharacter = itemView.findViewById(R.id.river_record_character);
        }
    }

    public void setData(List<RiverData> newData) {
        this.riverDataList = newData;
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
