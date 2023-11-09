import * as S from './PairPace.styles';
import React, {useEffect, useState} from 'react';

// 타입 및 함수
import {secondToHourMinuteSeconds, calculatePace} from '@/recoil/RunningData';
import {PaceSectionType} from '@/apis/ChartApi';

// 아이콘
import ClockIcon from '@/assets/icons/ClockIcon';
import Run2Icons from '@/assets/icons/Run2Icon';

// 색
import {colors} from '@/components/common/globalStyles';

interface Props {
  data: PaceSectionType[];
  rivalData?: PaceSectionType[];
  second: number;
  setSecond: any;
}

function PairPace({data, rivalData, second, setSecond}: Props) {
  const [sectionNum, setSectionNum] = useState<number>(0);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  useEffect(() => {
    setSectionNum(data.length + 1);
  }, []);

  return (
    <S.Container
      contentContainerStyle={{
        alignItems: 'center',
      }}
      onLayout={onLayout}>
      <S.ScrollInBox height={(parentHeight / 2) * sectionNum}>
        <S.RecordBox>
          {data.map((record, rowIndex) => (
            <RecordPreviewBox
              parentHeight={parentHeight}
              key={rowIndex}
              record={record}
              color={
                rivalData && rivalData[rowIndex].pace >= record.pace
                  ? '#96B986'
                  : '#E4A4A4'
              }
            />
          ))}
        </S.RecordBox>
        <S.SectionBox>
          <S.SectionBar>
            <S.SectionCircles>
              {[...new Array(sectionNum)].map((x, rowIndex) => (
                <S.SectionCircle parentWidth={parentWidth} key={rowIndex}>
                  <S.SectionCircleText>{rowIndex}</S.SectionCircleText>
                </S.SectionCircle>
              ))}
            </S.SectionCircles>
          </S.SectionBar>
        </S.SectionBox>
        <S.RecordBox>
          {rivalData?.map((record, rowIndex) => (
            <RecordPreviewBox
              parentHeight={parentHeight}
              key={rowIndex}
              record={record}
              color={colors.grey._300}
            />
          ))}
        </S.RecordBox>
      </S.ScrollInBox>
    </S.Container>
  );
}

export default PairPace;

interface RecordPreviewBoxProps {
  parentHeight: number;
  record: any;
  color: string;
}

function RecordPreviewBox({
  parentHeight,
  record,
  color,
}: RecordPreviewBoxProps) {
  return (
    <S.Records parentHeight={parentHeight} bgColor={color}>
      <S.Record flex={0.2}>
        <ClockIcon width={20} height={20} color="white" />
        <Run2Icons width={20} height={20} color="white" />
      </S.Record>
      <S.Record flex={0.8}>
        <S.RecordContent>
          {secondToHourMinuteSeconds(record.finishTime - record.startTime)}
        </S.RecordContent>
        <S.RecordContent>{calculatePace(record.pace)}</S.RecordContent>
      </S.Record>
    </S.Records>
  );
}
