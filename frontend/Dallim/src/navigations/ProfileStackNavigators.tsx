import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@/screens/profile/Profile';
import RunningMateSetting from '@/screens/profile/ProfileSubScreens/RunningMateSetting';
import RunningAlarm from '@/screens/profile/ProfileSubScreens/RunningAlarm';

const ProfileStack = createStackNavigator();

function ProfileStackNavigators() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="RunningMateSetting"
        component={RunningMateSetting}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="RunningAlarm"
        component={RunningAlarm}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigators;
