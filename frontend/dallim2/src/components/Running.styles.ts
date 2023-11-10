import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  border: 1px solid red;
  color: white;
  width: 100vw;
  height: 10%;
  display: flex;
  justify-content: flex-end;
`;

export const qrBox = styled.div`
  border: 1px solid green;
  color: white;
  width: 20%;
  height: 100%;
  margin-right: 2%;
`;

export const Body = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 80vw;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

export const TopBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 300%;
  color: #554BAB;
`;

export const SubText = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  color: black;
`;

export const HighlightedText = styled.span`
  color: #A59BF6; /* 특정 단어에 적용할 색상 */
`;

export const AddText = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8C8C8C;
`;


export const ImageBox = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: row;
`;

export const SideText = styled.div`
  border: 1px solid blue;
  flex-direction: row;
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  color: #554BAB;
`;

export const LeftBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const LeftSideBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LeftSideTop = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RunningImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const LeftSideBottom = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightSideBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightSideTop = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const RightSideBottom = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainImageBox = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20%;
`;

export const Footer = styled.div`
  border: 1px solid red;
  flex-direction: row;
  width: 100vw;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const TempBox = styled.div`
  border: 1px solid #000;
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
