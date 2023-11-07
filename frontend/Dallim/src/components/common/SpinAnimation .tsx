import { Animated, Image } from 'react-native';

const SpinAnimation = ({ source, resizeMode, duration, children, ...props }: any) => {

    return (
        <Animated.View {...props}>
            <Image source={source} resizeMode={resizeMode} />
            {children}
        </Animated.View>
    );
};

export default SpinAnimation;
