import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function WatchIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
      <G clip-path="url(#clip0_1046_19013)">
        <Path
          d="M31.25 12.5H18.75C15.2982 12.5 12.5 15.2982 12.5 18.75V31.25C12.5 34.7018 15.2982 37.5 18.75 37.5H31.25C34.7018 37.5 37.5 34.7018 37.5 31.25V18.75C37.5 15.2982 34.7018 12.5 31.25 12.5Z"
          stroke={color}
          strokeWidth="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.75 37.5V43.75H31.25V37.5"
          stroke={color}
          strokeWidth="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.75 12.5V6.25H31.25V12.5"
          stroke={color}
          strokeWidth="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.75 29.1663V20.833"
          stroke={color}
          strokeWidth="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M25 29.1663V27.083"
          stroke={color}
          strokeWidth="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M31.25 29.167V22.917"
          stroke={color}
          strokeWidth="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1046_19013">
          <Rect width="50" height="50" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default WatchIcon;
