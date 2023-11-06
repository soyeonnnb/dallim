import {createStackNavigator} from '@react-navigation/stack';

// 화면 리스트
import ChartMain from '@/screens/chart/ChartMain';
import ChartDetail from '@/screens/chart/ChartDetail';
import RunningMateChartList from '@/screens/chart/RunningMateChartList';

import {
  useIsFocused,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import {useEffect} from 'react';

type ChartStackParamList = {
  ChartMain: undefined;
  ChartDetail: {id: string};
  RunningMateChartList: {id: string};
};
const ChartStack = createStackNavigator<ChartStackParamList>();

function ChartStackNavigators() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isFocused)
      navigation.dispatch(
        CommonActions.reset({
          index: 0, // 초기 화면의 인덱스, 0으로 설정하면 첫 번째 화면으로 이동
          routes: [
            {name: 'ChartMain'}, // 초기화 후 이동할 화면의 이름을 지정
          ],
        }),
      );
  }, [isFocused]);

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

      <ChartStack.Screen
        name="RunningMateChartList"
        component={RunningMateChartList}
        options={{headerShown: false}}
      />
    </ChartStack.Navigator>
  );
}

export default ChartStackNavigators;
