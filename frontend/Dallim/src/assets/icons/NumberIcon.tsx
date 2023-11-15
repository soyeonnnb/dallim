import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
  stroke?: number;
}

function NumberIcon({width, height, color, stroke = 2}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <G clip-path="url(#clip0_1778_5146)">
        <Path
          d="M5 21.25V8.75L13.75 21.25V8.75"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M18.75 21.25H25"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M21.875 16.25C23.6009 16.25 25 14.5711 25 12.5C25 10.4289 23.6009 8.75 21.875 8.75C20.1491 8.75 18.75 10.4289 18.75 12.5C18.75 14.5711 20.1491 16.25 21.875 16.25Z"
          stroke={color}
          strokeWidth={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1778_5146">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default NumberIcon;
