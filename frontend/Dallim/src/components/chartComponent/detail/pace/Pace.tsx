import * as S from './Pace.styles';
import {useState, useEffect} from 'react';
import PaceChart from './PaceChart';
import PaceRecord from './PaceRecord';

import {PaceDataType} from '@/apis/ChartApi';

interface Props {
  data: PaceDataType;
  rivalData?: PaceDataType;
  showRivals: boolean;
}

function Pace({data, rivalData, showRivals}: Props) {
  const [comparePair, setcompairPair] = useState<boolean>(true);
  const [second, setSecond] = useState<number>(
    data.chartData.length > 0 ? data.chartData.length - 1 : 0,
  );

  useEffect(() => {
    // 같이 달리기가 아니면 같이달리기 비교 X를 default로 두기
    if (!showRivals) setcompairPair(false);
  }, []);
  return (
    <S.Container>
      <PaceChart
        comparePair={comparePair}
        data={data}
        second={second}
        setSecond={setSecond}
        rivalData={rivalData}
        showRivals={showRivals}
      />
      <PaceRecord
        showRivals={showRivals}
        comparePair={comparePair}
        setCompairPair={setcompairPair}
        data={data.sectionPace}
        rivalData={rivalData?.sectionPace}
        second={second}
        setSecond={setSecond}
      />
    </S.Container>
  );
}
export default Pace;
