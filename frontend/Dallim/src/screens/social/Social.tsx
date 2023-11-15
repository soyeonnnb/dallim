import * as S from './Social.styles'; // 스타일 컴포넌트 import
import SocialHeader from '@/components/socialComponent/SocialHeader';
import SocialBody from '@/components/socialComponent/SocialBody';
import {useState} from 'react';

interface SocialProps {
  navigation: any;
}

function Social({navigation}: SocialProps) {
  const [isFriend, setIsFriend] = useState(false);
  const [month, setMonth] = useState<number | null>(null);
  const [week, setWeek] = useState<number | null>(null);
  const updateDateInfo = (month: number, week: number) => {
    setMonth(month);
    setWeek(week);
  };

  const toggleHandle = () => {
    setIsFriend(!isFriend);
  };

  return (
    <S.Container>
      <S.BackgroundImage
        source={require('@/assets/images/MainBackground.png')}
        resizeMode="cover">
        <S.Header>
          <SocialHeader month={month} week={week} />
        </S.Header>

        <S.Body>
          <SocialBody
            navigation={navigation}
            isFriend={isFriend}
            onToggle={toggleHandle}
            onUpdateDateInfo={updateDateInfo}
          />
        </S.Body>
        <S.TabBox />
      </S.BackgroundImage>
    </S.Container>
  );
}

export default Social;
