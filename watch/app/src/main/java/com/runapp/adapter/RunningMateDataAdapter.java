package com.runapp.adapter;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.runapp.R;
import com.runapp.dto.response.ApiResponseDTO;
import com.runapp.dto.response.RunningMateRunningRecordDTO;
import com.runapp.model.RunningMate;
import com.runapp.service.RunningService;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;
import com.runapp.util.Conversion;

import org.w3c.dom.Text;

import java.util.List;
import java.util.Map;

import retrofit2.Call;

public class RunningMateDataAdapter extends RecyclerView.Adapter<RunningMateDataAdapter.ViewHolder> {

    private List<RunningMate> runningMateList;
    private Conversion conversion = new Conversion();
    private static RunningService runningService;
    private Context context;
    private static Activity activity;

    public RunningMateDataAdapter(Context context, List<RunningMate> runningMateList, Activity activity) {
        this.runningMateList = runningMateList;
        this.context = context;
        this.activity = activity;
        runningService = new RunningService(context);
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_running_mate_data, parent, false);
        runningService = new RunningService(parent.getContext());
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RunningMateDataAdapter.ViewHolder holder, int position) {
        RunningMate runningMate = runningMateList.get(position);
        holder.currentRunningMate = runningMate;
        System.out.println(runningMate.toString());

        holder.formattedDate.setText(conversion.LocalDateTimeToDate(runningMate.getCreatedAt()));
        
        holder.time.setText(convertTime((long) runningMate.getTotalTime()));

        // 상대방이 달린 캐릭터
        int characterIndex = runningMate.getCharacterIndex();
        if(characterIndex == 0){
            holder.runningMateRecordCharacter.setImageResource(R.drawable.rabbit);
        }else if(characterIndex == 1){
            holder.runningMateRecordCharacter.setImageResource(R.drawable.penguin);
        }else if(characterIndex == 2){
            holder.runningMateRecordCharacter.setImageResource(R.drawable.panda);
        }else if(characterIndex == 3){
            holder.runningMateRecordCharacter.setImageResource(R.drawable.chick);
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
        String speedText = String.valueOf(minutes + "'" + seconds + "''");
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
        public ImageView runningMateRecordCharacter;
        public RunningMate currentRunningMate;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            formattedDate = itemView.findViewById(R.id.formatted_date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            nickname = itemView.findViewById(R.id.nickname);
            time = itemView.findViewById(R.id.time);
            runningMateRecordCharacter = itemView.findViewById(R.id.my_record_character);

            // 선택하기 버튼
            Button selectMate = itemView.findViewById(R.id.select_running_mate_btn);
            selectMate.setOnClickListener(v -> {
                AlertDialog.Builder builder = new AlertDialog.Builder(itemView.getContext(), R.style.CustomDialogTheme);

                LayoutInflater inflater = LayoutInflater.from(itemView.getContext());
                // multi_popup.xml을 가져와서 객체로 생성
                View customView = inflater.inflate(R.layout.multi_popup, null);

                builder.setView(customView);
                TextView mateNickname = customView.findViewById(R.id.running_mate_nickname);
                mateNickname.setText("'"+currentRunningMate.getNickName()+"' 님과");

                // builder 내용으로 AlertDialog 생성
                AlertDialog dialog = builder.create();

                // AlertDialog 보이기
                dialog.show();

                Button cancel = customView.findViewById(R.id.multi_cancel);
                Button start = customView.findViewById(R.id.multi_start);

                // 취소하기 눌렀을 때
                cancel.setOnClickListener(b-> {
                    dialog.dismiss();
                });

                String accessToken = AccessToken.getInstance().getAccessToken();

                // 시작하기 눌렀을 때
                start.setOnClickListener(b -> {
                    String objectId = currentRunningMate.getObjectId();
                    runningService.getRunningMateRunningRecord(activity, objectId);
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
        System.out.println(minutes + "분");
        System.out.println(seconds + "초");

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
