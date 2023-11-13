import React, {useEffect, useState} from 'react';
import * as S from './PreviewRecord.styles';
import {colors} from '@/components/common/globalStyles';

// icons
import NumberIcon from '@/assets/icons/NumberIcon';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import ClockIcon from '@/assets/icons/ClockIcon';

import {meterToKMOrMeter, secondToMinuteText} from '@/recoil/RunningData';

interface Props {
  type: 'week' | 'month';
  year: number;
  month: number;
  isShow: boolean;
  previewRecords: {
    count: number;
    distance: number;
    time: number;
  };
}

function PreviewWeekly({isShow, type, year, month, previewRecords}: Props) {
  return (
    <S.Container isShow={isShow}>
      <S.Title>
        {type === 'week' ? '이번주' : `${year}년 ${month}월`} 기록
      </S.Title>
      <S.View>
        <S.RecordContainer>
          <WeeklyRecord type="count" record={previewRecords.count} />
        </S.RecordContainer>
        <S.RecordContainer>
          <WeeklyRecord type="distance" record={previewRecords.distance} />
        </S.RecordContainer>
        <S.RecordContainer>
          <WeeklyRecord type="time" record={previewRecords.time} />
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
  const [color, setColor] = useState('white');
  useEffect(() => {
    if (type === 'count') {
      setName('달린횟수');
      setContent(record + '번');
      setColor(colors.blue._100);
    } else if (type === 'distance') {
      setName('달린거리');
      setContent(meterToKMOrMeter(record));
      setColor('#A3B4F0');
    } else {
      setName('달린시간');
      setContent(secondToMinuteText(record));
      setColor('#C3A9F6');
    }
  });

  return (
    <S.Component>
      <S.CircleShadow
        distance={3}
        startColor={`${color}76`}
        endColor={`${color}33`}
        offset={[0, 2]}>
        <S.Circle bgColor={color}>
          {type === 'count' ? (
            <NumberIcon width={30} height={30} color="white" stroke={2} />
          ) : type === 'distance' ? (
            <RunningThinIcon width={30} height={30} color="white" stroke={2} />
          ) : (
            <ClockIcon width={30} height={30} color="white" />
          )}
        </S.Circle>
      </S.CircleShadow>
      <S.Name>{name}</S.Name>
      <S.Content>{content}</S.Content>
    </S.Component>
  );
}

export default PreviewWeekly;
