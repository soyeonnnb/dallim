import {createStackNavigator} from '@react-navigation/stack';
import Social from '@/screens/social/Social';
import UserDetailStack from '@/screens/social/UserDetailStack';

import {
  useIsFocused,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import {useEffect} from 'react';

const ProfileStack = createStackNavigator();

function SocialStackNavigators() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isFocused)
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // 초기 화면의 인덱스, 0으로 설정하면 첫 번째 화면으로 이동
          routes: [
            {name: 'Social'}, // 초기화 후 이동할 화면의 이름을 지정
          ],
        }),
      );
  }, [isFocused]);

  return (
    <ProfileStack.Navigator initialRouteName="Social">
      <ProfileStack.Screen
        name="Social"
        component={Social}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="UserDetailStack"
        component={UserDetailStack}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export default SocialStackNavigators;
