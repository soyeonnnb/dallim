import * as S from './GuideModal.styles';
import React, {useState} from 'react';
import {Modal} from 'react-native';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';
import PagerView from 'react-native-pager-view';

import Guide_1 from './Guide_1';
import Guide_2 from './Guide_2';
import Guide_3 from './Guide_3';
import Guide_4 from './Guide_4';
import Guide_5 from './Guide_5';
import Guide_6 from './Guide_6';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<Props> = ({isVisible, onClose}) => {
  const [currentPoint, setCurrentPoint] = useState(0);

  const Guides = [
    <Guide_1 />,
    <Guide_2 />,
    <Guide_3 />,
    <Guide_4 />,
    <Guide_5 />,
    <Guide_6 />,
  ];

  const renderPage = (GuideComponent: JSX.Element, index: number) => (
    <S.StyledPage key={index}>{GuideComponent}</S.StyledPage>
  );

  const renderIndicators = (currentIndex: number, total: number) => (
    <S.PotBox style={{flexDirection: 'row', justifyContent: 'center'}}>
      {Array.from({length: total}, (_, index) => (
        <S.Indicator key={index} active={index === currentIndex} />
      ))}
    </S.PotBox>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover">
        <S.ModalContent>
          <S.Header>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} />
            </S.CloseButton>
            <S.RenderBox>
              {renderIndicators(currentPoint, Guides.length)}
            </S.RenderBox>
            <S.TempBox />
          </S.Header>

          <S.Body>
            <S.Content>
              <PagerView
                style={{flex: 1}}
                initialPage={0}
                onPageSelected={e => setCurrentPoint(e.nativeEvent.position)}>
                {Guides.map((GuideComponent, index) =>
                  renderPage(GuideComponent, index),
                )}
              </PagerView>
            </S.Content>
          </S.Body>
        </S.ModalContent>
      </S.BackgroundImage>
    </Modal>
  );
};

export default GuideModal;
