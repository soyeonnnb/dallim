import Toast from 'react-native-toast-message';

type ToastProps = {
    type: 'success' | 'error';
    text1: string;
    visibilityTime?: number;
    autoHide?: boolean;
    topOffset?: number;
};

const CustomToast = ({ type, text1, visibilityTime = 4000, autoHide = true, topOffset = 10 }: ToastProps) => {
    Toast.show({
        type,
        position: 'top',
        text1,
        visibilityTime,
        autoHide,
        topOffset,
    });
};

export default CustomToast;
