import * as S from './OverviewRunningMateRecord.styles';
import {characterData} from '@/recoil/CharacterData';

import SpeedIcon from '@/assets/icons/SpeedIcon';
import DistanceIcon from '@/assets/icons/DistanceIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import {RecordDetail, RivalRecord} from '@/apis/ChartApi';
import {calculatePace, secondToHourMinuteSeconds} from '@/recoil/RunningData';

interface Props {
  data: RivalRecord;
}

function OverviewRunningMateRecord({data}: Props) {
  const characterImage =
    characterData[data.character.characterIndex].levels[
      data.character.evolutionStage
    ].front;
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>같이달린 러닝메이트</S.Title>
        <S.Navi>더보기</S.Navi>
      </S.TitleContainer>
      <S.InfoContainer>
        <S.Nickname>{data.user.nickname}</S.Nickname>
        <S.Info>
          <S.CharacterView>
            <S.CharacterImage source={characterImage} resizeMode="contain" />
          </S.CharacterView>
          <S.Records>
            <RecordPreview
              type="pace"
              record={calculatePace(data.pace.averagePace)}
            />
            <RecordPreview type="distance" record={data.totalDistance + 'm'} />
            <RecordPreview
              type="time"
              record={secondToHourMinuteSeconds(data.totalTime)}
            />
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
  record: string;
}

function RecordPreview({type, record}: RecordPreviewProps) {
  return (
    <S.RecordPreview>
      {type === 'pace' ? (
        <RunningThinIcon width={30} height={30} color="white" />
      ) : type === 'distance' ? (
        <DistanceIcon width={30} height={30} color="white" />
      ) : (
        <ClockIcon width={30} height={30} color="white" />
      )}

      <S.RunningMateRecord>{record}</S.RunningMateRecord>
    </S.RecordPreview>
  );
}
