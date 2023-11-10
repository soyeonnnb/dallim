import * as S from "./Main.styles";
import bgImg from "../assets/images/night_background.jpg";
import phoneImg from "../assets/images/main/main-phone.gif";
import watchImg from "../assets/images/main/main-watch.png";
import playStoreImg from "../assets/images/main/GooglePlayImage.png";
import qrImg from "../assets/images/main/dallim_qr.png";

function Main() {
  return (
    <S.Container>
      <S.BackgroundImage src={bgImg} />
      <S.Main>
        <S.Header>DALLIM</S.Header>
        <S.Body>
          <S.SectionLeft>
            <S.PhoneImage src={phoneImg} />
          </S.SectionLeft>
          <S.SectionMiddle>
            <S.LogoBox>
              <S.LogoText>DALLIM</S.LogoText>
              <S.InfoText>with Galaxy Watch</S.InfoText>
            </S.LogoBox>
            <S.DownloadBox>
              <S.PlayStoreImage src={playStoreImg} />
              <S.QRImage src={qrImg} />
            </S.DownloadBox>
          </S.SectionMiddle>
          <S.SectionRight>
            <S.MarginBox margin="5%" />
            <S.WatchImage src={watchImg} />
          </S.SectionRight>
        </S.Body>
      </S.Main>
    </S.Container>
  );
}
export default Main;
