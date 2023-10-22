package com.runapp.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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
        // 데이터를 ViewHolder의 뷰에 바인딩합니다.
        holder.date.setTextSize(String.valueOf(runningData.date));
        holder.distance.setText(String.valueOf(runningData.distance));
        holder.speed.setText(String.valueOf(runningData.speed));
        holder.heartRate.setText(String.valueOf(runningData.heartRate));
        holder.time.setText(String.valueOf(runningData.time));
    }

    @Override
    public int getItemCount() {
        return runningDataList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView date, distance, speed, heartRate, time;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            date = itemView.findViewById(R.id.date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            heartRate = itemView.findViewById(R.id.heartRate);
            time = itemView.findViewById(R.id.time);
        }
    }

    public void setData(List<RunningData> newData) {
        this.runningDataList = newData;
    }
}
