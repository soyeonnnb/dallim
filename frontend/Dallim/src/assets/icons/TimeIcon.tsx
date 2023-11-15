import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  // color: string;
  // stroke?: number;
}

function TimeIcon({width, height}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 9 10" fill="none">
      <G clip-path="url(#clip0_1880_87901)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.84375 4.62441C0.84375 2.57216 2.48139 0.907227 4.5 0.907227C6.51861 0.907227 8.15625 2.57216 8.15625 4.62441C8.15625 6.67667 6.51861 8.3416 4.5 8.3416C2.48139 8.3416 0.84375 6.67667 0.84375 4.62441ZM4.5 1.4791C2.79205 1.4791 1.40625 2.888 1.40625 4.62441C1.40625 6.36083 2.79205 7.76973 4.5 7.76973C6.20795 7.76973 7.59375 6.36083 7.59375 4.62441C7.59375 2.888 6.20795 1.4791 4.5 1.4791Z"
          fill="white"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.5 2.05176C4.65533 2.05176 4.78125 2.17978 4.78125 2.3377V4.6252H6.1875C6.34283 4.6252 6.46875 4.75321 6.46875 4.91113C6.46875 5.06905 6.34283 5.19707 6.1875 5.19707H4.5C4.34467 5.19707 4.21875 5.06905 4.21875 4.91113V2.3377C4.21875 2.17978 4.34467 2.05176 4.5 2.05176Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1880_87901">
          <Rect
            width="9"
            height="9.15"
            fill="white"
            transform="translate(0 0.0498047)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default TimeIcon;
