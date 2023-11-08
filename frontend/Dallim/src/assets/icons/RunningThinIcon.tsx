import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
  stroke?: number;
}

function RunningThinIcon({width, height, color, stroke = 2}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
      <G clip-path="url(#clip0_707_19718)">
        <Path
          d="M19.5 7.5C20.3284 7.5 21 6.82843 21 6C21 5.17157 20.3284 4.5 19.5 4.5C18.6716 4.5 18 5.17157 18 6C18 6.82843 18.6716 7.5 19.5 7.5Z"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6 25.5L13.5 27L14.625 24.75"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M22.5 31.5V25.5L16.5 21L18 12"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.5 18V13.5L18 12L22.5 16.5L27 18"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      {/* <Defs>
        <clipPath id="clip0_707_19718">
          <Rect width={width} height={height} fill="white" />
        </clipPath>
      </Defs> */}
    </Svg>
  );
}

export default RunningThinIcon;
