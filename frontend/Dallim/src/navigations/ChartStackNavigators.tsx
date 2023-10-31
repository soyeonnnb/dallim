import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Chart from '@/screens/chart/ChartMain';
import ChartDetail from '@/screens/chart/ChartDetail';

const ChartStack = createStackNavigator();

function ChartStackNavigators() {
  return (
    <ChartStack.Navigator initialRouteName="Chart">
      <ChartStack.Screen
        name="ChartMain"
        component={Chart}
        options={{headerShown: false}}
      />

      <ChartStack.Screen
        name="ChartDetail"
        component={ChartDetail}
        options={{headerShown: false}}
      />
    </ChartStack.Navigator>
  );
}

export default ChartStackNavigators;
