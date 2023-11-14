import {useState, useEffect} from 'react';

import HeartRateGraph from './HeartRateGraph';
import HeartRatePie from './HeartRatePie';
import {HeartChartDataType} from '@/apis/ChartApi';

import * as S from './HeartRate.styles';
import {colors} from '@/components/common/globalStyles';

interface Props {
  data: {
    chartData: HeartChartDataType[];
    secondPerHeartRateSection: number[];
  };
}

function HeartRate({data}: Props) {
  const chartColor: string[] = [
    colors.pink._500,
    colors.yellow._500,
    colors.green._500,
    colors.blue._500,
    colors.purple._500,
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
