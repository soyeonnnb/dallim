import React from 'react';
import {Button} from 'react-native';
import * as S from './Profile.styles'; // 스타일 컴포넌트 import

interface ProfileProps {
  navigation: any; // navigation prop 타입은 실제 사용하는 라이브러리에 따라 다를 수 있습니다.
}

const Profile = ({navigation}: ProfileProps) => {
  return (
    <S.Container>
      <S.Title>Profile Screen</S.Title>
      <Button
        title="Go back to Main"
        onPress={() => navigation.navigate('Main')}
      />
    </S.Container>
  );
};

export default Profile;
