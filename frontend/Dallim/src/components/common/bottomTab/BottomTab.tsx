import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as S from './BottomTab.styles';

import Main from '../../../screens/main/Main';
import Chart from '../../../screens/chart/Chart';
import Social from '../../../screens/social/Social';
import Edit from '../../../screens/edit/Edit';
import Profile from '../../../screens/profile/Profile';

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false, headerShown: false,
            tabBarStyle: {
                height: 50,
                backgroundColor: 'black',
            }
        }}

        >
            <Tab.Screen
                name="Chart"
                component={Chart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <S.TabIcon
                            source={require('../../../assets/icons/chart-icon.png')}
                            tintColor={focused ? 'white' : 'gray'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Social"
                component={Social}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <S.TabIcon
                            source={require('../../../assets/icons/social-icon.png')}
                            tintColor={focused ? 'white' : 'gray'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <S.TabIcon
                            source={require('../../../assets/icons/main-icon.png')}
                            tintColor={focused ? 'white' : 'gray'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Edit"
                component={Edit}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <S.TabIcon
                            source={require('../../../assets/icons/edit-icon.png')}
                            tintColor={focused ? 'white' : 'gray'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <S.TabIcon
                            source={require('../../../assets/icons/profile-icon.png')}
                            tintColor={focused ? 'white' : 'gray'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab;