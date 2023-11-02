import {createStackNavigator} from '@react-navigation/stack';
import Social from '@/screens/social/Social';
import UserDetailStack from '@/screens/social/UserDetailStack';

const ProfileStack = createStackNavigator();

function SocialStackNavigators() {
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
