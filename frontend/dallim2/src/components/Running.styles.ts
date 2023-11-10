import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  /* border: 1px solid blue; */
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
  width: 100%;
  max-width: 1200px;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const EmptyBox = styled.div`
  width: 100%;
  height: 10%;
`;

export const TopBox = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleBox = styled.div`
  flex-direction: row;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 400%;
  font-weight: bold;
  color: #554bab;
`;

export const SubText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: bold;
  color: black;
`;

export const HighlightedText = styled.span`
  color: #a59bf6; /* 특정 단어에 적용할 색상 */
`;

export const AddText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 20%;
  font-size: 150%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c8c8c;
`;

export const ImageBox = styled.div`
  flex-direction: row;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
`;

export const SideText = styled.div`
  flex-direction: row;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 250%;
  font-weight: bold;
  color: #554bab;
`;

export const LeftBox = styled.div`
  flex-direction: row;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const LeftSideBox = styled.div`
  flex-direction: row;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LeftSideTop = styled.div`
  flex-direction: row;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RunningImage = styled.img`
  height: 100%;
  object-fit: contain;
`;

export const RunningImage2 = styled.img`
  height: 120%;
  object-fit: contain;
`;
export const LeftSideBottom = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightSideBox = styled.div`
  flex-direction: row;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightSideTop = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const RightSideBottom = styled.div`
  flex-direction: row;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightBox = styled.div`
  flex-direction: row;
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainImageBox = styled.div`
  flex-direction: row;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30%;
  margin-left: 15%;
`;

export const Footer = styled.div`
  flex-direction: row;
  width: 100vw;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TempBox = styled.div`
  border-radius: 5px;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  @media (max-width: 700px) {
    width: 25vw;
  }
`;

export const TempImage = styled.img`
  width: 100%;
  transform: rotate(30deg);
`;

export const TempText = styled.div`
  color: white;
  font-size: 200%;
  font-weight: 700;
`;
