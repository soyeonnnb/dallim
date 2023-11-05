import * as S from './OverviewRunningMateRecord.styles';
import {characterData} from '@/recoil/CharacterData';
import {useNavigation} from '@react-navigation/native';
import SpeedIcon from '@/assets/icons/SpeedIcon';
import DistanceIcon from '@/assets/icons/DistanceIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import {RecordDetail, RivalRecord} from '@/apis/ChartApi';
import {calculatePace, secondToHourMinuteSeconds} from '@/recoil/RunningData';
import OverviewGraph from './OverviewGraph';
import {itemType} from 'react-native-gifted-charts/src/LineChart/types';
import {useState, useEffect} from 'react';

interface Props {
  paceList: itemType[];
  data: RivalRecord;
}

function OverviewRunningMateRecord({paceList, data}: Props) {
  const [rivalPaceData, setRivalPaceData] = useState<itemType[]>();
  const navigation = useNavigation();
  useEffect(() => {
    const paceData: itemType[] = [];
    data.runningRecordInfos.map(record => {
      paceData.push({
        value: record.speed,
      });
    });
    setRivalPaceData(paceData);
  }, []);
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>같이달린 러닝메이트</S.Title>
        <S.Navi
          onPress={() =>
            navigation.navigate('RunningMateChartList', {id: data.id})
          }>
          <S.NaviText>더보기</S.NaviText>
        </S.Navi>
      </S.TitleContainer>
      <S.InfoContainer>
        <S.Nickname>{data.user.nickname}</S.Nickname>
        <S.Info>
          <S.CharacterView>
            <S.CharacterImage
              source={
                characterData[data.character.characterIndex].evolutions[
                  data.character.evolutionStage
                ].front
              }
              resizeMode="contain"
            />
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
      {rivalPaceData && (
        <OverviewGraph
          title="페이스 비교"
          data={paceList}
          data2={rivalPaceData}
        />
      )}
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
