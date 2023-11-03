import * as S from './PaceRecord.styles';
import {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import AlonePace from './AlonePace';
import PairPace from './PairPace';

interface Props {
  isPair: boolean;
}

function PaceRecord({isPair}: Props) {
  return (
    <S.Container>
      <S.RecordBox>{isPair ? <PairPace /> : <AlonePace />}</S.RecordBox>
      <S.Footer />
    </S.Container>
  );
}
export default PaceRecord;
