import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: blue; // 원하는 스타일을 여기에 추가
  border-radius: 5px;
  width: 100px;
  height: 50px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white; // 버튼 텍스트 스타일
`;
