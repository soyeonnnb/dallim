import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function DeleteIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 4H8L1 12L8 20H21C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18V6C23 5.46957 22.7893 4.96086 22.4142 4.58579C22.0391 4.21071 21.5304 4 21 4V4Z"
        stroke={color}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18 9L12 15"
        stroke={color}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 9L18 15"
        stroke={color}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default DeleteIcon;
