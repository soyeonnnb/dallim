import * as S from './PaceRecord.styles';
import {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import AlonePace from './AlonePace';

function PaceRecord() {
  return (
    <S.Container>
      <S.RecordBox>
        <AlonePace />
      </S.RecordBox>
      <S.Footer />
    </S.Container>
  );
}
export default PaceRecord;
