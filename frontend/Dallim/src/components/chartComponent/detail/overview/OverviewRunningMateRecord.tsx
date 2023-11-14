import * as S from './OverviewRunningMateRecord.styles';
import {characterData} from '@/recoil/CharacterData';
import DistanceIcon from '@/assets/icons/DistanceIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import {PaceChartDataType, RecordDetail, RivalRecord} from '@/apis/ChartApi';
import {
  calculatePace,
  secondToMinuteSeconds,
  meterToKMOrMeter,
} from '@/recoil/RunningData';
import OverviewGraph from './OverviewGraph';
import {colors} from '@/components/common/globalStyles';

interface Props {
  data: RivalRecord;
  navigation: any;
  paceData?: PaceChartDataType[];
  rivalPaceData?: PaceChartDataType[];
  winOrLose: string;
}

function OverviewRunningMateRecord({
  data,
  navigation,
  paceData,
  rivalPaceData,
  winOrLose,
}: Props) {
  const characterImage =
    characterData[data.character.characterIndex].evolutions[
      data.character.evolutionStage
    ].front;
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>같이달린 러닝메이트</S.Title>
        {/* <S.Navi
          onPress={() =>
            navigation.push('RunningMateChartList', {id: data.id})
          }>
          <S.NaviText>더보기</S.NaviText>
        </S.Navi> */}
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
              color={colors.green._500}
            />
            <RecordPreview
              type="distance"
              record={meterToKMOrMeter(data.totalDistance, 2)}
              color={colors.yellow._500}
            />
            <RecordPreview
              type="time"
              record={secondToMinuteSeconds(data.totalTime)}
              color={colors.red._500}
            />
          </S.Records>
        </S.Info>
      </S.InfoContainer>
      {rivalPaceData && winOrLose !== 'GIVEUP' && (
        <OverviewGraph
          title="속도 비교"
          data={rivalPaceData}
          data2={paceData}
          color1={colors.pink._500}
          color2={colors.blue._500}
        />
      )}
    </S.Container>
  );
}

export default OverviewRunningMateRecord;

interface RecordPreviewProps {
  type: string;
  record: string;
  color: string;
}

function RecordPreview({type, record, color}: RecordPreviewProps) {
  return (
    <S.RecordPreview>
      <S.RecordIconCircle
        bgColor={color}
        startColor={`${color}84`}
        endColor={`${color}14`}
        distance={5}>
        {type === 'pace' ? (
          <RunningThinIcon width={30} height={30} color="white" />
        ) : type === 'distance' ? (
          <DistanceIcon width={30} height={30} color="white" />
        ) : (
          <ClockIcon width={30} height={30} color="white" />
        )}
      </S.RecordIconCircle>
      <S.RunningMateRecord>{record}</S.RunningMateRecord>
    </S.RecordPreview>
  );
}
