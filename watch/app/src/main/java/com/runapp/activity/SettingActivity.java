package com.runapp.activity;

import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.runapp.R;
import com.runapp.database.AppDatabase;
import com.runapp.databinding.ActivitySettingBinding;
import com.runapp.util.PreferencesUtil;
import com.runapp.util.UserInfo;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class SettingActivity extends AppCompatActivity {
    private AppDatabase db;
    private ActivitySettingBinding binding;
    private final Executor executor = Executors.newSingleThreadExecutor();
    private SharedPreferences prefs;
    private UserInfo userInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        db = AppDatabase.getDatabase(getApplicationContext());
        super.onCreate(savedInstanceState);
        // 바인딩 클래스를 사용해서 xml코드를 객체화시킨다. findViewById를 안 쓰고 바인딩 클래스로 편하게 사용.
        binding = ActivitySettingBinding.inflate(getLayoutInflater());
        // xml 레이아웃의 최상위 뷰를 가져옴
        View view = binding.getRoot();
        // 액티비티의 컨텐츠 뷰로 view를 설정. 여기서 화면에 뭐가 보일지 결정
        setContentView(view);

        binding.btnUnlink.setOnClickListener(v ->{
            String email = prefs.getString("email", null);
            String nickname = prefs.getString("nickname", null);
            int level = prefs.getInt("level", 0);

            // AlertDialog.Builder 인스턴스 생성
            AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.CustomDialogTheme);

            LayoutInflater inflater = getLayoutInflater();
            // unlink_user.xml을 가져와서 객체로 생성
            View customView = inflater.inflate(R.layout.unlink_user, null);

            TextView userEmail = customView.findViewById(R.id.user_email);
            userEmail.setText("이메일:" + email);
            TextView userNickname = customView.findViewById(R.id.nickname);
            userNickname.setText("닉네임:" + nickname);
            TextView userLevel = customView.findViewById(R.id.level);
            userLevel.setText("레벨:" + String.valueOf(level) + " LV");

            builder.setView(customView);

            // builder 내용으로 AlertDialog 생성
            AlertDialog dialog = builder.create();

            // AlertDialog 보이기
            dialog.show();

            Button btnCancel = customView.findViewById(R.id.unlink_cancel);
            Button btnStart = customView.findViewById(R.id.unlink_start);

            // 취소 버튼에 대한 클릭 리스너
            btnCancel.setOnClickListener(b ->{
                dialog.dismiss();
            });

            // 확인 버튼에 대한 클릭 리스너
            btnStart.setOnClickListener(b-> {
                prefs.edit().clear().apply();
                deleteRunningMate();
                deleteRunningData();
                Toast.makeText(SettingActivity.this, "연동을 해제하였습니다.", Toast.LENGTH_SHORT).show();
                dialog.dismiss();

                // 모든 액티비티를 종료하고 메인 액티비티로 이동하는 인텐트 생성
                Intent intent = new Intent(SettingActivity.this, MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);

                // 현재 액티비티 종료
                finish();
            });


        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        prefs = PreferencesUtil.getEncryptedSharedPreferences(getApplicationContext());

        String email = prefs.getString("email", null);
        TextView viewEmail = binding.email;
        viewEmail.setText(email);
    }

    // 러닝 데이터 삭제
    private void deleteRunningData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningDataDAO().deleteAll();
            }
        });
    }

    // 러닝메이트 데이터 삭제
    private void deleteRunningMate() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                db.runningMateDAO().deleteAll();
            }
        });
    }
}