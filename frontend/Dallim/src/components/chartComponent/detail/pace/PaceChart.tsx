import {useState, useEffect} from 'react';
import * as S from './PaceChart.styles';
import {secondToMinuteSeconds} from '@/recoil/RunningData';
import {LineChart} from 'react-native-gifted-charts';
import {View, Text} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import {PaceChartDataType, PaceDataType} from '@/apis/ChartApi';
import {computeMaxAndMinItems} from 'react-native-gifted-charts/src/utils';

interface Props {
  isPair: boolean;
  data: PaceDataType;
  rivalData?: PaceDataType;
  second: number;
  setSecond: any;
}

function PaceChart({isPair, data, rivalData, second, setSecond}: Props) {
  const [previewWidth, setPreviewWidth] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState<string>();
  const [previewPace, setPreviewPace] = useState<string>();
  const [previewTime2, setPreviewTime2] = useState<string>();
  const [previewPace2, setPreviewPace2] = useState<string>();
  const [maxValue, setMaxValue] = useState<number>();

  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  const handlePreviewWidth = (event: any) => {
    const {width} = event.nativeEvent.layout;
    setPreviewWidth(width);
  };

  // const handleGestureEvent = (event
  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // 차트의 특정 지점에 대한 데이터를 계산합니다.
      // 예시 코드이므로 실제로는 이벤트 데이터에 따라 다른 로직이 필요할 수 있습니다.
      // const dataIndex = calculateDataIndexFromGesture(event.nativeEvent);
      // const items = data.chartData[dataIndex];
      // setPreviewTime(secondToMinuteSeconds(items.second));
      // setPreviewPace(items.fromZeroPace);
      // // 'isPair' 상태가 true이고 rivalData가 있는 경우, 두 번째 데이터도 설정합니다.
      // if (isPair && rivalData) {
      //   const rivalItems = rivalData.chartData[dataIndex];
      //   setPreviewTime2(secondToMinuteSeconds(rivalItems.second));
      //   setPreviewPace2(rivalItems.fromZeroPace);
      // }
    }
  };
  const handlePreviewData = (pointerIndex: number) => {
    if (pointerIndex === -1) return;
    setPreviewTime(secondToMinuteSeconds(data.chartData[pointerIndex].second));
    setPreviewPace(data.chartData[pointerIndex].fromZeroPace);
    if (rivalData) {
      setPreviewTime2(
        secondToMinuteSeconds(rivalData.chartData[pointerIndex].second),
      );
      setPreviewPace2(rivalData.chartData[pointerIndex].fromZeroPace);
    } else {
      setPreviewTime2('');
      setPreviewPace2('');
    }
  };

  useEffect(() => {
    handlePreviewData(data.chartData.length - 1);
    let max = 0;
    data.chartData.map(d => {
      max = max > d.value ? max : d.value;
    });
    if (rivalData) {
      rivalData.chartData.map(d => {
        max = max > d.value ? max : d.value;
      });
    }
    setMaxValue(max * 1.1);
  }, []);

  return (
    <S.Container>
      <S.DataPreviewView onLayout={handlePreviewWidth}>
        <DataPreview
          width={previewWidth}
          borderColor="red"
          time={previewTime}
          pace={previewPace}
        />
        {isPair && (
          <DataPreview
            width={previewWidth}
            borderColor="yellow"
            time={previewTime2}
            pace={previewPace2}
          />
        )}
      </S.DataPreviewView>
      <S.ChartView>
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
          <S.ChartBox onLayout={onLayout}>
            {data.chartData && (
              <LineChart
                width={parentWidth * 0.9}
                height={parentHeight * 0.9}
                areaChart
                curved
                // 혼자 달리기 그래프
                // data={chartData} // 혼자 달리기 컴포넌트
                data={data.chartData}
                startFillColor="#D96767"
                startOpacity={1}
                endFillColor="#FF8080"
                endOpacity={0}
                color1="#FF1B1B"
                // 같이달리기 그래프
                data2={isPair ? rivalData?.chartData : undefined} // 같이달리기 컴포넌트
                startFillColor2="#FFD83A"
                startOpacity2={0.7}
                endFillColor2="#FFD83A"
                endOpacity2={0}
                color2="#FFCC00"
                yAxisTextStyle={{color: 'white'}}
                dashGap={0}
                rulesColor="rgba(255, 255, 255, 0.3)"
                noOfSections={4}
                xAxisColor={'rgba(255, 255, 255, 0.3)'}
                yAxisColor={'rgba(255, 255, 255, 0)'}
                hideDataPoints // 점 숨기기
                // hideYAxisText // y 라벨 없애기
                // hideAxesAndRules // 내부 선 및 y선 x선 없애기
                initialSpacing={0}
                adjustToWidth // width에 데이터 크기 맞추기
                // pointerConfig={}
                xAxisLabelTexts={['0%', '25%', '50%', '75%', '100%']}
                maxValue={maxValue}
                pointerConfig={{
                  pointerStripHeight: parentHeight,
                  pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: 'lightgray',
                  radius: 3,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: false,
                }}
                getPointerProps={({pointerIndex}: {pointerIndex: number}) => {
                  if (pointerIndex === -1) return;
                  return (
                    <Label2
                      data={data}
                      rivalData={rivalData}
                      isPair={isPair}
                      pointerIndex={pointerIndex}
                      setPreviewTime={setPreviewTime}
                      setPreviewPace={setPreviewPace}
                      setPreviewTime2={setPreviewTime2}
                      setPreviewPace2={setPreviewPace2}
                    />
                  );
                }}
              />
            )}
          </S.ChartBox>
        </PanGestureHandler>
      </S.ChartView>
    </S.Container>
  );
}
export default PaceChart;

interface DataPreviewProps {
  width: number;
  borderColor: string;
  time?: string;
  pace?: string;
}

function DataPreview({width, borderColor, time, pace}: DataPreviewProps) {
  return (
    <S.DataPreview width={width / 2.3} borderColor={borderColor}>
      <S.DataPreviewTime>{time}</S.DataPreviewTime>
      <S.DataPreviewPace>{pace}</S.DataPreviewPace>
    </S.DataPreview>
  );
}

function Label({
  items,
  setPreviewTime,
  setPreviewPace,
  setPreviewTime2,
  setPreviewPace2,
}: {
  items: any;
  setPreviewTime: any;
  setPreviewPace: any;
  setPreviewTime2: any;
  setPreviewPace2: any;
}) {
  useEffect(() => {
    setPreviewTime(secondToMinuteSeconds(items[0].second));
    setPreviewPace(items[0].fromZeroPace);
    if (items[1]) {
      setPreviewTime2(secondToMinuteSeconds(items[1].second));
      setPreviewPace2(items[1].fromZeroPace);
    } else {
      setPreviewTime2('');
      setPreviewPace2('');
    }
  }, [items]);
  return (
    <View
      style={{
        height: 80,
        width: 100,
        justifyContent: 'center',
        marginTop: -20,
        marginLeft: -40,
      }}>
      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          {items[0].value + 'm/s'}
        </Text>
      </View>
    </View>
  );
}
function Label2({
  data,
  rivalData,
  isPair,
  pointerIndex,
  setPreviewTime,
  setPreviewPace,
  setPreviewTime2,
  setPreviewPace2,
}: {
  data: any;
  rivalData: any;
  isPair: any;
  pointerIndex: any;
  setPreviewTime: any;
  setPreviewPace: any;
  setPreviewTime2: any;
  setPreviewPace2: any;
}) {
  useEffect(() => {
    const items = data.chartData[pointerIndex];
    setPreviewTime(secondToMinuteSeconds(items.second));
    setPreviewPace(items.fromZeroPace);
    // 'isPair' 상태가 true이고 rivalData가 있는 경우, 두 번째 데이터도 설정합니다.
    if (isPair && rivalData) {
      const rivalItems = rivalData.chartData[pointerIndex];
      setPreviewTime2(secondToMinuteSeconds(rivalItems.second));
      setPreviewPace2(rivalItems.fromZeroPace);
    }
  }, [pointerIndex]);
  return (
    <View
      style={{
        height: 80,
        width: 100,
        justifyContent: 'center',
        marginTop: -20,
        marginLeft: -40,
      }}>
      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
          {data.chartData[pointerIndex].value + 'm/s'}
        </Text>
      </View>
    </View>
  );
}
