import * as S from './HeartRatePie.styles';
import {useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';

function HeartRatePie() {
  const data = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
  return (
    <S.Container>
      <PieChart data={data} />
      <S.Footer />
    </S.Container>
  );
}
export default HeartRatePie;
