import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useReducer} from 'react';
import {StyleSheet, View, Text, LayoutChangeEvent} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import * as S from './BottomTab.styles';

// components
import Main from '@/screens/main/Main';
// import Chart from '@/screens/chart/ChartMain';
import Social from '@/screens/social/Social';
import Edit from '@/screens/edit/Edit';
// import Profile from '@/screens/profile/Profile';

// icon
import BottomTabIcon from './BottomTabIcon';

// stackNavigator
import ProfileStackNavigators from '../../../navigations/ProfileStackNavigators';
import ChartStackNavigators from '../../../navigations/ChartStackNavigators';

const Tab = createBottomTabNavigator();

const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const reducer = (state: any, action: {x: number; index: number}) => {
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  return (
    <View style={animationStyles.tabBarContainer}>
      {routes.map((route, index) => {
        const active = index === activeIndex;
        const {options} = descriptors[route.key];

        return (
          <TabBarComponent
            key={route.key}
            active={active}
            options={options}
            onLayout={e => handleLayout(e, index)}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({active, options, onPress}: TabBarComponentProps) => {
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
        {
          translateY: withTiming(active ? -15 : 0, {duration: 200}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(active ? -15 : 0, {duration: 200}),
        },
      ],
      opacity: withTiming(active ? 1 : 0.5, {duration: 200}),
    };
  });

  return (
    <S.Container>
      <Animated.View
        style={[animationStyles.componentCircle, animatedComponentCircleStyles]}
      />
      <S.PressableContainer onPress={onPress}>
        <Animated.View
          style={[animationStyles.iconContainer, animatedIconContainerStyles]}>
          {options.tabBarIcon && typeof options.tabBarIcon === 'function' ? (
            options.tabBarIcon({
              focused: active ? active : false,
              color: '#000',
              size: 25,
            })
          ) : (
            <Text>No Icon</Text>
          )}
        </Animated.View>
      </S.PressableContainer>
    </S.Container>
  );
};

function BottompTab() {
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      <Tab.Screen
        name="Chart"
        component={ChartStackNavigators}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="chart" />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="social" />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="main" />
          ),
        }}
      />
      <Tab.Screen
        name="Edit"
        component={Edit}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="edit" />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="profile" />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigators}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const animationStyles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderTopEndRadius: 45,
    borderTopStartRadius: 45,
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    flex: 1,
  },
  componentCircle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    position: 'absolute',
    backgroundColor: 'black',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottompTab;
