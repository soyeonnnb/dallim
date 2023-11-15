import {createStackNavigator} from '@react-navigation/stack';
import Main from '@/screens/main/Main';
// import GameStartStack from '@/screens/main/GameStartStack2';
import GameStartStack from '@/screens/main/GameStartStack';

const MainStack = createStackNavigator();

function MainStackNavigators() {
  return (
    <MainStack.Navigator initialRouteName="MainMain">
      <MainStack.Screen
        name="MainMain"
        component={Main}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="GameStartStack"
        component={GameStartStack}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
}

export default MainStackNavigators;
