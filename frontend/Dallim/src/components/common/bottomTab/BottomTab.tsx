import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// navigation
import {NavigationContainer} from '@react-navigation/native';
import * as varStyles from '../styles';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';
import Svg, {Defs, Mask, Rect, Path, G} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

// components
import Main from '../../../screens/main/Main';
import Chart from '../../../screens/chart/Chart';
import Social from '../../../screens/social/Social';
import Edit from '../../../screens/edit/Edit';
import Profile from '../../../screens/profile/Profile';

// icon
import BottomTabIcon from './BottomTabIcon';

const Tab = createBottomTabNavigator();
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

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

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({index}) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(xOffset.value, {duration: 150})}],
    };
  });
  // return (
  //   <View style={[{paddingBottom: bottom, bottom: 20, position: 'relative'}]}>
  //     <AnimatedSvg
  //       width={110}
  //       height={60}
  //       viewBox="0 0 110 60"
  //       style={[styles.activeBackground, animatedStyles]}>
  //       <Path
  //         fill="#ffffff"
  //         d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
  //       />
  //     </AnimatedSvg>

  //     <View style={styles.tabBarContainer}>
  //       {routes.map((route, index) => {
  //         const active = index === activeIndex;
  //         const {options} = descriptors[route.key];

  //         return (
  //           <TabBarComponent
  //             key={route.key}
  //             active={active}
  //             options={options}
  //             onLayout={e => handleLayout(e, index)}
  //             onPress={() => navigation.navigate(route.name)}
  //           />
  //         );
  //       })}
  //     </View>
  //   </View>
  // );

  return (
    // <View
    //   id="mainContainer"
    //   style={[
    //     {
    //       paddingBottom: bottom,
    //       backgroundColor: 'transparent',
    //     },
    //   ]}>
    //   <Animated.View style={[styles.activeBackground, animatedStyles]}>
    //     <AnimatedSvg height="60" width="110" viewBox="0 0 110 60">
    //       <Path
    //         d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
    //         fill="#fff"
    //         id="toDelete"
    //       />
    //     </AnimatedSvg>
    //   </Animated.View>

    //   {/* Your existing tab bar container */}
    //   <View style={styles.tabBarContainer} id="redContainer">
    //     {routes.map((route, index) => {
    //       const active = index === activeIndex;
    //       const {options} = descriptors[route.key];

    //       return (
    //         <TabBarComponent
    //           key={route.key}
    //           active={active}
    //           options={options}
    //           onLayout={e => handleLayout(e, index)}
    //           onPress={() => navigation.navigate(route.name)}
    //         />
    //       );
    //     })}
    //   </View>
    // </View>
    <View
      id="mainContainer"
      style={[
        {
          paddingBottom: bottom,
          bottom: 20,
          backgroundColor: 'transparent',
        },
      ]}>
      {/* 마스크를 적용할 전체 View를 감싸는 SVG 컴포넌트 */}
      <Svg height="100%" width="100%" style={{position: 'absolute'}}>
        <Defs>
          <Mask id="myMask" x="0" y="0" height="100%" width="100%">
            {/* 마스크 영역을 정의합니다. Path 영역을 제외한 모든 영역을 투명하게 처리합니다. */}
            <Rect height="100%" width="100%" fill="#fff" />
            <AnimatedPath
              d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
              fill="#000"
            />
          </Mask>
        </Defs>

        {/* 실제 마스크를 적용합니다. 'myMask' 마스크 참조를 사용합니다. */}
        <Rect height="100%" width="100%" fill="green" mask="url(#myMask)" />
      </Svg>

      {/* 기타 컴포넌트들 */}
      <View
        style={[styles.tabBarContainer, {backgroundColor: 'transparent'}]}
        id="redContainer">
        {/* 이 부분에서 탭 바 아이템을 렌더링합니다. */}

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

const TabBarComponent = ({
  active,
  options,
  onLayout,
  onPress,
}: TabBarComponentProps) => {
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
        {
          translateY: withTiming(active ? -10 : 0, {duration: 200}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(active ? -10 : 0, {duration: 200}),
        },
      ],
      opacity: withTiming(active ? 1 : 0.5, {duration: 200}),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
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
  );
};

const styles = StyleSheet.create({
  activeBackground: {
    position: 'absolute',
    // backgroundColor: 'blue',
    // top: 0,
    bottom: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    flex: 1,
  },
  component: {
    height: 60,
    width: 60,
    // marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
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
});

function BottompTab() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    // 이걸 넣으면 Login으로 안가요
    // 부모의 컨텍스트 영향을 받지 않고 독립적으로 작동한대요
    // <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBar={props => <AnimatedTabBar {...props} />}
        screenOptions={{headerShown: false}}
        initialRouteName="Main">
        <Tab.Screen
          name="Chart"
          component={Chart}
          options={{
            tabBarIcon: ({focused}) => (
              <BottomTabIcon
                darkMode={darkMode}
                focused={focused}
                type="chart"
              />
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
              <BottomTabIcon
                darkMode={darkMode}
                focused={focused}
                type="main"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Edit"
          component={Edit}
          options={{
            tabBarIcon: ({focused}) => (
              <BottomTabIcon
                darkMode={darkMode}
                focused={focused}
                type="edit"
              />
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
    // </NavigationContainer>
  );
}

export default BottompTab;
