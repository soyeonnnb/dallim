import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface SpinAnimationProps {
    duration?: number;
    children: React.ReactNode;
}

const SpinAnimation: React.FC<SpinAnimationProps> = ({ duration = 4000, children }) => {
    const animatedRotation = useRef(new Animated.Value(0)).current;
    const spin = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg'],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedRotation, {
                toValue: 1,
                duration,
                useNativeDriver: true,
            })
        ).start();
    }, [duration]);

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            {children}
        </Animated.View>
    );
}

export default SpinAnimation;
