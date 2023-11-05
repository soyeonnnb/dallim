import * as S from './Pace.styles';
import {useState, useEffect} from 'react';
import PaceChart from './PaceChart';
import PaceRecord from './PaceRecord';
import {Switch} from 'react-native-gesture-handler';

import {PaceChartDataType, PaceSectionType} from '@/apis/ChartApi';

interface Props {
  data: {
    chartData: PaceChartDataType[];
    sectionPace: PaceSectionType[];
  };
  rivalData?: {
    chartData: PaceChartDataType[];
    sectionPace: PaceSectionType[];
  };
  isAlone: boolean;
}

function Pace({data, rivalData, isAlone}: Props) {
  const [comparePair, setcompairPair] = useState<boolean>(true);
  const [second, setSecond] = useState<number>(
    data.chartData.length > 0 ? data.chartData.length - 1 : 0,
  );

  const handleSetIsPairToggle = () => {
    setcompairPair(!comparePair);
  };

  useEffect(() => {
    if (isAlone) setcompairPair(false);
  }, []);
  return (
    <S.Container>
      <PaceChart
        isPair={comparePair}
        data={data}
        second={second}
        setSecond={setSecond}
        rivalData={rivalData}
      />
      <S.ToggleBox>
        {!isAlone && (
          <>
            <S.ToggleText>같이 달리기 비교</S.ToggleText>
            <Switch onValueChange={handleSetIsPairToggle} value={comparePair} />
          </>
        )}
      </S.ToggleBox>
      <PaceRecord
        isPair={comparePair}
        data={data.sectionPace}
        rivalData={rivalData?.sectionPace}
        second={second}
        setSecond={setSecond}
      />
    </S.Container>
  );
}
export default Pace;
