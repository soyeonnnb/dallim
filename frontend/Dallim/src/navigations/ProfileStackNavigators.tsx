import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@/screens/profile/Profile';
import RunningMateSetting from '@/screens/profile/ProfileSubScreens/RunningMateSetting';
import RunningAlarm from '@/screens/profile/ProfileSubScreens/RunningAlarm';
import WatchConnection from '@/screens/profile/ProfileSubScreens/WatchConnection';
import {
  useIsFocused,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import {useEffect} from 'react';

const ProfileStack = createStackNavigator();

function ProfileStackNavigators() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isFocused)
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // 초기 화면의 인덱스, 0으로 설정하면 첫 번째 화면으로 이동
          routes: [
            {name: 'Profile'}, // 초기화 후 이동할 화면의 이름을
          ],
        }),
      );
  }, [isFocused]);

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

      <ProfileStack.Screen
        name="WatchConnection"
        component={WatchConnection}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigators;
