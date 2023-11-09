import {HeartChartDataType} from '@/apis/ChartApi';
import * as S from './HeartRate.styles';

import HeartRateGraph from './HeartRateGraph';
import HeartRatePie from './HeartRatePie';

import {useState, useEffect} from 'react';

interface Props {
  data: {
    chartData: HeartChartDataType[];
    secondPerHeartRateSection: number[];
  };
}

function HeartRate({data}: Props) {
  const chartColor: string[] = [
    '#FF1178',
    '#FFF205',
    '#7CFF01',
    '#01FFF4',
    '#9C00FF',
  ];
  const [showData, setShowData] = useState<
    {
      value: number;
      color: string;
    }[]
  >();

  useEffect(() => {
    const newShowData: {value: number; color: string}[] = [];
    data.secondPerHeartRateSection.map((d, index) => {
      if (d != 0)
        newShowData.push({value: Math.round(d), color: chartColor[index]});
    });
    setShowData(newShowData);
  }, []);

  return (
    <S.Container>
      <HeartRateGraph data={data.chartData} chartColor={chartColor} />
      {showData && <HeartRatePie data={showData} chartColor={chartColor} />}
    </S.Container>
  );
}
export default HeartRate;
