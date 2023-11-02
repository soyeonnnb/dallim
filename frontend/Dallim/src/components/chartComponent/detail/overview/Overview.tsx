import {useEffect, useState} from 'react';

import * as S from './Overview.styles';
import {colors} from '@/components/common/globalStyles';

import ArrowRight from '@/assets/icons/ArrowRight';
import Run1Icon from '@/assets/icons/Run1Icon';
import Run2Icon from '@/assets/icons/Run2Icon';
import Run3Icon from '@/assets/icons/Run3Icon';

import {RecordDetail} from '@/apis/ChartApi';

import RunningMateRecord from './OverviewRunningMateRecord';
import OverviewGraph from './OverviewGraph';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

interface Props {
  data?: RecordDetail;
}

function Overview({data}: Props) {
  const [timeline, setTimeLine] = useState<string>('00:00:00 - 00:00:00');
  const [totalDistance, setTotalDistance] = useState<string>('5200m');
  const [spendTime, setSpendTime] = useState<string>('00:00:00');
  const [avgPace, setAvgPace] = useState<string>("22'22''");
  const [maxPace, setMaxPace] = useState<string>("33'33''");
  const [avgHeartRate, setAvgHeartRate] = useState<string>('99 BPM');
  const [maxHeartRate, setMaxHeartRate] = useState<string>('140 BPM');
  const [run1Distance, setRun1Distance] = useState<number>(1);
  const [run2Distance, setRun2Distance] = useState<number>(2);
  const [run3Distance, setRun3Distance] = useState<number>(3);

  useEffect(() => {}, [data]);
  return (
    <S.Container>
      <S.ArrowContainer>
        {/* 맨 첫 페이지라서 왼쪽 화살표 X */}
        {/* <ArrowLeft width={20} height={20} color="black" /> */}
      </S.ArrowContainer>
      <S.MainContent showsVerticalScrollIndicator={false}>
        <S.TitleContainer>
          <S.Location>{data?.location}</S.Location>
          <S.FullTime>{timeline}</S.FullTime>
        </S.TitleContainer>
        <S.Records>
          <S.RecordBox>
            <Record
              title="거리"
              content={totalDistance}
              titleColor="white"
              contentColor={colors.neon.yellow}
            />
            <Record
              title="시간"
              content={spendTime}
              titleColor="white"
              contentColor={colors.neon.skyBlue}
            />
          </S.RecordBox>
          <S.RecordBox>
            <Record
              title="평균 페이스"
              content={avgPace}
              titleColor="white"
              contentColor={colors.neon.green}
            />
            <Record
              title="최대 페이스"
              content={maxPace}
              titleColor="white"
              contentColor={colors.neon.pink}
            />
          </S.RecordBox>
          <S.RecordBox>
            <Record
              title="평균 심박수"
              content={avgHeartRate}
              titleColor="white"
              contentColor={colors.neon.purple}
            />
            <Record
              title="최대 심박수"
              content={maxHeartRate}
              titleColor="white"
              contentColor={colors.neon.red}
            />
          </S.RecordBox>
        </S.Records>
        <S.WalkRecords>
          <WalkRecord
            type={1}
            record={run1Distance}
            color={colors.neon.yellow}
          />
          <WalkRecord
            type={2}
            record={run2Distance}
            color={colors.neon.green}
          />
          <WalkRecord type={3} record={run3Distance} color={colors.neon.red} />
        </S.WalkRecords>
        <OverviewGraph title="페이스" />
        <OverviewGraph title="심박수" />
        <RunningMateRecord />
      </S.MainContent>
      <S.ArrowContainer>
        <ArrowRight width={20} height={20} color="white" />
      </S.ArrowContainer>
    </S.Container>
  );
}
export default Overview;

interface RecordProps {
  title: string;
  content?: string | number;
  titleColor: string;
  contentColor: string;
}

function Record({title, content, titleColor, contentColor}: RecordProps) {
  return (
    <S.RecordContainer>
      <S.RecordTitle color={titleColor}>{title}</S.RecordTitle>
      <S.RecordContent color={contentColor}>{content}</S.RecordContent>
    </S.RecordContainer>
  );
}

interface WalkRecordProps {
  type: number;
  record: number;
  color: string;
}

function WalkRecord({type, record, color}: WalkRecordProps) {
  const [title, setTitle] = useState<string>('');
  const [iconSize, setIconSize] = useState<number>(0);
  useEffect(() => {
    setIconSize(45);
    if (type === 1) {
      setTitle('걷기');
    } else if (type === 2) {
      setTitle('천천히 뛰기');
    } else {
      setTitle('빠르게 뛰기');
    }
  });
  return (
    <S.WalkRecordContainer>
      {type === 1 ? (
        <Run1Icon width={iconSize} height={iconSize} color={color} />
      ) : type === 2 ? (
        <Run2Icon width={iconSize} height={iconSize} color={color} />
      ) : (
        <Run3Icon width={iconSize} height={iconSize} color={color} />
      )}
      <S.WalkRecordTitle>{title}</S.WalkRecordTitle>
      <S.WalkRecordContent>{record} m</S.WalkRecordContent>
    </S.WalkRecordContainer>
  );
}
