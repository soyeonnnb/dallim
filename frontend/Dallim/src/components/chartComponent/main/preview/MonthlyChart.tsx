import * as S from './MonthlyChart.styles';
import {useState, useRef, useEffect} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {FlatList} from 'react-native-gesture-handler';

import MonthChartModal from './MonthChartModal';
import {meterToKMOrMeter, secondToMinuteSeconds} from '@/recoil/RunningData';

interface Props {
  selectedYearMonth: {
    year: number;
    month: number;
  };
  setSelectedYearMonth: any;
  previewMonthRankingRecords: {
    stacks: {value: number; color: string; marginBottom?: number}[];
    label: string;
    info: {
      id: string;
      distance: number;
      time: number;
    };
  }[];
}
function MonthlyChart({previewMonthRankingRecords}: Props) {
  const [showChartData, setShowChartData] = useState<
    {
      stacks: {value: number; color: string}[];
      label: string;
      info: {
        id: string;
        distance: number;
        time: number;
      };
    }[][]
  >();
  const [showChart, setShowChart] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    date: string;
    id: string;
    distance: string;
    time: string;
  }>();

  const barWidth = 30; // Width of each bar

  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const handleLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setScrollViewHeight(height);
  };
  const handleModal = (item: any) => {
    setSelectedItem({
      id: item.info.id,
      distance: meterToKMOrMeter(item.info.distance),
      time: secondToMinuteSeconds(item.info.time),
      date: item.label,
    });
    console.log('item => ', item);
    setModalVisible(true);
  };
  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    setShowChart(false);
    setShowChartData([previewMonthRankingRecords]);
    setShowChart(true);
  }, [previewMonthRankingRecords]);
  return (
    <S.BigContainer>
      <S.ContainerShadow
        distance={10}
        offset={[0, 0]}
        sides={{
          bottom: false,
        }}>
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
                      yAxisThickness={0}
                      barBorderRadius={4}
                      spacing={25}
                      xAxisColor="gray"
                      barMarginBottom={100}
                      isAnimated={true}
                      onPress={(item: any) => handleModal(item)}
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
      </S.ContainerShadow>
      <MonthChartModal
        modalVisible={modalVisible}
        toggleModalVisible={toggleModalVisible}
        item={selectedItem}
      />
    </S.BigContainer>
  );
}
export default MonthlyChart;
