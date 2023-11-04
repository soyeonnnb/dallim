import * as S from './HeartRate.styles';

import HeartRateGraph from './HeartRateGraph';
import HeartRatePie from './HeartRatePie';

interface Props {
  data: {
    chartData: {
      value: number;
      second: number;
    }[];
    secondPerHeartRateSection: number[];
  };
}

function HeartRate({data}: Props) {
  return (
    <S.Container>
      <HeartRateGraph data={data.chartData} />
      <HeartRatePie data={data.secondPerHeartRateSection} />
    </S.Container>
  );
}
export default HeartRate;
