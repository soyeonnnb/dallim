import * as S from "./Running.styles";
import QrCode from "./unit/QrCode";
import Running_1 from '../assets/images/running/running-alone.png';
import Running_2 from '../assets/images/running/running-together.png';
import Running_3 from '../assets/images/running/running-menu.png';

function Running() {
  return (
    <S.Container>
      <S.Header>
        <S.qrBox> <QrCode /> </S.qrBox>
      </S.Header>
      <S.Body>
        <S.TopBox>
          <S.TitleBox>
            <S.MainText>러닝</S.MainText>
            <S.SubText>
              <S.HighlightedText>혼자&nbsp;</S.HighlightedText>혹은&nbsp;<S.HighlightedText>함께&nbsp;</S.HighlightedText> 뛰어요
            </S.SubText>
            <S.AddText>삼성 갤럭시워치의 헬스데이터를 기반으로</S.AddText>
            <S.AddText>보다 정확하게 러닝데이터를 기록해요</S.AddText>
          </S.TitleBox>
        </S.TopBox>
        <S.ImageBox>
          <S.LeftBox>
            <S.LeftSideBox>
              <S.LeftSideTop>
                <S.RunningImage src={Running_1} />
              </S.LeftSideTop>
              <S.LeftSideBottom>
                <S.SideText>혼자 달리기</S.SideText>
              </S.LeftSideBottom>
            </S.LeftSideBox>
            <S.RightSideBox>
              <S.RightSideTop>
                <S.SideText>같이 달리기</S.SideText>
              </S.RightSideTop>
              <S.RightSideBottom>
                <S.RunningImage src={Running_2} />
              </S.RightSideBottom>
            </S.RightSideBox>
          </S.LeftBox>
          <S.RightBox>
            <S.MainImageBox>
              <S.RunningImage2 src={Running_3} />
            </S.MainImageBox>
          </S.RightBox>
        </S.ImageBox>
      </S.Body>
      <S.EmptyBox />

    </S.Container>
  );
}
export default Running;
