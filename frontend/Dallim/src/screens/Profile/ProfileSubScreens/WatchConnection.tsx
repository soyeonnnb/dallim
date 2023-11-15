import * as S from './WatchConnection.styles';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

import InfoModal from '@/components/profileComponent/profileModal/InfoModal';

//icon
import BackButtonIcon from '@/assets/icons/ArrowLeft';
import DeleteIcon from '@/assets/icons/DeleteIcon';

import {colors} from '@/components/common/globalStyles';
import {postWatchConnection} from '@/apis/ProfileApi';

interface WatchConnectionProps {
  navigation: any;
}

function WatchConnection({navigation}: WatchConnectionProps) {
  // 다음 화면 미리보기--------------------
  const [inputNums, setInputNums] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [inputIter, setInputIter] = useState<number>(0);
  const numpadNumber = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['DEL', '0', ''],
  ];

  const handleWatchConnect = async () => {
    // 6자리 숫자만 유효
    if (inputIter != 6) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '6자리 숫자를 입력해주세요',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
      return;
    }
    const authCode = inputNums.join('');
    const result = await postWatchConnection(authCode);
    if (result.status === 'success') {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: '연동 성공 !',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
      navigation.navigate('Profile');
    } else if (result.message === '인증 기간이 만료됨') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '인증 기간이 만료되었습니다. 재발급해주세요',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '숫자를 다시 확인해주세요',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 10,
      });
    }
  };

  const handleSetInputNums = (num: string) => {
    if (num === 'DEL') {
      if (inputIter > 0) {
        const inputs = [...inputNums];
        inputs[inputIter - 1] = '';
        setInputNums(inputs);
        setInputIter(inputIter - 1);
      }
    } else if (num === '') {
      return;
    } else if (inputIter < 6) {
      const inputs = [...inputNums];
      inputs[inputIter] = num;
      setInputNums(inputs);
      setInputIter(inputIter + 1);
    }
  };

  // 연동 설명서 모달
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  function ActionInfo() {
    console.log('연동 설명서 버튼이 눌렸습니다.');
    setInfoModalVisible(true);
  }
  // 연동 설명서 모달 열기 & 닫기
  function closeInfoModal() {
    setInfoModalVisible(false);
  }

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover"
      />
      <S.Header>
        <S.BackButtonFlexBoxLeft onPress={() => navigation.navigate('Profile')}>
          <BackButtonIcon width={30} height={30} color="white" />
        </S.BackButtonFlexBoxLeft>
        <S.BackButtonFlexBoxRight>
          <S.TitleText>워치 설정</S.TitleText>
        </S.BackButtonFlexBoxRight>
        <S.BackButtonFlexBoxLeft />
      </S.Header>

      <S.Body>
        <S.TopText>워치에 표시된 숫자 6자리를 입력해주세요</S.TopText>
        <S.NumberInputBox>
          {inputNums.map((num, index) => {
            return (
              <S.NumberInput key={index}>
                <S.NumberInputText>{num}</S.NumberInputText>
              </S.NumberInput>
            );
          })}
        </S.NumberInputBox>
        <S.ConnectButtonBox onPress={() => handleWatchConnect()}>
          <S.ConnectionButtonText>연동</S.ConnectionButtonText>
        </S.ConnectButtonBox>
      </S.Body>
      <S.Footer>
        <S.InputNumpadRows>
          {numpadNumber.map((row, rowIndex) => {
            return (
              <S.InputNumpadRow key={rowIndex}>
                {row.map((number, index) => {
                  return (
                    <S.InputNumpad
                      key={index}
                      onPress={() => {
                        handleSetInputNums(number);
                      }}>
                      {number === 'DEL' ? (
                        <DeleteIcon
                          width={35}
                          height={35}
                          color={colors.blue._900}
                        />
                      ) : (
                        <S.InputNumpadText>{number}</S.InputNumpadText>
                      )}
                    </S.InputNumpad>
                  );
                })}
              </S.InputNumpadRow>
            );
          })}
        </S.InputNumpadRows>
      </S.Footer>

      {/* 모달 */}
      {/* <WatchSyncInfoModal showModal={false} toggleModal={} /> */}
      <InfoModal isVisible={isInfoModalVisible} onClose={closeInfoModal} />
    </S.Container>
  );
}

export default WatchConnection;
