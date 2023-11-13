import * as S from './PaceRecord.styles';
import {Switch} from 'react-native-gesture-handler';

import AlonePace from './AlonePace';
import PairPace from './PairPace';
import {PaceSectionType} from '@/apis/ChartApi';
import {colors} from '@/components/common/globalStyles';

interface Props {
  comparePair: boolean; // 같이달리기 비교할건지
  setCompairPair: any;
  data: PaceSectionType[];
  rivalData?: PaceSectionType[];
  second: number;
  setSecond: any;
  showRivals: boolean;
}

function PaceRecord({
  comparePair,
  setCompairPair,
  data,
  rivalData,
  second,
  setSecond,
  showRivals,
}: Props) {
  const handleSetIsPairToggle = () => {
    setCompairPair(!comparePair);
  };
  return (
    <S.Container>
      <S.ToggleBox>
        {showRivals && (
          <>
            <S.ToggleText>같이 달리기 비교</S.ToggleText>
            <Switch
              onValueChange={handleSetIsPairToggle}
              value={comparePair}
              trackColor={{
                false: colors.darkBlue._100,
                true: colors.pink._300,
              }}
              thumbColor={comparePair ? colors.pink._500 : colors.darkBlue._300}
            />
          </>
        )}
      </S.ToggleBox>
      <S.RecordBox>
        {comparePair && rivalData ? (
          <PairPace
            data={data}
            rivalData={rivalData}
            second={second}
            setSecond={setSecond}
          />
        ) : (
          <AlonePace data={data} second={second} setSecond={setSecond} />
        )}
      </S.RecordBox>
      <S.Footer />
    </S.Container>
  );
}
export default PaceRecord;
