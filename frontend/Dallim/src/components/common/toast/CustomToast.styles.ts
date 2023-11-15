import styled from 'styled-components/native';

export const ToastContainer = styled.View`
  /* border-width: 1px;
  border-color: red; */
  border-radius: 20px;
  height: 60px;
  width: 230px;
  padding: 1%;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const SuccesssBorderBox = styled.View`
  border-width: 1px;
  border-color: #C1C4E7;
  overflow: hidden; 
  border-radius: 20px;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const ErrorBorderBox = styled.View`
  border-width: 1px;
  border-color: #E00C0C; // 지우면 안돼~
  overflow: hidden; 
  border-radius: 20px;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const LeftBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 20%;
  height: 100%;
  padding-left: 10%;
  justify-content: center;
  align-items: center;
`;

export const ToastIcon = styled.Image`
  /* border-width: 1px;
  border-color: red; */
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;


export const RightBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 80%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;

export const ToastTextBox = styled.View`
  /* border-width: 1px;
  border-color: red; */
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ToastText = styled.Text`
  /* border-width: 1px;
  border-color: red; */
  color: black;
  font-weight: bold;
`;

