import * as S from './Login.styles';
import LoginTitle from '@/assets/images/LoginTitle.png';
import NaverIcon from '@/assets/icons/NaverIcon.png';
import KakaoIcon from '@/assets/icons/KakaoIcon.png';

const Login = ({ navigation }: any) => {
  return (
    <S.Container>
      <S.BackgroundVideo
        source={require('@/assets/videos/LoginBackground.mp4')}
        resizeMode="cover"
        repeat={true}
        muted={true}
        playInBackground={false}
        playWhenInactive={false}
      />
      <S.BackgroundImage source={require('@/assets/images/LoginBackground_1.png')} resizeMode='cover'>

        <S.Top>
          <S.TitleBox>
            <S.TitleImage source={LoginTitle} />
          </S.TitleBox>
        </S.Top>

        <S.Body>
          <S.NaverButton onPress={() => navigation.navigate('Naver')}>
            <S.Icon source={NaverIcon} />
            <S.NaverText>네이버로 시작하기</S.NaverText>
          </S.NaverButton>

          <S.KakaoButton onPress={() => navigation.navigate('Kakao')}>
            <S.Icon source={KakaoIcon} />
            <S.KakaoText>카카오로 시작하기</S.KakaoText>
          </S.KakaoButton>
        </S.Body>

        <S.Footer>
          <S.BackgroundImage source={require('@/assets/images/LoginBackground_2.png')} resizeMode='cover'>
          </S.BackgroundImage>
        </S.Footer>

      </S.BackgroundImage>
    </S.Container>
  );
};

export default Login;
