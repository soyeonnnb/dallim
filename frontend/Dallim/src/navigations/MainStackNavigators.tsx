import {createStackNavigator} from '@react-navigation/stack';
import Main from '@/screens/main/Main';
import GameStartStack from '@/screens/main/GameStartStack';

const ProfileStack = createStackNavigator();

function MainStackNavigators() {
  return (
    <ProfileStack.Navigator initialRouteName="Main">
      <ProfileStack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />

      <ProfileStack.Screen
        name="GameStartStack"
        component={GameStartStack}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}

export default MainStackNavigators;
