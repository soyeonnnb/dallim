import React, {useState, useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as S from './RunningMateChartList.styles';
import {TouchableOpacity, Dimensions} from 'react-native';
import {characterData} from '@/recoil/data/CharacterData';
// 컴포넌트
import Loading from '@/components/common/Loading_Run';
import OverviewGraph from '@/components/chartComponent/detail/overview/OverviewGraph';

// 아이콘
import ArrowLeft from '@/assets/icons/ArrowLeft';
import ClockIcon from '@/assets/icons/ClockIcon';
import RunningThinIcon from '@/assets/icons/RunningThinIcon';

// 함수
import {
  numberToTwoString,
  calculatePace,
  meterToKMOrMeter,
  secondToMinuteSeconds,
} from '@/recoil/data/RunningData';
import {fetchRunningMateRunningList} from '@/apis/ChartApi';
import {itemType} from 'react-native-gifted-charts/src/LineChart/types';
import {colors} from '@/components/common/globalStyles';
import CrownIcon from '@/assets/icons/CrownIcon';
import HeartIcon from '@/assets/icons/HeartIcon';
import FlagIcon from '@/assets/icons/FlagIcon';
import CryIcon from '@/assets/icons/CryIcon';

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
  winOrLose?: 'WIN' | 'LOSE' | 'GIVEUP';
  avgHeartRate?: number;
  rivalDistance?: string;
  characterIndex?: number;
  evolutionStage?: number;
}

function RunningMateChartList({route, navigation}: Props) {
  const {id} = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [datas, setDatas] = useState<showDataType[]>();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const fetchRunningDatas = async () => {
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
      const getDatas: {
        id: string;
        createdAt: string;
        mySpeed: number[];
        rivalSpeed: number[];
        totalTime: number;
        totalDistance: number;
        averageHeartRate: number;
        rivalTotalDistance: number;
        characterIndex: number;
        evolutionStage: number;
        winOrLose: 'WIN' | 'LOSE' | 'GIVEUP';
      }[] = await fetchRunningMateRunningList(id);

      const newData: showDataType[] = [];
      // 데이터 정제
      getDatas.map(record => {
        const d: showDataType = {id: ''};
        d.id = record.id;
        const date = new Date(record.createdAt);
        d.date = numberToTwoString(date.getDate());
        d.month = monthList[date.getMonth()];
        d.day = dayList[date.getDay()];
        const paceList: {value: number}[] = [];
        record.mySpeed.map(s => paceList.push({value: s}));
        d.paceList = paceList;
        if (record.winOrLose !== 'GIVEUP') {
          const rivalPaceList: {value: number}[] = [];
          record.rivalSpeed.map(s => rivalPaceList.push({value: s}));
          d.rivalPaceList = rivalPaceList;
        }
        d.totalDistance = meterToKMOrMeter(record.totalDistance, 1);
        d.avgPace = calculatePace(record.totalTime, record.totalDistance);
        d.totalTime = secondToMinuteSeconds(record.totalTime);
        d.avgHeartRate = Math.round(record.averageHeartRate);
        d.winOrLose = record.winOrLose;

        d.rivalDistance = meterToKMOrMeter(record.rivalTotalDistance);
        d.characterIndex = record.characterIndex;
        d.evolutionStage = record.evolutionStage;
        newData.push(d);
      });
      setDatas(newData);
      setSelectedIndex(0);
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
    fetchRunningDatas();
  }, []);

  useEffect(() => {
    fetchRunningDatas();
  }, [id]);

  const handleSetSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover"
      />
      {!isLoading && datas ? (
        <S.Container>
          <S.Header>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) navigation.goBack();
              }}>
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
                contentContainerStyle={{
                  paddingHorizontal: screenWidth * 0.1,
                  alignItems: 'center',
                }}>
                {datas.map((record, index) => (
                  <S.RunningDate
                    width={cardWidth}
                    key={index}
                    selected={index == selectedIndex}
                    onPress={() => handleSetSelectedIndex(index)}>
                    <S.RunningDateShadow
                      startColor={
                        index === selectedIndex
                          ? `${colors.yellow._500}75`
                          : `${colors.grey._50}00`
                      }
                      endColor={
                        index === selectedIndex
                          ? `${colors.yellow._500}35`
                          : `${colors.grey._50}75`
                      }
                      paintInside
                      distance={5}>
                      <S.RunningDateBox>
                        <S.RunningDateDay selected={index == selectedIndex}>
                          {record.day}
                        </S.RunningDateDay>
                        <S.RunningDateDate selected={index == selectedIndex}>
                          {record.date}
                        </S.RunningDateDate>
                        <S.RunningDateMonth selected={index == selectedIndex}>
                          {record.month}
                        </S.RunningDateMonth>
                      </S.RunningDateBox>
                    </S.RunningDateShadow>
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
                      id: datas[selectedIndex].id,
                    })
                  }>
                  <S.ChartNaviText>자세히보기</S.ChartNaviText>
                </S.ChartNavi>
              </S.ChartHeader>

              <OverviewGraph
                title=""
                data={datas[selectedIndex].paceList}
                data2={datas[selectedIndex]?.rivalPaceList}
                color1={colors.blue._500}
                color2={colors.red._200}
              />
            </S.ChartBox>
          </S.Middle>
          <S.Footer>
            <S.FooterHeader>
              <S.FooterHeaderTextMy>
                {datas[selectedIndex]?.totalDistance}
              </S.FooterHeaderTextMy>
              <S.FooterHeaderTextRival>
                / {datas[selectedIndex]?.rivalDistance}
              </S.FooterHeaderTextRival>
            </S.FooterHeader>
            <S.FooterMain>
              <S.FooterMainLeft>
                <S.Records>
                  <Record
                    Icon={ClockIcon}
                    title="시간"
                    content={datas[selectedIndex]?.totalTime}
                    color={colors.purple._500}
                  />
                  <Record
                    Icon={RunningThinIcon}
                    title="평균 페이스"
                    content={datas[selectedIndex]?.avgPace}
                    color={colors.lightBlue._500}
                  />
                  <Record
                    Icon={HeartIcon}
                    title="심박수"
                    content={datas[selectedIndex]?.avgHeartRate}
                    color={colors.pink._500}
                  />
                </S.Records>
              </S.FooterMainLeft>
              <S.FooterMainRight>
                <S.FooterMainRightView>
                  <S.FooterMainWin>
                    {datas[selectedIndex]?.winOrLose === 'WIN' ? (
                      <>
                        <CrownIcon
                          width={35}
                          height={35}
                          color={colors.yellow._500}
                        />
                        <S.FooterMainWinText color={colors.yellow._500}>
                          WIN
                        </S.FooterMainWinText>
                        <CrownIcon
                          width={35}
                          height={35}
                          color="rgba(0, 0, 0, 0)"
                        />
                      </>
                    ) : datas[selectedIndex]?.winOrLose === 'LOSE' ? (
                      <>
                        <CryIcon
                          width={35}
                          height={35}
                          color={colors.blue._500}
                        />
                        <S.FooterMainWinText color={colors.blue._500}>
                          LOSE
                        </S.FooterMainWinText>
                        <CryIcon
                          width={35}
                          height={35}
                          color="rgba(0, 0, 0, 0)"
                        />
                      </>
                    ) : (
                      <>
                        <FlagIcon
                          width={35}
                          height={35}
                          color={colors.lavendar._500}
                        />
                        <S.FooterMainWinText color={colors.lavendar._500}>
                          포기
                        </S.FooterMainWinText>
                        <FlagIcon
                          width={35}
                          height={35}
                          color="rgba(0, 0, 0, 0)"
                        />
                      </>
                    )}
                  </S.FooterMainWin>
                  <S.FooterMainView>
                    <S.FooterMainImageBox>
                      <CharacterGif
                        index={datas ? datas[selectedIndex]?.characterIndex : 0}
                        evolution={
                          datas ? datas[selectedIndex]?.evolutionStage : 0
                        }
                      />
                    </S.FooterMainImageBox>
                  </S.FooterMainView>
                </S.FooterMainRightView>
              </S.FooterMainRight>
            </S.FooterMain>
          </S.Footer>
        </S.Container>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default RunningMateChartList;
function CharacterGif({
  index = 0,
  evolution = 0,
}: {
  index?: number;
  evolution?: number;
}) {
  return (
    <S.StyledGif
      source={characterData[index].Evolutions[evolution].RunRight}
      resizeMode="contain"
    />
  );
}
function Record({
  Icon,
  title,
  content,
  color,
}: {
  Icon: any;
  title: string;
  content?: string | number;
  color: string;
}) {
  const [circleSize, setCircleSize] = useState<number>(0);

  const onLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setCircleSize(height);
  };

  return (
    <S.RecordView onLayout={onLayout}>
      <S.RecordLeft>
        <S.RecordIconCircle
          size={circleSize * 0.9}
          color={color}
          startColor={`${color}85`}
          endColor={`${color}12`}
          distance={7}>
          <Icon
            width={circleSize * 0.6}
            height={circleSize * 0.6}
            color="white"
          />
        </S.RecordIconCircle>
      </S.RecordLeft>
      <S.RecordRight>
        <S.RecordName>{title}</S.RecordName>
        <S.RecordContent>{content}</S.RecordContent>
      </S.RecordRight>
    </S.RecordView>
  );
}
