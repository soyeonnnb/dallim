import * as S from './MonthlyRecord.styles';
import {WeeklyRecord} from './PreviewRecord';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import ClockIcon from '@/assets/icons/ClockIcon';
import {colors} from '@/components/common/globalStyles';
import {characterData} from '@/recoil/CharacterData';
import {useEffect, useState} from 'react';
import {meterToKMOrMeter, secondToMinuteText} from '@/recoil/RunningData';

interface Props {
  selectedYearMonth: {
    year: number;
    month: number;
  };
  previewRecords: {
    count: number;
    distance: number;
    time: number;
    runningMate: {
      characterIndex: number;
      evolutionStage: number;
      nickname: string;
    };
  };
}
function MonthlyRecord({selectedYearMonth, previewRecords}: Props) {
  return (
    <S.Container>
      <S.Title>
        {selectedYearMonth.year}년 {selectedYearMonth.month}월 기록
      </S.Title>
      <S.View>
        <S.TotalCount>
          <WeeklyRecord type="count" record={previewRecords.count} />
        </S.TotalCount>
        <S.AverageCompares>
          <SmallRecord
            type="m"
            record={previewRecords.distance}
            count={previewRecords.count}
          />
          <SmallRecord
            type="분"
            record={previewRecords.time}
            count={previewRecords.count}
          />
        </S.AverageCompares>
      </S.View>
      <S.FriendView>
        {previewRecords.runningMate.nickname != '' ? (
          <>
            <S.CharacterView>
              <S.CharacterImage
                source={
                  characterData[previewRecords.runningMate.characterIndex]
                    .evolutions[previewRecords.runningMate.evolutionStage].front
                }
                resizeMode="contain"
              />
            </S.CharacterView>
            <S.FriendText>
              <S.FriendTitle>한달간 가장 많이 함께한 친구</S.FriendTitle>
              <S.FriendName>{previewRecords.runningMate.nickname}</S.FriendName>
            </S.FriendText>
          </>
        ) : (
          // 함께 달린 기록이 없을때
          <S.FriendText>
            <S.NoFriendText>함께 달린 기록이 없어요 😥</S.NoFriendText>
          </S.FriendText>
        )}
      </S.FriendView>
    </S.Container>
  );
}

interface SmallRecordProps {
  type: string;
  record: number;
  count: number;
}

function SmallRecord({type, record, count}: SmallRecordProps) {
  const [avg, setAvg] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  useEffect(() => {
    if (count === 0) {
      setTotal('0' + type);
      setAvg('0' + type);
      return;
    } else if (type === '거리') {
      setTotal(meterToKMOrMeter(record));
      setAvg(meterToKMOrMeter(record / count));
    } else {
      setTotal(secondToMinuteText(record));
      setAvg(secondToMinuteText(record / count));
    }
  }, [record, count]);
  return (
    <S.SmallContainer>
      <S.SmallCircle
        bgColor={type == 'm' ? colors.lightBlue : colors.purpleBlue}>
        {type == 'm' ? (
          <RunningThinIcon width={25} height={25} color={colors.darkLavendar} />
        ) : (
          <ClockIcon width={25} height={25} color={colors.lightLavender} />
        )}
      </S.SmallCircle>
      <S.SmallView>
        <S.SmallName>달린{type === 'm' ? '거리' : '시간'}</S.SmallName>
        <S.SmallContent>{total}</S.SmallContent>
      </S.SmallView>
      <S.SmallView>
        <S.SmallName>평균{type === 'm' ? '거리' : '시간'}</S.SmallName>
        <S.SmallContent>{avg}</S.SmallContent>
      </S.SmallView>
    </S.SmallContainer>
  );
}
export default MonthlyRecord;
