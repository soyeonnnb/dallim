import * as S from './PaceRecord.styles';
import {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import AlonePace from './AlonePace';
import PairPace from './PairPace';
import {PaceSectionType} from '@/apis/ChartApi';

interface Props {
  isPair: boolean;
  data: PaceSectionType[];
  rivalData?: PaceSectionType[];
  second: number;
  setSecond: any;
}

function PaceRecord({isPair, data, rivalData, second, setSecond}: Props) {
  return (
    <S.Container>
      <S.RecordBox>
        {isPair ? (
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
