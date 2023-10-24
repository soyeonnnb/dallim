package com.runapp.activity;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.activity.ComponentActivity;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.runapp.database.AppDatabase;
import com.runapp.databinding.ActivityMainBinding;
import com.runapp.model.RiverData;
import com.runapp.model.RunningData;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class MainActivity extends ComponentActivity {
    // 클래스 멤버로 Executor 정의
    private final Executor executor = Executors.newSingleThreadExecutor();
    private ActivityMainBinding binding;
    private AppDatabase db;
    static int MULTIPLE_PERMISSIONS_CODE = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        db = AppDatabase.getDatabase(getApplicationContext());

        super.onCreate(savedInstanceState);

//         러닝데이터 db에서 출력용(디비에 접근하려면 메인 스레드에서 하면 안된다)
        executor.execute(new Runnable() {
            @Override
            public void run() {
                // 백그라운드 스레드에서 데이터베이스 접근
                List<RunningData> runningDataList = db.runningDataDAO().getAll();

                // 데이터베이스에서 받은 데이터를 로그로 출력
                for (RunningData runningData : runningDataList) {
                    Log.d("MyRecordActivity", "Running Data: " + runningData.formattedDate);
                }
            }
        });

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        // 레이아웃의 최상위 뷰를 가져옴
        View view = binding.getRoot();
        // 액티비티의 컨텐츠 뷰로 view를 설정. 여기서 화면에 뭐가 보일지 결정
        setContentView(view);
        checkPermission();

        binding.btnStart.setOnClickListener(v -> {
            // Start the RunningActivity when the button is clicked
            Intent intent = new Intent(MainActivity.this, SelectActivity.class);
            startActivity(intent);
        });

        binding.myRecordData.setOnClickListener(v->{
            addMyRecordDummyData();
        });

        binding.myRecordDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                deleteMyRecordAllData();
            }
        });

        binding.riverRecordAdd.setOnClickListener(v->{
            addRiverRecordDummyData();
        });

        binding.riverRecordDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                deleteRiverRecordAllData();
            }
        });
    }

    private void checkPermission(){


        // 필요한 권한(퍼미션)들
        String[] requiredPermissions = {
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACTIVITY_RECOGNITION,
                Manifest.permission.BODY_SENSORS
        };

        // 거절되었거나 아직 수락하지 않은 권한(퍼미션)을 저장할 문자열 리스트
        List<String> rejectedPermissionList = new ArrayList<>();

        // 필요한 퍼미션들을 하나씩 끄집어내서 현재 권한을 받았는지 체크
        for (String permission : requiredPermissions) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                // 만약 권한이 없다면 rejectedPermissionList에 추가
                rejectedPermissionList.add(permission);
            }
        }

        // 거절된 퍼미션이 있다면...
        if (!rejectedPermissionList.isEmpty()) {
            // 권한 요청!
            String[] array = new String[rejectedPermissionList.size()];
            array = rejectedPermissionList.toArray(array);
            ActivityCompat.requestPermissions(this, array, MULTIPLE_PERMISSIONS_CODE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == MULTIPLE_PERMISSIONS_CODE) {
            boolean allPermissionsGranted = true;
            // 모든 권한이 승인되었는지 확인
            for (int grantResult : grantResults) {
                if (grantResult != PackageManager.PERMISSION_GRANTED) {
                    allPermissionsGranted = false;
                    break;
                }
            }

            if (!allPermissionsGranted) {
                // 하나 이상의 권한이 거부된 경우 사용자에게 알림
                new AlertDialog.Builder(MainActivity.this)
                        .setMessage("설정에서 모든 권한을 허용하고 다시 실행해주세요.")
                        .setPositiveButton("종료", (dialog, which) -> finish())
                        .setOnDismissListener(dialog -> finish()) // 사용자가 알람 닫으면 앱 꺼버림
                        .create()
                        .show();
            } else {
                // 필요한 모든 권한이 승인된 경우
                // 권한이 승인된 후 수행해야 하는 작업을 여기에 추가할 수 있습니다.
            }
        }
    }

    private void addMyRecordDummyData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                if (db.runningDataDAO().getAll().isEmpty()) { // 데이터베이스가 비어있는 경우에만 더미 데이터 추가
                    RunningData data1 = new RunningData();
                    data1.date = new Date();
                    data1.formattedDate = formatDate(data1.date);
                    data1.distance = 5.5f;
                    data1.speed = 3.5f;
                    data1.heartRate = 80;
                    data1.time = 120300L;
                    data1.character = "chick";

                    RunningData data2 = new RunningData();
                    data2.date = new Date();
                    data2.formattedDate = formatDate(data2.date);
                    data2.distance = 3.7f;
                    data2.speed = 2.8f;
                    data2.heartRate = 76;
                    data2.time = 360040L;
                    data2.character = "penguin";

                    RunningData data3 = new RunningData();
                    data3.date = new Date();
                    data3.formattedDate = formatDate(data3.date);
                    data3.distance = 6.3f;
                    data3.speed = 4.2f;
                    data3.heartRate = 85;
                    data3.time = 5003040L;
                    data3.character = "panda";

                    db.runningDataDAO().insert(data1);
                    db.runningDataDAO().insert(data2);
                    db.runningDataDAO().insert(data3);

                    // 추가되었다고 알려줌~
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(MainActivity.this, "더미데이터 추가 완료~", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
    }

    private void addRiverRecordDummyData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                if (db.riverDataDAO().getAll().isEmpty()) { // 데이터베이스가 비어있는 경우에만 더미 데이터 추가
                    RiverData data1 = new RiverData();
                    data1.date = new Date();
                    data1.formattedDate = formatDate(data1.date);
                    data1.distance = 5.5f;
                    data1.speed = 3.5f;
                    data1.nickname = "최규호구";
                    data1.time = 3910300L;
                    data1.character = "chick";

                    db.riverDataDAO().insert(data1);

                    // 추가되었다고 알려줌~
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(MainActivity.this, "더미데이터 추가 완료~", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
    }

    // 날짜 형식 변환해주는 메서드
    private String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM월 dd일 (E)", Locale.KOREAN);
        return dateFormat.format(date);
    }

    private void deleteMyRecordAllData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                // 데이터베이스의 모든 데이터 삭제
                db.runningDataDAO().deleteAll();

                // 삭제되었다고 알려주자~
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this, "더미데이터 전부 삭제~", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }

    private void deleteRiverRecordAllData() {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                // 데이터베이스의 모든 데이터 삭제
                db.riverDataDAO().deleteAll();

                // 삭제되었다고 알려주자~
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(MainActivity.this, "더미데이터 전부 삭제~", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }

}
