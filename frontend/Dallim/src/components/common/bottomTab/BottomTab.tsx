import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useReducer, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

// components
import Main from '../../../screens/main/Main';
import Chart from '../../../screens/chart/ChartMain';
import Social from '../../../screens/social/Social';
import Edit from '../../../screens/edit/Edit';
import Profile from '../../../screens/profile/Profile';

// icon
import BottomTabIcon from './BottomTabIcon';

const Tab = createBottomTabNavigator();

const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  const reducer = (state: any, action: {x: number; index: number}) => {
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  return (
    <View
      id="mainContainer"
      style={[
        {
          paddingBottom: bottom,
          backgroundColor: 'white',
        },
      ]}>
      <View style={[styles.tabBarContainer]} id="redContainer">
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
    </View>
  );
};

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

// const TabBarComponent = ({
//   active,
//   options,
//   onLayout,
//   onPress,
// }: TabBarComponentProps) => {
//   const animatedComponentCircleStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: withTiming(active ? 1 : 0, {duration: 250}),
//         },
//         {
//           translateY: withTiming(active ? -15 : 0, {duration: 200}),
//         },
//       ],
//     };
//   });

//   const animatedIconContainerStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: withTiming(active ? -15 : 0, {duration: 200}),
//         },
//       ],
//       opacity: withTiming(active ? 1 : 0.5, {duration: 200}),
//     };
//   });

//   return (
//     <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
//       <Animated.View
//         style={[styles.componentCircle, animatedComponentCircleStyles]}
//       />
//       <Animated.View
//         style={[styles.iconContainer, animatedIconContainerStyles]}>
//         {options.tabBarIcon && typeof options.tabBarIcon === 'function' ? (
//           options.tabBarIcon({
//             focused: active ? active : false,
//             color: '#000',
//             size: 25,
//           })
//         ) : (
//           <Text>No Icon</Text>
//         )}
//       </Animated.View>
//     </Pressable>
//   );
// };

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
    <View style={styles.container}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Pressable onPress={onPress} style={styles.pressable}>
        <Animated.View
          style={[styles.iconContainer, animatedIconContainerStyles]}>
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
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  component: {
    height: 60,
    width: 60,
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
  icon: {
    height: 36,
    width: 36,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible', // Ensure content outside of the container is visible
  },
  pressable: {
    height: 60, // Adjust according to your needs
    width: 60, // Adjust according to your needs
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Make sure the pressable is above the circle
  },
});

function BottompTab() {
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      <Tab.Screen
        name="Chart"
        component={Chart}
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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <BottomTabIcon focused={focused} type="profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottompTab;
