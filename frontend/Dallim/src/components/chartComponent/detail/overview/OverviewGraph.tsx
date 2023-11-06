import * as S from './OverviewGraph.styles';

interface Props {
  title: string;
}

function OverviewGraph({title}: Props) {
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.Navi>더보기</S.Navi>
      </S.TitleContainer>
      <S.Chart>
        <S.Text>곧 {title} 차트가 추가될 예정이에요 😳</S.Text>
      </S.Chart>
    </S.Container>
  );
}

export default OverviewGraph;
