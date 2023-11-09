import * as S from './GuideModal.styles';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import PagerView from 'react-native-pager-view';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const [currentPoint, setCurrentPoint] = useState(0);

  const Background = [
    require('@/assets/characters/Chick_Background.png'),
    require('@/assets/characters/Panda_Background.png'),
    require('@/assets/characters/Rabbit_Background.png'),
  ];

  const Guides = [
    require('@/assets/characters/Chick.png'),
    require('@/assets/characters/Panda.png'),
    require('@/assets/characters/Rabbit.png'),
  ];

  const renderPage = (imageSource: number, index: number) => (
    <S.StyledPage key={index} >
      <S.StyledImage source={imageSource} />
    </S.StyledPage>
  );

  const renderIndicators = (currentIndex: number, total: number) => (
    <S.PotBox style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {Array.from({ length: total }, (_, index) => (
        <S.Indicator key={index} active={index === currentIndex} />
      ))}
    </S.PotBox>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.BackgroundImage source={Background[currentPoint]} resizeMode='cover'>
        <S.ModalContent>
          <S.Header>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} />
            </S.CloseButton>
            <S.TitleBox>
              <S.TitleText>사용 설명서</S.TitleText>
            </S.TitleBox>
            <S.TempBox />
          </S.Header>

          <S.Body>
            <S.Content>
              <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                onPageSelected={e => setCurrentPoint(e.nativeEvent.position)}
              >
                {Guides.map((source, index) => renderPage(source, index))}
              </PagerView>
            </S.Content>
          </S.Body>
          <S.Footer>
            <S.FooterLeft>
              {renderIndicators(currentPoint, Guides.length)}
            </S.FooterLeft>
          </S.Footer>
        </S.ModalContent>
      </S.BackgroundImage>
    </Modal>
  );
};

export default GuideModal;