package com.dallim.service;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;

import androidx.core.app.NotificationCompat;

import com.google.android.gms.wearable.DataEvent;
import com.google.android.gms.wearable.DataEventBuffer;
import com.google.android.gms.wearable.DataItem;
import com.google.android.gms.wearable.DataMap;
import com.google.android.gms.wearable.DataMapItem;
import com.google.android.gms.wearable.WearableListenerService;
import com.dallim.R;

public class DataLayerListenerService extends WearableListenerService {

    private static final String CHANNEL_ID = "dallim_channel";
    @Override
    public void onDataChanged(DataEventBuffer dataEvents) {
        System.out.println("데이터 변경됨");
        for (DataEvent event : dataEvents) {
            System.out.println("들어와라");
            if (event.getType() == DataEvent.TYPE_CHANGED) {
                DataItem item = event.getDataItem();
                if ("/temp".equals(item.getUri().getPath())) {
                    DataMap dataMap = DataMapItem.fromDataItem(item).getDataMap();
                    long receivedData = dataMap.getLong("timestamp");
                    System.out.println(receivedData);
                    showNotification(receivedData);
                    // 여기에서 원하는 처리를 수행합니다.
                }
            }
        }
    }

    private void showNotification(long timestamp) {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Data Received")
                .setContentText("Timestamp: " + timestamp)
                .setSmallIcon(R.mipmap.ic_launcher) // 앱의 아이콘을 여기에 설정
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setCategory(NotificationCompat.CATEGORY_MESSAGE)
                .build();

        notificationManager.notify(1, notification);
    }
}
