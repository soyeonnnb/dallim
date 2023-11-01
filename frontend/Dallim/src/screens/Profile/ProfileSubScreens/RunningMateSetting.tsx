import * as S from './RunningMateSetting.styles';
import {useState} from 'react';

//icon
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

//component
import RunningMateDeleteModal from '@/components/profileComponent/profileModal/RunningMateDeleteModal';

interface RunningMateSettingProps {
  navigation: any;
}

function RunningMateSetting({navigation}: RunningMateSettingProps) {
  //임시데이터--------------
  const PAGES = [
    {
      num: 1,
      planetIndex: 0,
      characterIndex: 0,
      characterlevel: 0,
      date: '2023-11-01',
      level: 5,
      nickname: 'PengSoshi',
      distance: '5.5km',
      minutes: 15,
      speed: '22km/h',
    },
    {
      num: 2,
      planetIndex: 0,
      characterIndex: 1,
      characterlevel: 0,
      date: '2023-11-01',
      level: 5,
      nickname: 'PengSoshi',
      distance: '5.5km',
      minutes: 15,
      speed: '22km/h',
    },
    {
      num: 3,
      planetIndex: 0,
      characterIndex: 2,
      characterlevel: 1,
      date: '2023-11-01',
      level: 5,
      nickname: 'PengSoshi',
      distance: '5.5km',
      minutes: 15,
      speed: '22km/h',
    },
    {
      num: 4,
      planetIndex: 0,
      characterIndex: 3,
      characterlevel: 1,
      date: '2023-11-01',
      level: 5,
      nickname: 'PengSoshi',
      distance: '5.5km',
      minutes: 15,
      speed: '22km/h',
    },
    {
      num: 5,
      planetIndex: 0,
      characterIndex: 0,
      characterlevel: 0,
      date: '2023-11-01',
      level: 5,
      nickname: 'PengSoshi',
      distance: '5.5km',
      minutes: 15,
      speed: '22km/h',
    },
  ];
  // 다음 화면 미리보기--------------------
  const screenWidth = Dimensions.get('window').width;

  // state--------------------
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

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
              setDeleteModalVisible(true);
              console.log('삭제 버튼이 클릭되었습니다.');
            }}>
            <S.DeleteButtonText>삭제</S.DeleteButtonText>
          </S.DeleteButtonMiddleBox>
          <S.FooterBottomBox></S.FooterBottomBox>
        </S.Footer>
        <S.TabBox />
        {isDeleteModalVisible && (
          <RunningMateDeleteModal
            toggleDeleteModal={() => setDeleteModalVisible(false)}
          />
        )}
      </S.BackgroundImage>
    </S.Container>
  );
}

export default RunningMateSetting;
