import * as S from './MonthlyChart.styles';
import {StackedBarChart} from 'react-native-chart-kit';
import {Dimensions, ScrollView} from 'react-native';
interface Props {
  selectedYearMonth: {
    year: number;
    month: number;
  };
  setSelectedYearMonth: any;
}
function MonthlyChart({selectedYearMonth, setSelectedYearMonth}: Props) {
  const data = {
    labels: ['Test1', 'Test2'],
    legend: ['L1', 'L2', 'L3'],
    data: [
      [60, 60, 60],
      [30, 30, 60],
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <S.Container>
      <S.Title>월별 현황</S.Title>
      <S.ChartSheet>
        <S.Text>추후 업데이트 예정입니다 🙄</S.Text>
        {/* <ScrollView
          horizontal
          contentContainerStyle={{flex: 1}} // 내용 컨테이너 스타일
        >
          <StackedBarChart
            data={{
              labels: ['Test1', 'Test2'],
              legend: ['L1', 'L2', 'L3'],
              data: [
                [60, 60, 60],
                [30, 30, 60],
              ],
              barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              // backgroundGradientFrom: 'green',
              // backgroundGradientTo: 'green',
              // decimalPlaces: , // optional, defaults to 2dp
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
            }}
            hideLegend={true}
            style={
              {
                // marginVertical: 8,
                // borderRadius: 16,
              }
            }
          />
        </ScrollView> */}
      </S.ChartSheet>
      <S.Footer />
    </S.Container>
  );
}
export default MonthlyChart;
