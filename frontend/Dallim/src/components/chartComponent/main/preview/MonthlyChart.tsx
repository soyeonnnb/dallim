import * as S from './MonthlyChart.styles';
import {useState, useRef, useEffect} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {FlatList} from 'react-native-gesture-handler';
interface Props {
  selectedYearMonth: {
    year: number;
    month: number;
  };
  setSelectedYearMonth: any;
  previewMonthRankingRecords: {
    stacks: {value: number; color: string; id: string}[];
    label: string;
  }[];
}
function MonthlyChart({previewMonthRankingRecords}: Props) {
  const [barChartWidth, setBarChartWidth] = useState(0);

  const [showChartData, setShowChartData] = useState<
    {
      stacks: {value: number; color: string; id: string}[];
      label: string;
    }[][]
  >();
  const [showChart, setShowChart] = useState<boolean>(false);
  const barWidth = 30; // Width of each bar

  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const handleLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setScrollViewHeight(height);
  };

  useEffect(() => {
    setShowChart(false);
    setBarChartWidth(previewMonthRankingRecords.length * barWidth * 2);
    setShowChartData([previewMonthRankingRecords]);
    setShowChart(true);
  }, [previewMonthRankingRecords]);
  return (
    <S.Container>
      <S.Header>러닝 그래프</S.Header>
      <S.ChartSheet onLayout={handleLayout}>
        {showChart &&
          (showChartData && showChartData[0]?.length > 0 ? (
            <FlatList
              horizontal
              data={showChartData}
              key={1} // 이걸 이용해서 records가 변경될 때마다 flat리스트가 재 랜더링되도록 함
              renderItem={({item}) => (
                <BarChart
                  noOfSections={4}
                  stackData={item}
                  barWidth={barWidth}
                  height={scrollViewHeight * 0.75}
                  hideYAxisText
                  yAxisColor="rgba(0, 0, 0, 0)"
                />
              )}
              showsHorizontalScrollIndicator={false} // 가로 스크롤바 표시
              initialScrollIndex={0}
            />
          ) : (
            <S.NoText>달린 적이 없어요 😥</S.NoText>
          ))}
      </S.ChartSheet>
      <S.Footer />
    </S.Container>
  );
}
export default MonthlyChart;
