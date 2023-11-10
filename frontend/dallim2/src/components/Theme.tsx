import * as S from "./Theme.styles";
import QrCode from "./unit/QrCode";
import PhoneTheme from "../assets/images/Theme/theme-phone.png";
import WatchTheme from "../assets/images/Theme/theme-watch.png";

function Theme() {
  return (
    <S.Container>
      <S.Header>
        <S.qrBox> <QrCode /> </S.qrBox>
      </S.Header>
      <S.Body>

        <S.TitleBox>
          <S.MainText>테마</S.MainText>
          <S.SubText>
            당신만의 화면을 꾸며보세요
          </S.SubText>
          <S.AddText>삼성 갤럭시워치의 헬스데이터를 기반으로
            <S.HighlightedText> &nbsp;혼자&nbsp;</S.HighlightedText> 혹은&nbsp;  <S.HighlightedText>함께</S.HighlightedText> 뛰어요
          </S.AddText>
        </S.TitleBox>

      </S.Body>
      <S.Footer>
        <S.FooterLeft>
          <S.PhoneBox >
            <S.PhoneImage src={PhoneTheme} />
          </S.PhoneBox>
        </S.FooterLeft>
        {/* <S.FooterRight>
          <S.WatchBox>
          </S.WatchBox>
        </S.FooterRight> */}
      </S.Footer>

      <S.WatchImage src={WatchTheme} />
      <S.BackBar />
    </S.Container>
  );
}
export default Theme;
