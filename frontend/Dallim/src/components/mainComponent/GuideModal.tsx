import * as S from './GuideModal.styles';
import React from 'react';
import { Modal, View, Image, Dimensions } from 'react-native';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import PagerView from 'react-native-pager-view';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const Guides = [
    require('@/assets/characters/Chick_Background.png'),
    require('@/assets/characters/Panda_Background.png'),
    require('@/assets/characters/Rabbit_Background.png'),
  ];

  const renderPage = (imageSource: number, index: number) => (
    <S.StyledPage key={index} >
      <S.StyledImage source={imageSource} />
    </S.StyledPage>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.ModalContainer>
        <S.ModalContent>
          <S.MainBox>
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
              <PagerView style={{ flex: 1 }} initialPage={0}>
                {Guides.map((source, index) => renderPage(source, index))}
              </PagerView>
            </S.Body>
          </S.MainBox>
        </S.ModalContent>

      </S.ModalContainer>
    </Modal>
  );
};

export default GuideModal;