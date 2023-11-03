import * as S from './MonthlyRecord.styles';
import {WeeklyRecord} from './PreviewRecord';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import {colors} from '@/components/common/globalStyles';
import {characterData} from '@/recoil/CharacterData';

interface Props {
  year: number;
  month: number;
}
function MonthlyRecord({year, month}: Props) {
  const characterImage = characterData[2].evolutions[0].front;
  return (
    <S.Container>
      <S.Title>
        {year}년 {month}월 기록
      </S.Title>
      <S.View>
        <S.TotalCount>
          <WeeklyRecord type="count" record={2} />
        </S.TotalCount>
        <S.AverageCompares>
          <SmallRecord type="거리" record={30} avgRecord={3} />
          <SmallRecord type="시간" record={400} avgRecord={40} />
        </S.AverageCompares>
      </S.View>
      <S.FriendView>
        <S.CharacterView>
          <S.CharacterImage source={characterImage} resizeMode="contain" />
        </S.CharacterView>
        <S.FriendText>
          <S.FriendTitle>한달간 가장 많이 함께한 친구</S.FriendTitle>
          <S.FriendName>하늘을 나는 병알</S.FriendName>
        </S.FriendText>
      </S.FriendView>
    </S.Container>
  );
}

interface SmallRecordProps {
  type: string;
  record: number;
  avgRecord: number;
}

function SmallRecord({type, record, avgRecord}: SmallRecordProps) {
  return (
    <S.SmallContainer>
      <S.SmallCircle
        bgColor={type == '거리' ? colors.lightBlue : colors.purpleBlue}>
        {type == '거리' ? (
          <RunningThinIcon width={25} height={25} color={colors.darkLavendar} />
        ) : (
          <ClockIcon width={25} height={25} color={colors.lightLavender} />
        )}
      </S.SmallCircle>
      <S.SmallView>
        <S.SmallName>달린{type}</S.SmallName>
        <S.SmallContent>
          {record}
          {type === '거리' ? 'KM' : '분'}
        </S.SmallContent>
      </S.SmallView>
      <S.SmallView>
        <S.SmallName>평균{type}</S.SmallName>
        <S.SmallContent>
          {record}
          {type === '거리' ? 'm' : '분'}
        </S.SmallContent>
      </S.SmallView>
    </S.SmallContainer>
  );
}
export default MonthlyRecord;
