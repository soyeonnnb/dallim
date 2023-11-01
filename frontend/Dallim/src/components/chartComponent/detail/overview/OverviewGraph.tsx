import * as S from './OverviewGraph.styles';

function OverviewGraph() {
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>페이스</S.Title>
        <S.Navi>더보기</S.Navi>
      </S.TitleContainer>
      <S.Chart></S.Chart>
    </S.Container>
  );
}

export default OverviewGraph;
