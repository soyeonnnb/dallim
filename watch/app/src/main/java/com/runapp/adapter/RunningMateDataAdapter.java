package com.runapp.adapter;

import static androidx.activity.result.ActivityResultCallerKt.registerForActivityResult;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.runapp.R;
import com.runapp.activity.CountdownActivity;
import com.runapp.activity.LoadingActivity;
import com.runapp.activity.RunningActivity;
import com.runapp.activity.RunningMateActivity;
import com.runapp.activity.SelectActivity;
import com.runapp.dto.response.ApiResponseDTO;
import com.runapp.dto.response.RunningMateRunningRecordDTO;
import com.runapp.model.RunningMate;
import com.runapp.service.RunningService;
import com.runapp.util.AccessToken;
import com.runapp.util.ApiUtil;
import com.runapp.util.Conversion;
import com.runapp.util.PreferencesUtil;

import org.w3c.dom.Text;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import retrofit2.Call;

public class RunningMateDataAdapter extends RecyclerView.Adapter<RunningMateDataAdapter.ViewHolder> {

    private List<RunningMate> runningMateList;
    private Conversion conversion = new Conversion();
    private static RunningService runningService;
    private Context context;
    private static SharedPreferences prefs;
    private static Activity activity;
    private static ActivityResultLauncher<Intent> countdownActivityResultLauncher;

    public RunningMateDataAdapter(Context context, List<RunningMate> runningMateList, Activity activity, ActivityResultLauncher<Intent> countdownActivityResultLauncher) {
        this.runningMateList = runningMateList;
        this.context = context;
        this.activity = activity;
        this.countdownActivityResultLauncher = countdownActivityResultLauncher;
        prefs = PreferencesUtil.getEncryptedSharedPreferences(context);
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
        public LinearLayout runningMateRecordCharacter;
        public RunningMate currentRunningMate;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            formattedDate = itemView.findViewById(R.id.formatted_date);
            distance = itemView.findViewById(R.id.distance);
            speed = itemView.findViewById(R.id.speed);
            nickname = itemView.findViewById(R.id.nickname);
            time = itemView.findViewById(R.id.time);
            runningMateRecordCharacter = itemView.findViewById(R.id.running_mate_record_character);

            // 선택하기 버튼
            Button selectMate = itemView.findViewById(R.id.select_running_mate_btn);
            selectMate.setOnClickListener(v -> {
                AlertDialog.Builder builder = new AlertDialog.Builder(itemView.getContext(), R.style.CustomDialogTheme);
                SharedPreferences.Editor edit = prefs.edit();

                LayoutInflater inflater = LayoutInflater.from(itemView.getContext());
                // multi_popup.xml을 가져와서 객체로 생성
                View customView = inflater.inflate(R.layout.multi_popup, null);

                builder.setView(customView);
                TextView mateNickname = customView.findViewById(R.id.running_mate_nickname);
                mateNickname.setText("'"+currentRunningMate.getNickName()+"' 님과");


                String runningRecordId1 = prefs.getString("runningRecordId", "");
                // 내부 저장소에 기록 아이디 있으면 삭제
                if (!runningRecordId1.equals("")){
                    edit.remove("runningRecordId");
                    edit.apply();
                }

                String runningRecordId = currentRunningMate.getRunningRecordId();
                edit.putString("runningRecordId", runningRecordId);
                edit.apply();
                // 러닝메이트 기록 가져와서 sqlite에 저장
                runningService.getRunningMateRunningRecord(activity, runningRecordId);

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
                    Intent intent = new Intent(activity, LoadingActivity.class);
                    countdownActivityResultLauncher.launch(intent);
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일", Locale.KOREAN);
        return date.format(formatter);
    }
}
