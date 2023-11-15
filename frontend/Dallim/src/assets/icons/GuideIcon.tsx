import Svg, { Path } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function GuideIcon({ width, height, color }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path d="M14.6673 15.0996V18.3334C14.6673 19.3459 13.8465 20.1668 12.834 20.1668H9.16732C8.1548 20.1668 7.33398 19.3459 7.33398 18.3334V15.0996" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M7.33398 6.90064V3.66683C7.33398 2.65431 8.1548 1.8335 9.16732 1.8335H12.834C13.8465 1.8335 14.6673 2.65431 14.6673 3.66683V6.90064" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M16.5 11C16.5 7.96243 14.0376 5.5 11 5.5C7.96243 5.5 5.5 7.96243 5.5 11C5.5 14.0376 7.96243 16.5 11 16.5C14.0376 16.5 16.5 14.0376 16.5 11Z" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M12.8333 10.9998H11V9.1665" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  );
}

export default GuideIcon;
