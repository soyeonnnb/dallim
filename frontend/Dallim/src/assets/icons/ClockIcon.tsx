import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function ClockIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.375 18C3.375 9.92555 9.92555 3.375 18 3.375C26.0744 3.375 32.625 9.92555 32.625 18C32.625 26.0744 26.0744 32.625 18 32.625C9.92555 32.625 3.375 26.0744 3.375 18ZM18 5.625C11.1682 5.625 5.625 11.1682 5.625 18C5.625 24.8318 11.1682 30.375 18 30.375C24.8318 30.375 30.375 24.8318 30.375 18C30.375 11.1682 24.8318 5.625 18 5.625Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 7.875C18.6213 7.875 19.125 8.37868 19.125 9V18H24.75C25.3713 18 25.875 18.5037 25.875 19.125C25.875 19.7463 25.3713 20.25 24.75 20.25H18C17.3787 20.25 16.875 19.7463 16.875 19.125V9C16.875 8.37868 17.3787 7.875 18 7.875Z"
        fill={color}
      />
    </Svg>
  );
}

export default ClockIcon;
