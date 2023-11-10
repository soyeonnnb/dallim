import * as S from "./QrCode.styles";
import GooglePlayImage from "../../assets/images/main/GooglePlayImage.png";
import QrCodeImage from "../../assets/images/main/dallim_qr.png";

function QrCode() {
  return (
    <S.Container>
      <S.QrLeft>
        <S.GooglePlayImage src={GooglePlayImage} />
      </S.QrLeft>
      <S.QrRight>
        <S.QrImage src={QrCodeImage} />
      </S.QrRight>
    </S.Container>
  );
}
export default QrCode;
