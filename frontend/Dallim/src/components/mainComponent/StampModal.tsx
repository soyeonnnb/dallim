
import React from 'react';
import { Modal } from 'react-native';
import * as S from './StampModal.styles';
import CloseIcon from '../../assets/icons/CloseIcon.png';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
};
LocaleConfig.defaultLocale = 'ko';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const StampModal: React.FC<Props> = ({ isVisible, onClose }) => {

    const tempMarkedDates = ['2023-10-05', '2023-10-09', '2023-10-15'];

    const generateMarkedDatesFromList = (dates: string[]) => {
        const result: { [key: string]: { selected: boolean, marked?: boolean, dotColor?: string, activeOpacity?: number,selectedColor?: string } } = {};
        dates.forEach(date => {
            result[date] = {
                selected: true,
                selectedColor: '#315182', // 선택된 배경색
            };
        });
        return result;
    }
    const [markedDates, setMarkedDates] = React.useState(generateMarkedDatesFromList(tempMarkedDates));

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <S.ModalContainer>
                <S.ModalContent>
                    <S.Top>
                        <S.CloseButton onPress={onClose}>
                            <S.CloseImage source={CloseIcon} />
                        </S.CloseButton>
                    </S.Top>
                    <S.Middle>
                        <Calendar
                            locale='ko'
                            markedDates={markedDates}
                            monthFormat={'yyyy년 MM월'}
                        />
                    </S.Middle>
                </S.ModalContent>
            </S.ModalContainer>
        </Modal>
    );
};

export default StampModal;
