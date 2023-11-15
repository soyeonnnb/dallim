import {useEffect, useState} from 'react';
import {characterData} from '@/recoil/data/CharacterData';
import * as S from './Loading_Run.styles';
import {Circle} from 'react-native-progress';

function Loading_Run() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 1) {
          clearInterval(interval);
          return 1;
        }
        return oldProgress + 0.1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      {/* <S.Body>
        <S.CircleBox>
          <Circle
            size={100}
            progress={progress}
            showsText={true}
            textStyle={{fontSize: 20}}
            thickness={5}
            // color='red'
            // unfilledColor='blue'
          />
        </S.CircleBox>
      </S.Body> */}

      <S.RunBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[0].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[1].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[2].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
        <S.ThemeBox>
          <S.StyledGif
            source={characterData[3].Evolutions[0].RunRight}
            resizeMode="contain"
          />
        </S.ThemeBox>
      </S.RunBox>

      <S.TabBox />
    </S.Container>
  );
}

export default Loading_Run;
