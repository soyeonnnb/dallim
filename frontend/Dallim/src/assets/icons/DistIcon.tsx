import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  // color: string;
  // stroke?: number;
}

function DistIcon({width, height}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 10" fill="none">
      <Path
        d="M1.5 7.29355L3 1.95605"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6 1.95605L7.5 7.29355"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.5 3.09941V2.33691"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.5 5.00566V4.24316"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.5 6.91191V6.14941"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default DistIcon;
