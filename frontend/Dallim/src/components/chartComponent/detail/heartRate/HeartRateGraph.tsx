import * as S from './HeartRateGraph.styles';

interface Props {
  data: {
    value: number;
    second: number;
  }[];
}

function HeartRateGraph({data}: Props) {
  return (
    <S.Container>
      <S.DataPreviewView></S.DataPreviewView>
      <S.ChartView></S.ChartView>
    </S.Container>
  );
}

export default HeartRateGraph;
