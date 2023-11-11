import styled from "styled-components";
import { InnerDiv } from "./Common.styles";

export const Container = styled(InnerDiv)`
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  color: white;
  width: 100vw;
  height: 10%;
  display: flex;
  justify-content: flex-end;
`;

export const qrBox = styled.div`
  color: white;
  width: 20%;
  height: 100%;
  padding-right: 2%;
`;

export const Body = styled.div`
  flex-direction: row;
  width: 70%;
  height: 75%;
  display: flex;
  flex-direction: column;
`;

export const BodyTop = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TopTitleBox = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const TopText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 250%;
  font-weight: bold;
  color: black;
`;

export const BodyMiddle = styled.div`
  flex-direction: row;
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const MiddleTitleBox = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const MiddleBox = styled.div`
  flex-direction: column;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MiddleMainText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 300%;
  font-weight: bold;
  color: #554bab;
`;

export const MiddleSubText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 200%;
  font-weight: bold;
  color: black;
`;

export const MiddleAddText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  color: #8c8c8c;
  font-size: 150%;
  font-weight: bold;
`;

export const BodyBottom = styled.div`
  flex-direction: row;
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const BottomTitleBox = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TitleBox = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BottomMainText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 300%;
  font-weight: bold;
  color: #554bab;
`;

export const BottomSubText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 200%;
  font-weight: bold;
  color: black;
`;

export const BottomAddText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #8c8c8c;
  font-size: 150%;
  font-weight: bold;
`;

export const WidgetImage1 = styled.img`
  width: 50%;
  height: 50%;
  position: absolute;
  transform: rotate(-10deg);
  top: 30%;
  left: -10%;
  z-index: -1;
  object-fit: contain;
`;

export const WidgetImage2 = styled.img`
  width: 50%;
  height: 50%;
  position: absolute;
  transform: rotate(10deg);
  top: 10%;
  right: -10%;
  z-index: -1;
  object-fit: contain;
`;

export const Footer = styled.div`
  width: 100vw;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
