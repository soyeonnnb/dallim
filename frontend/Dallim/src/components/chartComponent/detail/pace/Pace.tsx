import * as S from './Pace.styles';
import {useState} from 'react';
import PaceChart from './PaceChart';
import PaceRecord from './PaceRecord';
import {Switch} from 'react-native-gesture-handler';

function Pace() {
  const [isPair, setIsPair] = useState<boolean>(true);

  const handleSetIsPairToggle = () => {
    setIsPair(!isPair);
  };
  return (
    <S.Container>
      {/* <S.Text>Pace 관련 페이지</S.Text>
      <S.Text>아직 개발중이에요😭</S.Text> */}
      <PaceChart />
      <S.ToggleBox>
        <S.ToggleText>같이 달리기 비교</S.ToggleText>
        <Switch onValueChange={handleSetIsPairToggle} value={isPair} />
      </S.ToggleBox>
      <PaceRecord />
    </S.Container>
  );
}
export default Pace;
