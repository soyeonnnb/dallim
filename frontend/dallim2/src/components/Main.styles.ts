import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 80%;
  top: 0;
  position: absolute;
  z-index: -1;
`;

export const Main = styled.div`
  /* border: 1px solid blue; */
  height: 100%;
`;

export const Header = styled.div`
  color: white;
  height: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.div`
  color: white;
  font-size: 200%;
  font-weight: 800;
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  flex-direction: row;
  width: 100%;
  height: 80%;
  display: flex;
`;
export const SectionLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 35%;
  height: 100%;
`;

export const QRImage = styled.img`
  /* border: 1px solid blue; */
  width: 30%;
  border-radius: 10%;
`;

export const PhoneImage = styled.img`
  height: 90%;
  object-fit: contain;
`;

export const PlayStoreImage = styled.img`
  width: 30%;
  margin-bottom: 10%;
  object-fit: contain;
`;

export const WatchImage = styled.img`
  height: 70%;
  transform: rotate(30deg);
  object-fit: contain;
`;
export const SectionMiddle = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SectionRight = styled.div`
  width: 30%;
  height: 100%;
`;
export const LogoBox = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const DownloadBox = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoText = styled.span`
  color: white;
  font-size: 400%;
  font-weight: 800;
`;
export const InfoText = styled.span`
  color: white;
  font-size: 200%;
  font-weight: 700;
`;