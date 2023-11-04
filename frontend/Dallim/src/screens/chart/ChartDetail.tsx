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

import {RecordDetail} from '@/apis/ChartApi';
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

  const [paceData, setPaceData] = useState<{
    chartData: {
      value: number;
      second: number;
      fromZeroPace: string;
    }[];
    sectionPace: {
      startTime: number;
      finishTime: number;
      pace: number;
    }[];
  }>();
  const [heartRateData, setHeartRateData] = useState();

  const fetchRunningData = async () => {
    try {
      const getData = await fetchDetailRunningData(id);
      setData(getData);
      setIsLoading(false);
      if (data) setCreatedAt(getDateObject(data.createdAt));
      // 페이스에 들어갈 데이터 처리
      const getPaceData: {
        chartData: {value: number; second: number; fromZeroPace: string}[];
        sectionPace: {
          startTime: number;
          finishTime: number;
          pace: number;
        }[];
      } = {chartData: [], sectionPace: []};
      const cData: {second: number; value: number; fromZeroPace: string}[] = [];
      await getData.runningRecordInfos.map((record: any) => {
        const value: {second: number; value: number; fromZeroPace: string} = {
          second: 0,
          value: 0,
          fromZeroPace: '',
        };
        value.second = record.second;
        value.value = record.speed;
        value.fromZeroPace =
          record.distance == 0
            ? "00'00''" // 총 이동 거리가 0이면 0으로 나누어야 해서 NaN 발생
            : calculatePace(record.second, record.distance);
        cData.push(value);
      });
      getPaceData.chartData = cData;
      getPaceData.sectionPace = getData.pace.section;
      setPaceData(getPaceData);
      console.log('ChartApi: 달리기 기록 상세 조회 Axios 성공');
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
            {/* 왠지 라이브러리에서 데이터가 바뀌면 에러나는 느낌이 들어서
            데이터가 set 되었는지 확인 후, set 되었으면 렌더링하기 */}
            {paceData && (
              <Pace data={paceData} isAlone={data?.type === 'ALONE'} />
            )}
            <HeartRate />
          </ScrollView>
        </S.Container>
      )}
    </>
  );
}

export default ChartDetail;
