import React, { useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import * as S from './UserDetailModal.styles';
import CloseIcon from '@/assets/icons/CloseIcon.png';
import Character from '@/assets/characters/Panda.png';
import RunningDataBox from '../RunningDataBox';
import VersusModal from './VersusModal';

type Props = {
    isVisible: boolean;
    onClose: () => void;
};

const UserDetailModal: React.FC<Props> = ({ isVisible, onClose }) => {

    const NickName = "아뇨뚱인데요";
    const Level = "77";
    const TotalDist = "12345";
    const WeekDist = "12";

    function handleSend() {
        console.log("비교하기 버튼 확인");
        setVersusModalVisible(true);
    };

    // 드롭다운
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState("최신 순서");

    // Versus 모달
    const [isVersusModalVisible, setVersusModalVisible] = useState(false);

    return (
        <>
            <Modal
                animationType="fade" // none, fade, slide : 3가지
                transparent={true}
                visible={isVisible}
                onRequestClose={onClose}
            >
                <S.ModalContainer>
                    <S.ModalContent>
                        <S.Top>
                            <S.Empty></S.Empty>
                            <S.TitleBox>
                                <S.NicknameText>{NickName}</S.NicknameText>
                                <S.LevelText>Lv. {Level}</S.LevelText>
                            </S.TitleBox>
                            <S.CloseButton onPress={onClose}>
                                <S.CloseImage source={CloseIcon} />
                            </S.CloseButton>
                        </S.Top>
                        <S.Middle>
                            <S.MiddleLeft>
                                <S.CharacterImage source={Character} />
                            </S.MiddleLeft>
                            <S.MiddleRigth>
                                <S.TextBox>
                                    <S.TotalDistText>누적 거리 {TotalDist} Km</S.TotalDistText>
                                    <S.WeekDistText>이번주 거리 {WeekDist} Km</S.WeekDistText>
                                </S.TextBox>
                                <S.ButtonBox>
                                    <S.SendButton onPress={handleSend}>
                                        <S.SendButtonText>비교하기</S.SendButtonText>
                                    </S.SendButton>
                                </S.ButtonBox>
                            </S.MiddleRigth>
                        </S.Middle>

                        <S.Bottom>
                            <S.BottomTitle>
                                <S.RunningText>Running Data</S.RunningText>
                            </S.BottomTitle>
                            <S.BottomSortBox>
                                <S.BottomSort onPress={() => setDropdownVisible(!dropdownVisible)}>
                                    <S.SortText>{selectedSort}</S.SortText>
                                    {dropdownVisible && (
                                        <S.DropdownMenu>
                                            <S.DropdownItem onPress={() => { setSelectedSort("최신순"); setDropdownVisible(false); }}><S.DropdownItemText>최신 순서</S.DropdownItemText></S.DropdownItem>
                                            <S.DropdownItem onPress={() => { setSelectedSort("속력순"); setDropdownVisible(false); }}><S.DropdownItemText>속력 순서</S.DropdownItemText></S.DropdownItem>
                                            <S.DropdownItem onPress={() => { setSelectedSort("운동시간순"); setDropdownVisible(false); }}><S.DropdownItemText>운동시간 순서</S.DropdownItemText></S.DropdownItem>
                                        </S.DropdownMenu>
                                    )}
                                </S.BottomSort>
                            </S.BottomSortBox>
                            <S.BottomList>
                                <ScrollView>
                                    <S.RunBox>
                                        <RunningDataBox />
                                    </S.RunBox>
                                    <S.RunBox>
                                        <RunningDataBox />
                                    </S.RunBox>
                                    <S.RunBox>
                                        <RunningDataBox />
                                    </S.RunBox>
                                    <S.RunBox>
                                        <RunningDataBox />
                                    </S.RunBox>
                                </ScrollView>
                            </S.BottomList>
                        </S.Bottom>
                    </S.ModalContent>
                </S.ModalContainer>
            </Modal>
            <VersusModal
                isVisible={isVersusModalVisible}
                onClose={() => setVersusModalVisible(false)}
            />
        </>
    );
};

export default UserDetailModal;
