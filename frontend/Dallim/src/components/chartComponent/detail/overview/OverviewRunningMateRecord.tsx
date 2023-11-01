import * as S from './OverviewRunningMateRecord.styles';
import {characterData} from '@/components/common/CharacterData';

import SpeedIcon from '@/assets/icons/SpeedIcon';
import DistanceIcon from '@/assets/icons/DistanceIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import {useEffect, useState} from 'react';

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
            <RecordPreview type="speed" record={5} />
            <RecordPreview type="distance" record={5} />
            <RecordPreview type="time" record={5} />
          </S.Records>
        </S.Info>
      </S.InfoContainer>
      <S.Chart>
        <S.ChartTitle>페이스 비교</S.ChartTitle>
        <S.Text>곧 페이스 비교 차트가 추가될 예정이에요 😳</S.Text>
      </S.Chart>
    </S.Container>
  );
}

export default OverviewRunningMateRecord;

interface RecordPreviewProps {
  type: string;
  record: number;
}

function RecordPreview({type, record}: RecordPreviewProps) {
  const [unit, setUnit] = useState<string>('');

  useEffect(() => {
    setUnit(type === 'speed' ? 'Km/h' : type === 'distance' ? 'm' : '분');
  }, []);
  return (
    <S.RecordPreview>
      {type === 'speed' ? (
        <SpeedIcon width={30} height={30} color="white" />
      ) : type === 'distance' ? (
        <DistanceIcon width={30} height={30} color="white" />
      ) : (
        <ClockIcon width={30} height={30} color="white" />
      )}

      <S.RunningMateRecord>
        {record} {unit}
      </S.RunningMateRecord>
    </S.RecordPreview>
  );
}
