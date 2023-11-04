import * as S from './PaceRecord.styles';
import {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import AlonePace from './AlonePace';
import PairPace from './PairPace';

interface Props {
  isPair: boolean;
  data: {
    startTime: number;
    finishTime: number;
    pace: number;
  }[];
  rivalData?: {
    startTime: number;
    finishTime: number;
    pace: number;
  }[];
}

function PaceRecord({isPair, data, rivalData}: Props) {
  return (
    <S.Container>
      <S.RecordBox>
        {isPair ? (
          <PairPace data={data} rivalData={data} />
        ) : (
          <AlonePace data={data} />
        )}
      </S.RecordBox>
      <S.Footer />
    </S.Container>
  );
}
export default PaceRecord;
