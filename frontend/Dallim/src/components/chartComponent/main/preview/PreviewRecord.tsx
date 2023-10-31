import React, {useEffect, useState} from 'react';
import * as S from './PreviewRecord.styles';
import {colors} from '@/components/common/globalStyles';

// icons
import NumberIcon from '@/assets/icons/NumberIcon';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import ClockIcon from '@/assets/icons/ClockIcon';

interface Props {
  type: 'week' | 'month';
  year?: number;
  month?: number;
  isShow: boolean;
}

function PreviewWeekly({isShow, type, year, month}: Props) {
  const [totalCount, setTotalCount] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  useEffect(() => {
    setTotalCount(5);
    setTotalDistance(15);
    setTotalTime(400);
  }, []);

  return (
    <S.Container isShow={isShow}>
      <S.Title>
        {type === 'week' ? '이번주' : `${year}년 ${month}월`} 기록
      </S.Title>
      <S.View>
        <S.RecordContainer>
          <WeeklyRecord type="count" record={totalCount} />
        </S.RecordContainer>
        <S.RecordContainer>
          <WeeklyRecord type="distance" record={totalDistance} />
        </S.RecordContainer>
        <S.RecordContainer>
          <WeeklyRecord type="time" record={totalTime} />
        </S.RecordContainer>
      </S.View>
    </S.Container>
  );
}

interface RecordProps {
  type: 'count' | 'distance' | 'time';
  record: number;
}

export function WeeklyRecord({type, record}: RecordProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('red');
  useEffect(() => {
    if (type === 'count') {
      setName('달린횟수');
      setContent(record + '번');
      setColor(colors.darkLavendar);
    } else if (type === 'distance') {
      setName('달린거리');
      setContent(record + 'KM');
      setColor(colors.lightBlue);
    } else {
      setName('달린시간');
      setContent(record + '분');
      setColor(colors.purpleBlue);
    }
  });

  return (
    <S.Component>
      <S.Circle bgColor={color}>
        {type === 'count' ? (
          <NumberIcon width={40} height={40} color={colors.lightLavender} />
        ) : type === 'distance' ? (
          <RunningThinIcon width={40} height={40} color={colors.darkLavendar} />
        ) : (
          <ClockIcon width={40} height={40} color={colors.lightLavender} />
        )}
      </S.Circle>
      <S.Name>{name}</S.Name>
      <S.Content>{content}</S.Content>
    </S.Component>
  );
}

export default PreviewWeekly;
