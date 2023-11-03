import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, ScrollView } from 'react-native';
import * as S from './FriendManageModal.styles';
import CloseIcon from '@/assets/icons/CloseIcon_3.png';
import NoFriendImage from '@/assets/images/NoFriend.png';
import NoSearchImage from '@/assets/images/NoSearch.png';
import SearchIcon from '@/assets/icons/SearchIcon.png';
import FriendBox from '../FriendBox';
import UserBox from '../UserBox';
import { fetchFriendList } from '@/apis/SocialApi';

type Friend = {
  userId: number;
  characterIndex: number;
  nickname: string;
  level: number;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const FriendManageModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const [viewState, setViewState] = useState('friends');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 컴포넌트가 마운트되면 친구 목록을 가져옵니다.
    const getFriends = async () => {
      try {
        setLoading(true); // 로딩 상태를 true
        const friendsData = await fetchFriendList();
        setFriends(friendsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 데이터를 받아온 후 로딩 상태를 fals
      }
    };
    getFriends();
  }, []);

  // const Friend = true; // 친구가 있는 경우
  // const Friend = false; // 친구가 없는 경우
  const User = true; // 유저가 있는 경우
  // const User = false; // 유저가 없는 경우

  const switchView = (newState: string) => {
    setViewState(newState);
  };

  function handleSend() {
    console.log("닉네임 전송!");
  };


  const Search = () => (
    <S.Search>
      <S.SearchLeft>
        <S.SearchBox
          placeholder="닉네임을 입력해주세요."
        />
      </S.SearchLeft>
      <S.SearchRight>
        <S.SendButton onPress={handleSend}>
          <S.SearchIcon source={SearchIcon} resizeMode='contain' />
        </S.SendButton>
      </S.SearchRight>
    </S.Search>
  );

  const renderContent = () => {

    if (loading) {
      return <Text>Loading...</Text>;
    }

    switch (viewState) {
      case 'search':
        // User가 true인 경우 유저 검색 결과를, 그렇지 않으면 검색 없음 메시지를 렌더링
        return User ? (
          <>
            <Search />
            <ScrollView>
              <S.UserBox>
                <UserBox />
              </S.UserBox>
            </ScrollView>
          </>
        ) : (
          <>
            <Search />
            <S.EmptyImage source={NoSearchImage} resizeMode="contain" />
            <S.EmptyText>검색된 유저가 없어요.</S.EmptyText>
            <S.EmptyText style={{ marginTop: 5 }}>정확한 유저의 닉네임을 입력해주세요.</S.EmptyText>
          </>
        );
      case 'friends':
        // Friend가 true인 경우 친구 목록을, 그렇지 않으면 친구 없음 메시지를 렌더링
        return friends.length > 0 ? (
          <ScrollView>
            {friends.map((friend) => (
              <S.FriendBox key={friend.userId}>
                <FriendBox {...friend} />
              </S.FriendBox>
            ))}
          </ScrollView>
        ) : (
          <>
            <S.EmptyImage source={NoFriendImage} resizeMode="contain" />
            <S.EmptyText style={{ marginRight: 10 }}>친구가 없어요.</S.EmptyText>
          </>
        );
      case 'requests':
        // 받은 요청이 있다고 가정하고 해당 내용을 렌더링합니다.
        // 받은 요청이 없는 경우의 로직도 추가해야 합니다.
        return (
          // 여기에 받은 요청 목록을 렌더링하는 컴포넌트를 추가하세요.
          <Text>받은 요청이 여기에 표시됩니다.</Text>
        );
      default:
        return null;
    }
  };

  const getHeaderText = () => {
    switch (viewState) {
      case 'search':
        return '친구 검색';
      case 'friends':
        return '친구 목록';
      case 'requests':
        return '받은 요청';
      default:
        return '친구 관리';
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <S.ModalContainer>
        <S.ModalContent>
          <S.Header>
            <S.Top>
              <S.TopText>{getHeaderText()}</S.TopText>
            </S.Top>
            <S.ListBox>
              {renderContent()}
            </S.ListBox>
          </S.Header>
          <S.Body>
            <S.ViewSelector>
              <S.SelectorButton onPress={() => switchView('search')}>
                <S.SelectorText>친구 검색</S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton onPress={() => switchView('friends')}>
                <S.SelectorText>친구 목록</S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton onPress={() => switchView('requests')}>
                <S.SelectorText>받은 요청</S.SelectorText>
              </S.SelectorButton>
            </S.ViewSelector>
          </S.Body>

          <S.Footer>
            <S.CloseButton onPress={onClose}>
              <S.CloseImage source={CloseIcon} resizeMode='contain' />
            </S.CloseButton>

          </S.Footer>

        </S.ModalContent>
      </S.ModalContainer>
    </Modal>


  );


};

export default FriendManageModal;
