import React, { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import * as S from './FriendManageModal.styles';
import CloseIcon from '@/assets/icons/CloseIcon_3.png';
import NoFriendImage from '@/assets/images/NoFriend.png';
import NoSearchImage from '@/assets/images/NoSearch.png';
import SearchIcon from '@/assets/icons/SearchIcon.png';
import FriendBox from '../FriendBox';
import UserBox from '../UserBox';
import { fetchFriendList, fetchUserSearch } from '@/apis/SocialApi';
import { Animated } from 'react-native';



type Friend = {
  userId: number;
  characterIndex: number;
  nickname: string;
  level: number;
};

type User = {
  userId: number;
  characterIndex: number;
  nickname: string;
  level: number;
  isFollower: boolean;
};


type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const FriendManageModal: React.FC<Props> = ({ isVisible, onClose }) => {

  const [viewState, setViewState] = useState('friends');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  // 친구 리스트 가져오기 (Axios)
  useEffect(() => {
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
  }, [isVisible]);


  // 닉네임 검색 : 비동기 (Axios)
  const handleNicknameSearch = async () => {
    try {
      setLoading(true);
      const response = await fetchUserSearch(searchQuery);
      setSearchResults(response.length > 0 ? response : null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Search = () => (
    <S.Search>
      <S.SearchLeft>
        <S.SearchBox
          placeholder="닉네임을 입력해주세요."
          value={searchQuery} // 검색어 상태와 입력 필드를 연결
          onChangeText={setSearchQuery} // 입력 필드가 변경될 때마다 검색어 상태를 업데이트
        />
      </S.SearchLeft>
      <S.SearchRight>
        <S.SendButton onPress={handleNicknameSearch}>
          <S.SearchIcon source={SearchIcon} resizeMode='contain' />
        </S.SendButton>
      </S.SearchRight>
    </S.Search>
  );

  const [fadeAnim] = useState(new Animated.Value(0));  // 초기 투명도는 0

  useEffect(() => {
    // 무한 반복하는 페이드 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <S.AnimatedFooterText style={{ opacity: fadeAnim }}>로딩 중...</S.AnimatedFooterText>

        </>
      )
    }
    switch (viewState) {
      case 'search':
        return (
          <>
            <Search />
            {((searchResults.length > 0) || (searchResults === null)) ? (
              <>
                <ScrollView>
                  {searchResults.map((user) => (
                    <S.UserBox key={user.userId}>
                      <UserBox {...user} />
                    </S.UserBox>
                  ))}
                </ScrollView>
              </>
            ) : (
              <>
                <S.EmptyImage source={NoSearchImage} resizeMode="contain" />
                <S.EmptyText>검색된 유저가 없어요.</S.EmptyText>
                <S.EmptyText style={{ marginTop: 5 }}>정확한 유저의 닉네임을 입력해주세요.</S.EmptyText>
              </>
            )}
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
          <S.SelectorText>받은 요청이 여기에 표시됩니다.</S.SelectorText>
        );
      default:
        return null;
    }
  };

  // Tab Box
  const switchView = (newState: string) => {
    setViewState(newState);
  };
  const getHeaderText = () => {
    switch (viewState) {
      case 'search':
        return '유저 검색';
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
              <S.SelectorButton onPress={() => switchView('search')} isActive={viewState === 'search'}>
                <S.SelectorText>유저 검색</S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton onPress={() => switchView('friends')} isActive={viewState === 'friends'}>
                <S.SelectorText>친구 목록</S.SelectorText>
              </S.SelectorButton>
              <S.SelectorButton onPress={() => switchView('requests')} isActive={viewState === 'requests'}>
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
