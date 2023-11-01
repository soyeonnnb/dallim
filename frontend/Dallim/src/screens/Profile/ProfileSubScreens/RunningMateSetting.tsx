import * as S from './RunningMateSetting.styles';
import {useState} from 'react';

//icon
// import BackButtonIcon from '../../assets/icons/BackButtonIcon.png';
import BackButtonIcon from '@/assets/icons/ArrowLeft';

//img
import BlackCard from '@/assets/planets/ColumnCard/blackColumnCard.png';
import YellowCard from '@/assets/planets/ColumnCard/yellowColumnCard.png';
import BlueCard from '@/assets/planets/ColumnCard/blueColumnCard.png';
import PurpleCard from '@/assets/planets/ColumnCard/purpleColumnCard.png';
import RedCard from '@/assets/planets/ColumnCard/redColumnCard.png';

//carousel
import Carousel from '@/components/profileComponent/Carousel';
import {Dimensions} from 'react-native';

interface RunningMateSettingProps {
  navigation: any;
}

function RunningMateSetting({navigation}: RunningMateSettingProps) {
  // 임시 데이터
  const PlanetIndex = 2; // 유저가 장착한 행성
  const TempSelectCharacter = 3; // 유저가 장착한 캐릭터
  const TempSelectCharacterLevel = 1; // 유저가 장착한 캐릭터 레벨 : 0 OR 1
  // const selectedCharacter = characterData[TempSelectCharacter];
  // const selectedCharacterLevelData =
  //   selectedCharacter.levels[TempSelectCharacterLevel];

  const Nickname = '펭소시치'; // 유저 닉네임
  const UserLevel = 54; // 유저 레벨
  const experiencePercentage = 65.2; // 유저 해당하는 레벨의 경험치

  const [showNicknameChangeModal, setShowNicknameChangeModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //Carousel--------------
  const PAGES = [
    {
      num: 1,
      cardImage: BlackCard,
      date: '2023-11-01',
      level: 5,
      nickname: 'PengSoshi',
      distance: '5.5km',
      minutes: 15,
      speed: '22km/h',
    },
    {num: 2, cardImage: YellowCard},
    {num: 3, cardImage: BlueCard},
    {num: 4, cardImage: PurpleCard},
    {num: 5, cardImage: RedCard},
  ];
  const screenWidth = Dimensions.get('window').width;
  // -----------------------

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground4.png')}
        resizeMode="cover">
        <S.Header>
          <S.BackButtonFlexBoxLeft
            onPress={() => navigation.navigate('Profile')}>
            <BackButtonIcon width={30} height={30} color="white" />
          </S.BackButtonFlexBoxLeft>
          <S.BackButtonFlexBoxRight>
            <S.TitleText>러닝메이트 설정</S.TitleText>
          </S.BackButtonFlexBoxRight>
          <S.BackButtonFlexBoxLeft></S.BackButtonFlexBoxLeft>
        </S.Header>

        <S.Body>
          <Carousel
            gap={16}
            offset={36}
            pages={PAGES}
            pageWidth={screenWidth - (16 + 36) * 2}
          />
        </S.Body>
        <S.Footer>
          <S.FooterTopBox></S.FooterTopBox>
          <S.DeleteButtonMiddleBox
            onPress={() => {
              // TODO: 여기에 삭제 버튼 클릭 시 수행할 액션을 추가합니다.
              console.log('삭제 버튼이 클릭되었습니다.');
            }}>
            <S.DeleteButtonText>삭제</S.DeleteButtonText>
          </S.DeleteButtonMiddleBox>
          <S.FooterBottomBox></S.FooterBottomBox>
        </S.Footer>
        <S.TabBox />

        {/* <S.CancleButton /> */}
      </S.BackgroundImage>
    </S.Container>
  );
}

export default RunningMateSetting;
