import {useEffect, useState} from 'react';

import * as S from './Overview.styles';
import {colors} from '@/components/common/globalStyles';

import ArrowRight from '@/assets/icons/ArrowRight';
import Run1Icon from '@/assets/icons/Run1Icon';
import Run2Icon from '@/assets/icons/Run2Icon';
import Run3Icon from '@/assets/icons/Run3Icon';

import {PaceDataType, RecordDetail, HeartChartDataType} from '@/apis/ChartApi';

import RunningMateRecord from './OverviewRunningMateRecord';
import OverviewGraph from './OverviewGraph';
import {itemType} from 'react-native-gifted-charts/src/LineChart/types';
import {
  numberToTwoString,
  calculatePace,
  secondToMinuteSeconds,
  meterToKMOrMeter,
} from '@/recoil/RunningData';

import Loading from '@/components/common/Loading';

interface Props {
  data?: RecordDetail;
  navigation: any;
  paceData?: PaceDataType;
  rivalPaceData?: PaceDataType;
  heartRateData: {
    chartData: HeartChartDataType[];
    secondPerHeartRateSection: number[];
  };
}

function Overview({
  data,
  navigation,
  paceData,
  rivalPaceData,
  heartRateData,
}: Props) {
  const [timeline, setTimeLine] = useState<string>('00:00:00 - 00:00:00');
  const [distance, setDistance] = useState<string>('');
  const [spendTime, setSpendTime] = useState<string>('00:00:00');
  const [avgPace, setAvgPace] = useState<string>();
  const [maxPace, setMaxPace] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const stringTimeAddSecond = (date: string, second: number) => {
    const createdDateTime = new Date(date);
    createdDateTime.setSeconds(createdDateTime.getSeconds() + second);
    return `${numberToTwoString(
      createdDateTime.getHours(),
    )}:${numberToTwoString(createdDateTime.getMinutes())}:${numberToTwoString(
      createdDateTime.getSeconds(),
    )}`;
  };

  const handleSetData = () => {
    if (data) {
      setTimeLine(
        `${data.createdAt.slice(11, 20)} - ${stringTimeAddSecond(
          data.createdAt,
          data.totalTime,
        )}`,
      );
      setDistance(meterToKMOrMeter(data.totalDistance, 2));
      setSpendTime(secondToMinuteSeconds(data.totalTime));
      setAvgPace(calculatePace(data.pace.averagePace));
      setMaxPace(calculatePace(data.pace.maxPace));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSetData();
  }, [data]);

  useEffect(() => {
    handleSetData();
  }, []);

  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <S.ArrowContainer />
          <S.MainContent showsVerticalScrollIndicator={false}>
            <S.TitleContainer>
              <S.Location>{data?.location}</S.Location>
              <S.FullTime>{timeline}</S.FullTime>
            </S.TitleContainer>
            <S.Records>
              <S.RecordBox>
                <Record
                  title="거리"
                  content={distance}
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
                  content={`${
                    data ? Math.round(data.heartRate.averageHeartRate) : 0
                  } bpm`}
                  titleColor="white"
                  contentColor={colors.neon.purple}
                />
                <Record
                  title="최대 심박수"
                  content={`${
                    data ? Math.round(data.heartRate.maxHeartRate) : 0
                  } bpm`}
                  titleColor="white"
                  contentColor={colors.neon.red}
                />
              </S.RecordBox>
            </S.Records>
            <S.WalkRecords>
              <WalkRecord
                type={1}
                record={data?.distancePerSpeed[0]}
                color={colors.neon.yellow}
              />
              <WalkRecord
                type={2}
                record={data?.distancePerSpeed[1]}
                color={colors.neon.green}
              />
              <WalkRecord
                type={3}
                record={data?.distancePerSpeed[2]}
                color={colors.neon.red}
              />
            </S.WalkRecords>
            <OverviewGraph title="페이스" data={paceData?.chartData} />
            <OverviewGraph title="심박수" data={heartRateData.chartData} />
            {data?.rivalRecord ? (
              <RunningMateRecord
                data={data.rivalRecord}
                paceData={paceData?.chartData}
                rivalPaceData={rivalPaceData?.chartData}
                navigation={navigation}
              />
            ) : (
              ''
            )}
            <S.Footer />
          </S.MainContent>
          <S.ArrowContainer>
            <ArrowRight width={20} height={20} color="white" />
          </S.ArrowContainer>
        </>
      )}
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
  record?: number;
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
      <S.WalkRecordContent>
        {record && (record === 0 ? '-' : meterToKMOrMeter(record))}
      </S.WalkRecordContent>
    </S.WalkRecordContainer>
  );
}
