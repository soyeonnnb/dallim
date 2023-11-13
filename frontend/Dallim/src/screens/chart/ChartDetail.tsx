import React, {useState, useEffect} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as S from './ChartDetail.styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import {fetchDetailRunningData} from '@/apis/ChartApi';
// import Loading from '@/components/common/Loading_run';
import {Dimensions} from 'react-native';

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
  PaceDataType,
} from '@/apis/ChartApi';

import {getDateObject} from '@/recoil/CalendarData';
import {calculatePace} from '@/recoil/RunningData';

// 스택 내비게이션 타입을 정의
type RootStackParamList = {
  ChartDetail: {
    id: string;
  };
  RunningMateChartList: {
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
  const windowWidth = Dimensions.get('window').width;
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
  const [showRivals, setShowRivals] = useState<boolean>(false);
  const [paceData, setPaceData] = useState<PaceDataType>();
  const [rivalPaceData, setRivalPaceData] = useState<PaceDataType>();
  const [heartRateData, setHeartRateData] = useState<{
    chartData: HeartChartDataType[];
    secondPerHeartRateSection: number[];
  }>({chartData: [], secondPerHeartRateSection: []});
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
    setIsLoading(true);
    try {
      const getData = await fetchDetailRunningData(id);
      setData(getData);
      // 혼자 달렸거나 포기한 경우에는 rival 기록이 보이지 않게
      setShowRivals(
        !(getData.type === 'ALONE' || getData.winOrLose === 'GIVEUP'),
      );
      setCreatedAt(getDateObject(getData.createdAt));

      // 페이스에 들어갈 데이터 처리
      setPaceData({
        chartData: runningInfosToPaceChartData(getData.runningRecordInfos),
        sectionPace: getData.pace.section,
      });

      // 같이 달리면서 포기하지 않은 경우, 러닝메이트 데이터 처리
      if (getData.type === 'PAIR' && getData.winOrLose !== 'GIVEUP') {
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
    fetchRunningData();
  }, []);

  const handleScroll = ({nativeEvent}: any) => {
    // page index
    const index = Math.round(nativeEvent.contentOffset.x / windowWidth);
    setCurrentIndex(index);
    console.log(index);
  };

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover"
      />
      {isLoading || !data ? (
        <S.Header />
      ) : (
        <S.Container>
          <S.Header>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowLeft width={30} height={30} color="white" />
            </TouchableOpacity>
            <S.HeaderTitle>
              {createdAt?.month}월 {createdAt?.date}일 ({createdAt?.day})
            </S.HeaderTitle>
            {/* 정렬을 맞추기 위함 */}
            <ArrowLeft width={30} height={30} color="transparent" />
          </S.Header>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={handleScroll}
            contentOffset={{x: 0, y: 0}}>
            {data && (
              <Overview
                data={data}
                navigation={navigation}
                paceData={paceData}
                rivalPaceData={rivalPaceData}
                heartRateData={heartRateData}
              />
            )}
            {paceData && (
              <Pace
                data={paceData}
                showRivals={showRivals}
                rivalData={rivalPaceData}
              />
            )}
            {/* mobile인 경우에는 심박수 보이지 않도록 */}
            {heartRateData && data.watchOrMobile === 'WATCH' && (
              <HeartRate data={heartRateData} />
            )}
          </ScrollView>
        </S.Container>
      )}
    </>
  );
}

export default ChartDetail;
