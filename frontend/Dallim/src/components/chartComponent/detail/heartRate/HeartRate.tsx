import * as S from './HeartRate.styles';

import HeartRateGraph from './HeartRateGraph';
import HeartRatePie from './HeartRatePie';

function HeartRate() {
  return (
    <S.Container>
      {/* <S.Text>Pace 관련 페이지</S.Text>
    <S.Text>아직 개발중이에요😭</S.Text> */}
      <HeartRateGraph />
      <HeartRatePie />
    </S.Container>
  );
}
export default HeartRate;
