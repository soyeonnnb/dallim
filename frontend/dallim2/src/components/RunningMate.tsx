import * as S from "./RunningMate.styles";
import QrCode from "./unit/QrCode";
import bgImg from "../assets/images/night_background.jpg";
import SelectImage from "../assets/images/runningMate/runningmate.png";

function RunningMate() {
  return (
    <S.Container>
      <S.BackgroundImage src={bgImg} />
      <S.Header>
        <S.qrBox> <QrCode /> </S.qrBox>
      </S.Header>
      <S.Body>
        <S.EmptyBox />
        <S.TitleBox>
          <S.MainText>러닝메이트</S.MainText>
          <S.SubText>
            함께 뛸 데이터를 저장하고 관리해요
          </S.SubText>
          <S.AddText> 과거의 나 또는 다른 유저의&nbsp; <S.HighlightedText>러닝 기록과 경쟁&nbsp;</S.HighlightedText>할 수 있어요</S.AddText>
        </S.TitleBox>
      </S.Body>
      <S.Footer>
      </S.Footer>
      <S.SelectImage src={SelectImage} />

    </S.Container >
  );
}
export default RunningMate;
