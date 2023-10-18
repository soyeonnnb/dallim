import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as S from './BottomTab.styles';
import * as varStyles from '../styles';
import {useState} from 'react';

// components
import Main from '../../../screens/main/Main';
import Chart from '../../../screens/chart/Chart';
import Social from '../../../screens/social/Social';
import Edit from '../../../screens/edit/Edit';
import Profile from '../../../screens/profile/Profile';

// icon
import BottomTabIcon from './BottomTabIcon';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: varStyles.colors.lightLavender,
          borderTopLeftRadius: varStyles.borderRadius.large,
          borderTopEndRadius: varStyles.borderRadius.large,
        },
      }}>
      <Tab.Screen
        name="Chart"
        component={Chart}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon darkMode={darkMode} focused={focused} type="chart" />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon
              darkMode={darkMode}
              focused={focused}
              type="social"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon darkMode={darkMode} focused={focused} type="main" />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={Edit}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon darkMode={darkMode} focused={focused} type="edit" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon
              darkMode={darkMode}
              focused={focused}
              type="profile"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
