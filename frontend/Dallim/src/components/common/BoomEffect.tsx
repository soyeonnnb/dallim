import React from 'react';
import { View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

type BoomEffectProps = {
    show: boolean;
};

const BoomEffect: React.FC<BoomEffectProps> = ({ show }) => {

    if (!show) return null;

    return (
        <View style={{
            position: 'absolute',
            top: 550,
            left: -80,
            zIndex: 999
        }}>
            <ConfettiCannon
                count={200}
                origin={{ x: -100 , y: 0 }}
                fadeOut={true}
            />
        </View>
    );
};

export default BoomEffect;
