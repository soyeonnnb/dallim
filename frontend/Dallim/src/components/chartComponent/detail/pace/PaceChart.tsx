import {useState, useEffect} from 'react';
import * as S from './PaceChart.styles';
import {secondToHourMinuteSeconds} from '@/recoil/RunningData';
import {LineChart} from 'react-native-gifted-charts';
import {View, Text} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
interface Props {
  isPair: boolean;
  data: {
    chartData: {
      value: number;
      second: number;
      fromZeroPace: string;
    }[];
    sectionPace: {}[];
  };
  second: number;
  setSecond: any;
}

function PaceChart({isPair, data, second, setSecond}: Props) {
  const [previewWidth, setPreviewWidth] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState<string>();
  const [previewPace, setPreviewPace] = useState<string>();

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

  const handleGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // 이곳에서 ChartBox를 가로로 스크롤하도록 처리합니다.
      // event.nativeEvent.translationX를 사용하여 가로 스크롤 이동을 처리할 수 있습니다.
    }
  };

  const handlePreviewData = (item: {
    value: number;
    second: number;
    fromZeroPace: string;
  }) => {
    setPreviewTime(secondToHourMinuteSeconds(item.second));
    setPreviewPace(item.fromZeroPace);
  };

  useEffect(() => {
    handlePreviewData(data.chartData[data.chartData.length - 1]);
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
            time={previewTime}
            pace={previewPace}
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
                // data2={isPair ? chartData : undefined} // 같이달리기 컴포넌트

                startFillColor2="#FFD83A"
                startOpacity2={1}
                endFillColor2="#FFD83A"
                endOpacity2={0}
                color2="#FFCC00"
                dashGap={0}
                rulesColor="rgba(255, 255, 255, 0.3)"
                noOfSections={4}
                xAxisColor={'rgba(255, 255, 255, 0.3)'}
                yAxisColor={'rgba(255, 255, 255, 0)'}
                yAxisLabelSuffix="m/s"
                hideDataPoints // 점 숨기기
                // hideYAxisText // y 라벨 없애기
                // hideAxesAndRules // 내부 선 및 y선 x선 없애기
                initialSpacing={0}
                adjustToWidth // width에 데이터 크기 맞추기
                // pointerConfig={}
                xAxisLabelTexts={['0%', '25%', '50%', '75%', '100%']}
                pointerConfig={{
                  pointerStripHeight: 160,
                  pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: 'lightgray',
                  radius: 6,
                  pointerLabelWidth: 100,
                  pointerLabelHeight: 90,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: false,
                  pointerLabelComponent: (items: any) => {
                    handlePreviewData(items[0]);
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
                          <Text
                            style={{fontWeight: 'bold', textAlign: 'center'}}>
                            {items[0].value + 'm/s'}
                          </Text>
                        </View>
                      </View>
                    );
                  },
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
