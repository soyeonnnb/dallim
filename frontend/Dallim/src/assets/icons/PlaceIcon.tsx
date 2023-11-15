import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  // color: string;
  // stroke?: number;
}

function PlaceIcon({width, height}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 9" fill="none">
      <G clip-path="url(#clip0_1880_82642)">
        <Path
          d="M7.875 3.75C7.875 6.375 4.5 8.625 4.5 8.625C4.5 8.625 1.125 6.375 1.125 3.75C1.125 2.85489 1.48058 1.99645 2.11351 1.36351C2.74645 0.730579 3.60489 0.375 4.5 0.375C5.39511 0.375 6.25355 0.730579 6.88649 1.36351C7.51942 1.99645 7.875 2.85489 7.875 3.75Z"
          stroke="white"
          stroke-width="0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M4.5 4.875C5.12132 4.875 5.625 4.37132 5.625 3.75C5.625 3.12868 5.12132 2.625 4.5 2.625C3.87868 2.625 3.375 3.12868 3.375 3.75C3.375 4.37132 3.87868 4.875 4.5 4.875Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1880_82642">
          <Rect width="9" height="9" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PlaceIcon;
