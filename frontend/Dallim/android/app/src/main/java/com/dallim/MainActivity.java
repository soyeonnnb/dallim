package com.dallim;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    Log.d("DDDDDDDDDD", "MainActivity - getMainComponentName");
    return "Dallim";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    Log.d("DDDDDDDDDD", "MainActivity - createReactActivityDelegate");
    return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    Intent intent = getIntent();

    handleIntent(intent);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
   setIntent(intent); // Optional: if you want to use getIntent() later

    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
     if (intent != null && intent.hasExtra("route")) {
      String route = intent.getStringExtra("route");
      CalendarWidgetModule widgetModule = new CalendarWidgetModule((ReactApplicationContext) getReactInstanceManager().getCurrentReactContext());
      widgetModule.sendAppRoute(route);
      DirectRunWidgetModule widgetModule1 = new DirectRunWidgetModule((ReactApplicationContext) getReactInstanceManager().getCurrentReactContext());
      widgetModule1.sendAppRoute(route);
    }
  }
}
