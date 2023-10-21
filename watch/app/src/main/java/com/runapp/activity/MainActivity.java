package com.runapp.activity;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;

import androidx.activity.ComponentActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.runapp.databinding.ActivityMainBinding;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends ComponentActivity {
    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

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
    }


    private void checkPermission(){

        int MULTIPLE_PERMISSIONS_CODE = 100;
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


//    // ActivityResultLauncher를 생성합니다.
//    private ActivityResultLauncher<String[]> requestPermissionLauncher =
//            registerForActivityResult(new ActivityResultContracts.RequestMultiplePermissions(), result -> {
//                // 권한 요청 결과를 처리합니다.
//                if (result.containsValue(false)) {
//                    // 사용자가 필요한 권한을 모두 승인하지 않은 경우 앱을 종료합니다.
//                    new AlertDialog.Builder(MainActivity.this)
//                            .setMessage("이 앱은 모든 필요한 권한이 승인되어야 정상적으로 작동합니다. 권한을 부여해주세요.")
//                            .setPositiveButton("종료", (dialog, which) -> finish())
//                            .setNegativeButton("다시 시도", (dialog, which) -> checkPermission())
//                            .create()
//                            .show();
//                }
//            });

}
