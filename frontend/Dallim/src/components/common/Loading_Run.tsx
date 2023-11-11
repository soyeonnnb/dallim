import { useEffect, useState } from 'react';
import { characterData } from '@/recoil/CharacterData';
import * as S from './Loading_Run.styles';
import { Circle } from 'react-native-progress';

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
        <S.Container >
            <S.Body>
                <S.CircleBox>
                    <Circle
                        size={100}
                        progress={progress}
                        showsText={true}
                        textStyle={{ fontSize: 20 }}
                        thickness={5}
                        // color='red'
                        // unfilledColor='blue'
                    />
                </S.CircleBox>
            </S.Body>

            <S.Footer>
                <S.ThemeBox>
                    <S.StyledGif
                        source={characterData[0].evolutions[0].running}
                        resizeMode="contain"
                    />
                </S.ThemeBox>
                <S.ThemeBox>
                    <S.StyledGif
                        source={characterData[1].evolutions[0].running}
                        resizeMode="contain"
                    />
                </S.ThemeBox>
                <S.ThemeBox>
                    <S.StyledGif
                        source={characterData[2].evolutions[0].running}
                        resizeMode="contain"
                    />
                </S.ThemeBox>
                <S.ThemeBox>
                    <S.StyledGif
                        source={characterData[3].evolutions[0].running}
                        resizeMode="contain"
                    />
                </S.ThemeBox>
            </S.Footer>

            <S.TabBox />
        </S.Container>
    );
};


export default Loading_Run;
