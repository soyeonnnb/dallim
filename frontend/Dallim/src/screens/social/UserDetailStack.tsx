import { useState } from 'react';
import { ScrollView } from 'react-native';
import * as S from './UserDetailStack.styles';
import CloseIcon from '@/assets/icons/DirectionLeft_2.png';

import RunningDataBox from '@/components/socialComponent/RunningDataBox';
import VersusModal from '@/components/socialComponent/socialModal/VersusModal';
import ProfileCard from '@/components/profileComponent/ProfileCard';
import { characterData } from '@/recoil/CharacterData';

interface UserDetailStackProps {
    navigation: any;
}

function UserDetailStack({ navigation }: UserDetailStackProps) {

    const tempCharacterIndex = 2;
    const tempNickname = "아뇨뚱인데요";
    const tempLevel = 56
    const tempExp = 22;
    const evolution = 1;

    const selectedCharacter = characterData[tempCharacterIndex];
    const selectedCharacterLevelData =
        selectedCharacter.levels[evolution];

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
        <S.Container>
            <S.BackgroundImage source={require('@/assets/images/MainBackground4.png')}
                resizeMode="cover">

                <S.Header>
                    <S.CloseButton onPress={() => navigation.goBack()}>
                        <S.CloseImage source={CloseIcon} />
                    </S.CloseButton>
                    <S.HeaderBox>
                        <S.DetailText>상세보기</S.DetailText>
                    </S.HeaderBox>
                    <S.Empty></S.Empty>
                </S.Header>
                <S.Body>
                    <S.ProfileBox>
                        <ProfileCard
                            PlanetIndex={tempCharacterIndex}
                            Nickname={tempNickname}
                            UserLevel={tempLevel}
                            experiencePercentage={tempExp}
                        />
                    </S.ProfileBox>

                </S.Body>

                <S.Footer>
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
                </S.Footer>

                <S.TabBox />
            </S.BackgroundImage>



            <S.ImageBox>
                <S.CharacterImage
                    source={selectedCharacterLevelData.front}
                    resizeMode="contain"
                />
            </S.ImageBox>

            <VersusModal
                isVisible={isVersusModalVisible}
                onClose={() => setVersusModalVisible(false)}
            />
        </S.Container>
    );
};

export default UserDetailStack;
