import * as S from './HeartRateGraph.styles';

function HeartRateGraph() {
  return (
    <S.Container>
      <S.DataPreviewView></S.DataPreviewView>
      <S.ChartView></S.ChartView>
    </S.Container>
  );
}

export default HeartRateGraph;
