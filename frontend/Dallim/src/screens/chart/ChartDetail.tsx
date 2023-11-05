import React, {useState, useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as S from './ChartDetail.styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import {fetchDetailRunningData} from '@/apis/ChartApi';
import Loading from '@/components/common/Loading';

// 컴포넌트
import Overview from '@/components/chartComponent/detail/overview/Overview';
import Pace from '@/components/chartComponent/detail/pace/Pace';
import HeartRate from '@/components/chartComponent/detail/heartRate/HeartRate';

import ArrowLeft from '@/assets/icons/ArrowLeft';

import {
  RecordDetail,
  PaceChartDataType,
  PaceSectionType,
  HeartChartDataType,
  RunningRecordData,
} from '@/apis/ChartApi';

import {getDateObject} from '@/recoil/CalendarData';
import {calculatePace} from '@/recoil/RunningData';
// 스택 내비게이션 타입을 정의
type RootStackParamList = {
  ChartDetail: {
    id: string;
  };
};

type ChartDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChartDetail'
>;

// 타입을 정의합니다.
type Props = {
  route: RouteProp<{ChartDetail: {id: string}}, 'ChartDetail'>;
  navigation: ChartDetailScreenNavigationProp;
};

type PaceDataType = {
  chartData: PaceChartDataType[];
  sectionPace: PaceSectionType[];
};

function ChartDetail({route, navigation}: Props) {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<RecordDetail>();
  const [createdAt, setCreatedAt] = useState<{
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
    second?: number;
    day?: string;
  }>();
  const [isAlone, setIsAlone] = useState<boolean>(true);
  const [paceData, setPaceData] = useState<PaceDataType>();
  const [rivalPaceData, setRivalPaceData] = useState<PaceDataType>();
  const [heartRateData, setHeartRateData] = useState<{
    chartData: HeartChartDataType[];
    secondPerHeartRateSection: number[];
  }>();

  const runningInfosToPaceChartData = (
    data: RunningRecordData[],
  ): PaceChartDataType[] => {
    const cData: PaceChartDataType[] = [];
    data.map((record: any) => {
      const value: PaceChartDataType = {
        second: record.second,
        value: record.speed,
        fromZeroPace:
          record.distance == 0
            ? "0' 0''" // 총 이동 거리가 0이면 0으로 나누어야 해서 NaN 발생
            : calculatePace(record.second, record.distance),
      };
      cData.push(value);
    });
    return cData;
  };

  const fetchRunningData = async () => {
    try {
      const getData = await fetchDetailRunningData(id);
      setData(getData);
      setIsAlone(getData.type === 'ALONE');
      setCreatedAt(getDateObject(getData.createdAt));

      // 페이스에 들어갈 데이터 처리
      setPaceData({
        chartData: runningInfosToPaceChartData(getData.runningRecordInfos),
        sectionPace: getData.pace.section,
      });

      // 같이 달린 경우, 러닝메이트 데이터 처리
      if (getData.type === 'PAIR') {
        setRivalPaceData({
          chartData: runningInfosToPaceChartData(
            getData.rivalRecord.runningRecordInfos,
          ),
          sectionPace: getData.rivalRecord.pace.section,
        });
      }

      // 심박수에 들어갈 데이터 처리
      const hData: HeartChartDataType[] = [];

      await getData.runningRecordInfos.map((record: any) => {
        const value: HeartChartDataType = {
          second: record.second,
          value: record.heartRate,
        };
        hData.push(value);
      });

      const getHeartRateData: {
        chartData: HeartChartDataType[];
        secondPerHeartRateSection: number[];
      } = {
        chartData: hData,
        secondPerHeartRateSection: getData.heartRate.secondPerHeartRateSection,
      };

      setHeartRateData(getHeartRateData);
      console.log('ChartApi: 달리기 기록 상세 조회 Axios 성공');
      setIsLoading(false);
    } catch (error) {
      console.error('ChartApi: 달리기 기록 상세 조회 Axios 실패: ', error);
    }
  };

  useEffect(() => {
    if (data) setCreatedAt(getDateObject(data.createdAt));
  }, [data]);

  useEffect(() => {
    fetchRunningData();
  }, []);

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover"
      />
      {isLoading || !data ? (
        <Loading />
      ) : (
        <S.Container>
          <S.Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft width={30} height={30} color="white" />
            </TouchableOpacity>
            <S.HeaderTitle>
              {createdAt?.month}월 {createdAt?.date}일 ({createdAt?.day})
            </S.HeaderTitle>
            {/* 정렬을 맞추기 위함 */}
            <ArrowLeft width={30} height={30} color="transparent" />
          </S.Header>
          <ScrollView horizontal pagingEnabled>
            {data && <Overview data={data} />}
            {paceData && (
              <Pace
                data={paceData}
                isAlone={isAlone}
                rivalData={rivalPaceData}
              />
            )}
            {heartRateData && <HeartRate data={heartRateData} />}
          </ScrollView>
        </S.Container>
      )}
    </>
  );
}

export default ChartDetail;
