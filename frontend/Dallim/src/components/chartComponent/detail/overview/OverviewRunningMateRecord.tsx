import * as S from './OverviewRunningMateRecord.styles';
import {characterData} from '@/components/common/CharacterData';

import RunningThinIcon from '@/assets/icons/RunningThinIcon';

function OverviewRunningMateRecord() {
  const characterImage = characterData[2].levels[0].front;
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>같이달린 러닝메이트</S.Title>
        <S.Navi>더보기</S.Navi>
      </S.TitleContainer>
      <S.InfoContainer>
        <S.Nickname>팬더나는 다 팬다</S.Nickname>
        <S.Info>
          <S.CharacterView>
            <S.CharacterImage source={characterImage} resizeMode="contain" />
          </S.CharacterView>
          <S.Records>
            <RecordPreview />
            <RecordPreview />
            <RecordPreview />
          </S.Records>
        </S.Info>
      </S.InfoContainer>
      <S.Chart></S.Chart>
    </S.Container>
  );
}

export default OverviewRunningMateRecord;

function RecordPreview() {
  return (
    <>
      <RunningThinIcon width={20} height={20} color="white" />
      <S.RunningMateRecord>5 km/h</S.RunningMateRecord>
    </>
  );
}
