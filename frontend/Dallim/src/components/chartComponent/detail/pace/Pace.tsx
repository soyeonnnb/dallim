import * as S from './Pace.styles';
import {useState} from 'react';
import PaceChart from './PaceChart';
import PaceRecord from './PaceRecord';
import {Switch} from 'react-native-gesture-handler';

import {RecordDetail} from '@/apis/ChartApi';

interface Props {
  // data: {
  //   fromZeroPace: string[];
  //   nowSpeed: number[];
  //   sectionPace: {}[];
  // };
  data: {
    chartData: {
      value: number;
      second: number;
      fromZeroPace: string;
    }[];
    sectionPace: {}[];
  };
  isAlone: boolean;
}

function Pace({data, isAlone}: Props) {
  const [isPair, setIsPair] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(
    data.chartData.length > 0 ? data.chartData.length - 1 : 0,
  );

  const handleSetIsPairToggle = () => {
    setIsPair(!isPair);
  };
  return (
    <S.Container>
      <PaceChart
        isPair={isPair}
        data={data}
        second={second}
        setSecond={setSecond}
      />
      <S.ToggleBox>
        {!isAlone && (
          <>
            <S.ToggleText>같이 달리기 비교</S.ToggleText>
            <Switch onValueChange={handleSetIsPairToggle} value={isPair} />
          </>
        )}
      </S.ToggleBox>
      <PaceRecord isPair={isPair} />
    </S.Container>
  );
}
export default Pace;
