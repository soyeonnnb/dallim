import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function NumberIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 36" fill="none">
      <G clip-path="url(#clip0_707_19595)">
        <Path
          d="M6 25.5V10.5L16.5 25.5V10.5"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M22.5 25.5H30"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M26.25 19.5C28.3211 19.5 30 17.4853 30 15C30 12.5147 28.3211 10.5 26.25 10.5C24.1789 10.5 22.5 12.5147 22.5 15C22.5 17.4853 24.1789 19.5 26.25 19.5Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
}

export default NumberIcon;
