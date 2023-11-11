import * as S from "./Statistics.styles";
import bgImg from "../assets/images/night_background.jpg";
import QrCode from "./unit/QrCode";
import list from "../assets/images/statistics/statistics-list.png";
import compare from "../assets/images/statistics/statistics-compare.png"

function Statistics() {
  return (
    <S.Container>
      <S.BackgroundImage src={bgImg} />
      <S.Header>
        <S.qrBox> <QrCode /> </S.qrBox>
      </S.Header>

      <S.Body>
        <S.TitleMainBox>
          <S.RealText> 통계</S.RealText>
        </S.TitleMainBox>

        <S.TitleSubBox>
          <S.MainText>App으로 러닝 데이터를 확인해보세요</S.MainText>
          <S.SubText> 1초마다 데이터를&nbsp;<S.HighlightedText>저장</S.HighlightedText>하고&nbsp;<S.HighlightedText>압축</S.HighlightedText>해서 관리해요</S.SubText>
          <S.SubText> 4종의 시각화 방법을 통해 데이터를 확인해요</S.SubText>
        </S.TitleSubBox>
      </S.Body>

      <S.Footer>
        <S.LeftBox>
          <S.LeftBoxTitleBox>
            <S.LeftTitle>
              러닝기록을 잊지 않도록 알려드릴께요 <br />
              데이터를 보면서 자기관리를 할 수 있어요
            </S.LeftTitle>
          </S.LeftBoxTitleBox>
        </S.LeftBox>
        <S.RightBox>
        </S.RightBox>
      </S.Footer>
      <S.PhoneImage src={list} />
      <S.VersusImage src={compare} />

    </S.Container >
  );
}
export default Statistics;
