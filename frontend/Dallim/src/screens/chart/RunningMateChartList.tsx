import React, {useState, useEffect} from 'react';
import {RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as S from './RunningMateChartList.styles';
import {TouchableOpacity, Dimensions} from 'react-native';

// 컴포넌트
import Loading from '@/components/common/Loading';
import OverviewGraph from '@/components/chartComponent/detail/overview/OverviewGraph';

// 아이콘
import ArrowLeft from '@/assets/icons/ArrowLeft';

// 함수
import {
  numberToTwoString,
  calculatePace,
  secondToMinuteSeconds,
  meterToKMOrMeter,
} from '@/recoil/RunningData';
import {PaceChartDataType, fetchRunningMateRunningList} from '@/apis/ChartApi';
import {itemType} from 'react-native-gifted-charts/src/LineChart/types';
import {colors} from '@/components/common/globalStyles';
import {useEvent} from 'react-native-reanimated';

// 스택 내비게이션 타입을 정의
type RootStackParamList = {
  ChartDetail: {
    id: string;
  };
  RunningMateChartList: {
    id: string;
  };
};

type RunningMateChartListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RunningMateChartList'
>;

// 타입을 정의합니다.
type Props = {
  route: RouteProp<
    {RunningMateChartList: {id: string}},
    'RunningMateChartList'
  >;
  navigation: RunningMateChartListScreenNavigationProp;
};
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.2;

interface showDataType {
  id: string;
  date?: string;
  month?: string;
  day?: string;
  paceList?: itemType[];
  rivalPaceList?: itemType[];
  totalDistance?: string;
  totalTime?: string;
  avgPace?: string;
  avgHeartRate?: number;
}

function RunningMateChartList({route, navigation}: Props) {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<showDataType[]>();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const fetchRunningData = async () => {
    const monthList = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    try {
      const getData: {
        id: string;
        createdAt: string;
        mySpeed: number[];
        rivalSpeed: number[];
        totalTime: number;
        totalDistance: number;
        averageHeartRate: number;
      }[] = await fetchRunningMateRunningList(id);

      const newData: showDataType[] = [];
      // 데이터 정제
      getData.map(record => {
        const d: showDataType = {id: ''};
        d.id = record.id;
        const date = new Date(record.createdAt);
        d.date = numberToTwoString(date.getDate());
        d.month = monthList[date.getMonth()];
        d.day = dayList[date.getDay()];
        const paceList: {value: number}[] = [];
        record.mySpeed.map(s => paceList.push({value: s}));
        d.paceList = paceList;
        const rivalPaceList: {value: number}[] = [];
        record.rivalSpeed.map(s => rivalPaceList.push({value: s}));
        d.rivalPaceList = rivalPaceList;
        d.totalDistance = meterToKMOrMeter(record.totalDistance, 1);
        d.avgPace = calculatePace(record.totalTime, record.totalDistance);
        d.avgHeartRate = record.averageHeartRate;
        newData.push(d);
      });
      setData(newData);
      console.log('ChartApi: 러닝메이트와 달리기 기록 리스트 조회 Axios 성공');
      setIsLoading(false);
    } catch (error) {
      console.error(
        'ChartApi: 러닝메이트와 달리기 기록 리스트 조회 Axios 실패: ',
        error,
      );
    }
  };
  useEffect(() => {
    fetchRunningData();
  }, [useIsFocused]);

  useEffect(() => {
    fetchRunningData();
  }, []);

  useEffect(() => {
    fetchRunningData();
  }, [id]);

  const handleSetSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

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
            <S.HeaderTitle>러닝메이트 기록보기</S.HeaderTitle>
            <ArrowLeft width={30} height={30} color="transparent" />
          </S.Header>
          <S.Middle>
            <S.RunningListBox>
              <S.RunningList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: screenWidth * 0.1}}>
                {data.map((record, index) => (
                  <S.RunningDate
                    width={cardWidth}
                    key={index}
                    selected={index == selectedIndex}
                    onPress={() => handleSetSelectedIndex(index)}>
                    <S.RunningDateDay selected={index == selectedIndex}>
                      {record.day}
                    </S.RunningDateDay>
                    <S.RunningDateDate selected={index == selectedIndex}>
                      {record.date}
                    </S.RunningDateDate>
                    <S.RunningDateMonth selected={index == selectedIndex}>
                      {record.month}
                    </S.RunningDateMonth>
                  </S.RunningDate>
                ))}
              </S.RunningList>
            </S.RunningListBox>
            <S.ChartBox>
              <S.ChartHeader>
                <S.ChartName>페이스 비교</S.ChartName>
                <S.ChartNavi
                  onPress={() =>
                    navigation.push('ChartDetail', {
                      id: data[selectedIndex].id,
                    })
                  }>
                  <S.ChartNaviText>자세히보기</S.ChartNaviText>
                </S.ChartNavi>
              </S.ChartHeader>
              <OverviewGraph
                title=""
                data={data[selectedIndex].paceList}
                data2={data[selectedIndex].rivalPaceList}
              />
            </S.ChartBox>
          </S.Middle>
          <S.Footer>
            <S.Records>
              <S.RecordBox>
                <Record
                  title="거리"
                  content={data[selectedIndex].totalDistance}
                  titleColor="black"
                  contentColor={colors.neon.yellow}
                />
                <Record
                  title="시간"
                  content={data[selectedIndex].totalTime}
                  titleColor="black"
                  contentColor={colors.neon.skyBlue}
                />
              </S.RecordBox>
              <S.RecordBox>
                <Record
                  title="평균 페이스"
                  content={data[selectedIndex].avgPace}
                  titleColor="black"
                  contentColor={colors.neon.green}
                />
                <Record
                  title="평균 심박수"
                  content={`${data[selectedIndex].avgHeartRate} BPM`}
                  titleColor="black"
                  contentColor={colors.neon.pink}
                />
              </S.RecordBox>
            </S.Records>
          </S.Footer>
        </S.Container>
      )}
    </>
  );
}

export default RunningMateChartList;

interface RecordProps {
  title: string;
  content?: string;
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
