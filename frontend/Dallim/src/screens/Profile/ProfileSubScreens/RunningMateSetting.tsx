import * as S from './RunningMateSetting.styles';
import {useEffect, useState} from 'react';

//icon
import BackButtonIcon from '@/assets/icons/ArrowLeft';

//carousel
import Carousel from '@/components/profileComponent/Carousel';
import {Dimensions} from 'react-native';

//component
import RunningMateDeleteModal from '@/components/profileComponent/profileModal/RunningMateDeleteModal';

interface CompetitorDataType {
  userId: number;
  id: string;
  nickName: string;
  characterIndex: number;
  evolutionStage: number;
  planetIndex: number;
  level: number;
  averagePace: number;
  totalDistance: number;
  totalTime: number;
  createdAt: string;
  clear: boolean;
}

interface RunningMateSettingProps {
  navigation: any;
  route: {
    params: {
      competitorData: CompetitorDataType[];
    };
  };
}

function RunningMateSetting({navigation, route}: RunningMateSettingProps) {
  //임시데이터--------------
  // const PAGES = [
  //   {
  //     num: 1,
  //     planetIndex: 0,
  //     characterIndex: 0,
  //     characterlevel: 0,
  //     date: '2023-11-01',
  //     level: 5,
  //     nickname: 'PengSoshi',
  //     distance: '5.5km',
  //     minutes: 15,
  //     speed: '22km/h',
  //     togetherrun: false,
  //   },
  //   {
  //     num: 2,
  //     planetIndex: 0,
  //     characterIndex: 1,
  //     characterlevel: 0,
  //     date: '2023-11-01',
  //     level: 5,
  //     nickname: 'PengSoshi',
  //     distance: '5.5km',
  //     minutes: 15,
  //     speed: '22km/h',
  //     togetherrun: false,
  //   },
  //   {
  //     num: 3,
  //     planetIndex: 0,
  //     characterIndex: 2,
  //     characterlevel: 1,
  //     date: '2023-11-01',
  //     level: 5,
  //     nickname: 'PengSoshi',
  //     distance: '5.5km',
  //     minutes: 15,
  //     speed: '22km/h',
  //     togetherrun: true,
  //   },
  //   {
  //     num: 4,
  //     planetIndex: 0,
  //     characterIndex: 3,
  //     characterlevel: 1,
  //     date: '2023-11-01',
  //     level: 5,
  //     nickname: 'PengSoshi',
  //     distance: '5.5km',
  //     minutes: 15,
  //     speed: '22km/h',
  //     togetherrun: true,
  //   },
  //   {
  //     num: 5,
  //     planetIndex: 0,
  //     characterIndex: 0,
  //     characterlevel: 0,
  //     date: '2023-11-01',
  //     level: 5,
  //     nickname: 'PengSoshi',
  //     distance: '5.5km',
  //     minutes: 15,
  //     speed: '22km/h',
  //     togetherrun: true,
  //   },
  // ];
  // 다음 화면 미리보기--------------------
  const screenWidth = Dimensions.get('window').width;

  // state--------------------
  const [competitorData, setCompetitorData] = useState<CompetitorDataType[]>(
    [],
  );
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  // const [selectedCardNum, setSelectedCardNum] = useState<number | null>(
  //   competitorData[0]?.num || null,
  // );
  const [selectedCardNum, setSelectedCardNum] = useState<number | null>(
    1 || null,
  );

  // console.log(selectedCardNum);
  //
  //useEffect
  useEffect(() => {
    setCompetitorData(route.params.competitorData);
  }, [route.params.competitorData]);

  //action
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
            competitorData={competitorData}
            pageWidth={screenWidth - (16 + 36) * 2}
            // onCardSelected={(num: number) => setSelectedCardNum(num)}
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
