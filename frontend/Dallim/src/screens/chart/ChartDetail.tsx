import {useState, useEffect, useMemo} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as S from './ChartDetail.styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import {fetchDetailRunningData} from '@/apis/ChartApi';
// import Loading from '@/components/common/Loading_run';
import {Dimensions, View, Text} from 'react-native';

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

import {getDateObject} from '@/recoil/data/CalendarData';
import {calculatePace} from '@/recoil/data/RunningData';
import {colors} from '@/components/common/globalStyles';

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

const customLabel = (val: string) => {
  return (
    <View style={{width: 40}}>
      <Text style={{color: 'white'}}>{val}</Text>
    </View>
  );
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
  const [pagination, setPagination] = useState<number>(3);
  const [indexDot, setIndexDot] = useState<number>(0);
  const [headerTitle, setHeaderTitle] = useState<string>('Overview');

  const onChangeDot = (event: any) => {
    const index = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth);
    if (index === 1) {
      setHeaderTitle('페이스 차트');
    } else if (index === 2) {
      setHeaderTitle('심박수 차트');
    } else {
      setHeaderTitle(
        `${createdAt?.month}월 ${createdAt?.date}일 (${createdAt?.day})`,
      );
    }
    setIndexDot(index);
  };

  const runningInfosToPaceChartData = (
    data: RunningRecordData[],
  ): PaceChartDataType[] => {
    const cData: PaceChartDataType[] = [];
    data.map((record: any, index: number) => {
      const value: PaceChartDataType = {
        second: record.second,
        value: record.speed,
        fromZeroPace:
          record.distance == 0
            ? "0' 0''" // 총 이동 거리가 0이면 0으로 나누어야 해서 NaN 발생
            : calculatePace(record.second, record.distance),
        distance: record.distance,
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

      setPagination(getData.watchOrMobile === 'WATCH' ? 3 : 2);
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
          value: Math.floor(record.heartRate),
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
  const renderPagination = useMemo(() => {
    return (
      <S.Pagination>
        {Array.from({length: pagination}).map((_, index) => {
          return (
            <S.PaginationDot
              distance={3}
              startColor={
                index === indexDot ? `${colors.lightBlue._300}83` : '#ffffff83'
              }
              endColor={
                index === indexDot ? `${colors.lightBlue._300}12` : '#ffffff12'
              }
              paintInside={true}
              key={index}
              offset={[1, 0]}
              isFocused={index === indexDot}
            />
          );
        })}
      </S.Pagination>
    );
  }, [indexDot]);

  useEffect(() => {
    setHeaderTitle(
      `${createdAt?.month}월 ${createdAt?.date}일 (${createdAt?.day})`,
    );
  }, [createdAt]);

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover"
      />
      {isLoading || !data ? (
        // <Loading />
        <S.HeaderTitle>로딩중</S.HeaderTitle>
      ) : (
        <S.Container>
          <S.Header>
            <S.HeaderBox>
              <TouchableOpacity
                onPress={() => {
                  if (navigation.canGoBack()) navigation.goBack();
                }}>
                <ArrowLeft width={30} height={30} color="white" />
              </TouchableOpacity>
              <S.HeaderTitle>{headerTitle}</S.HeaderTitle>
              {/* 정렬을 맞추기 위함 */}
              <ArrowLeft width={30} height={30} color="transparent" />
            </S.HeaderBox>
            {renderPagination}
          </S.Header>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={onChangeDot}
            showsHorizontalScrollIndicator={false}
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
