import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
  stroke?: number;
}

function DistanceIcon({width, height, color, stroke = 2}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clip-path="url(#clip0_684_13195)">
        <Path
          d="M3.33325 15.8334L6.66659 4.16669"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M13.3333 4.16669L16.6666 15.8334"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 6.66667V5"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 10.8334V9.16669"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 15V13.3333"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_684_13195">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default DistanceIcon;
