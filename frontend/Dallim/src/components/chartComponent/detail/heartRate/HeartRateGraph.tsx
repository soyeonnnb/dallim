import * as S from './HeartRateGraph.styles';
import {useState, useEffect} from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {LineChart} from 'react-native-gifted-charts';
import {View, Text} from 'react-native';
import {secondToMinuteSeconds} from '@/recoil/RunningData';

interface Props {
  data: {
    value: number;
    second: number;
  }[];
  chartColor: string[];
}

function HeartRateGraph({data, chartColor}: Props) {
  const [previewWidth, setPreviewWidth] = useState<number>(0);
  const [previewTime, setPreviewTime] = useState<number>(0);
  const [previewHeartRate, setPreviewHeartRate] = useState<number>(0);
  const [previewHeartRateColor, setPreviewHeartRateColor] =
    useState<string>('white');

  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const onLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    setParentWidth(width);
    setParentHeight(height);
  };

  const handlePreviewData = (item: {value: number; second: number}) => {
    setPreviewTime(item.second);
    setPreviewHeartRate(item.value);

    if (item.value < 137) setPreviewHeartRateColor(chartColor[0]);
    else if (item.value < 150) setPreviewHeartRateColor(chartColor[1]);
    else if (item.value < 163) setPreviewHeartRateColor(chartColor[2]);
    else if (item.value < 176) setPreviewHeartRateColor(chartColor[3]);
    else setPreviewHeartRateColor(chartColor[4]);
  };
  useEffect(() => {
    handlePreviewData(data[data.length - 1]);
  }, []);

  return (
    <S.Container>
      <S.DataPreviewView>
        <S.DataPreview>
          <S.DataPreviewTime>
            {secondToMinuteSeconds(previewTime)}
          </S.DataPreviewTime>
          <S.DataPreviewHeartRate color={previewHeartRateColor}>
            {previewHeartRate}
          </S.DataPreviewHeartRate>
        </S.DataPreview>
      </S.DataPreviewView>
      <S.ChartView>
        <PanGestureHandler>
          <S.ChartBox onLayout={onLayout}>
            {data && (
              <LineChart
                width={parentWidth * 0.9}
                height={parentHeight * 0.9}
                areaChart
                curved
                // 혼자 달리기 그래프
                // data={chartData} // 혼자 달리기 컴포넌트
                data={data}
                startFillColor="#D96767"
                startOpacity={1}
                endFillColor="#FF8080"
                endOpacity={0}
                color="#FF1B1B"
                dashGap={0}
                rulesColor="rgba(255, 255, 255, 0.3)"
                noOfSections={4}
                xAxisColor={'rgba(255, 255, 255, 0.3)'}
                yAxisColor={'rgba(255, 255, 255, 0)'}
                hideDataPoints // 점 숨기기
                initialSpacing={0}
                yAxisTextStyle={{color: 'white'}}
                adjustToWidth // width에 데이터 크기 맞추기
                xAxisLabelTexts={['0%', '25%', '50%', '75%', '100%']}
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
                  console.log(pointerIndex, 'Ddd');
                  return (
                    <Label
                      items={data[pointerIndex]}
                      handlePreviewData={handlePreviewData}
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

export default HeartRateGraph;
function Label({
  items,
  handlePreviewData,
}: {
  items: {
    value: number;
    second: number;
  };
  handlePreviewData: any;
}) {
  useEffect(() => {
    handlePreviewData(items);
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
          {items.value}
        </Text>
      </View>
    </View>
  );
}
