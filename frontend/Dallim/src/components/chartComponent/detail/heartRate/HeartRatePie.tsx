import * as S from './HeartRatePie.styles';
import {useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';
function HeartRatePie() {
  const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
  const chartColor: string[] = [
    '#FF1178',
    '#FFF205',
    '#7CFF01',
    '#01FFF4',
    '#9C00FF',
  ];
  const [pieRadius, setpieRadius] = useState(0);
  const [showData, setShowData] = useState<
    {
      value: number;
      color: string;
      focused?: boolean;
    }[]
  >([
    {
      value: 47,
      color: chartColor[0],
      // focused: true,
    },
    {value: 40, color: chartColor[1]},
    {value: 16, color: chartColor[2]},
    {value: 3, color: chartColor[3]},
    {value: 3, color: chartColor[4]},
  ]);
  const handleChartRadius = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setpieRadius(width / 2.5);
  };
  const [chartInfoHeight, setChartInfoHeight] = useState<number>(0);

  const handleChartInfoHeight = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setChartInfoHeight(height / 9);
  };
  return (
    <S.Container>
      <S.Middle>
        <S.ChartSection onLayout={handleChartRadius}>
          <PieChart data={showData} sectionAutoFocus radius={pieRadius} />
        </S.ChartSection>
        <S.ChartInfos onLayout={handleChartInfoHeight}>
          <PieChartInfo
            index={0}
            chartInfo="<136"
            color={chartColor[0]}
            height={chartInfoHeight}
          />
          <PieChartInfo
            index={1}
            chartInfo="137~149"
            color={chartColor[1]}
            height={chartInfoHeight}
          />
          <PieChartInfo
            index={2}
            chartInfo="150~162"
            color={chartColor[2]}
            height={chartInfoHeight}
          />
          <PieChartInfo
            index={3}
            chartInfo="163~175"
            color={chartColor[3]}
            height={chartInfoHeight}
          />
          <PieChartInfo
            index={4}
            chartInfo="176+"
            color={chartColor[4]}
            height={chartInfoHeight}
          />
        </S.ChartInfos>
      </S.Middle>
      <S.Footer />
    </S.Container>
  );
}
export default HeartRatePie;

interface PieChartInfoProps {
  index: number;
  chartInfo: string;
  color: string;
  height: number;
}

function PieChartInfo({index, chartInfo, color, height}: PieChartInfoProps) {
  return (
    <S.ChartInfo>
      <S.ChartInfoLeft>
        <S.ChartInfoColor size={height} bgColor={color} />
        <S.ChartInfoName>영역 {index + 1}</S.ChartInfoName>
      </S.ChartInfoLeft>
      <S.ChartRight>
        <S.ChartInfoContent>{chartInfo} BPM</S.ChartInfoContent>
      </S.ChartRight>
    </S.ChartInfo>
  );
}
