import {createStackNavigator} from '@react-navigation/stack';
import ChartMain from '@/screens/chart/ChartMain';
import ChartDetail from '@/screens/chart/ChartDetail';

type ChartStackParamList = {
  ChartMain: undefined;
  ChartDetail: {id: string};
};
const ChartStack = createStackNavigator<ChartStackParamList>();

function ChartStackNavigators() {
  return (
    <ChartStack.Navigator initialRouteName="ChartMain">
      <ChartStack.Screen
        name="ChartMain"
        component={ChartMain}
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
