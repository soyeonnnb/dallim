import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function EditIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#clip0_139_4934)">
        <Path
          d="M7.29175 10.4167H21.8751L17.7084 6.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.7083 14.5835H3.125L7.29167 18.7502"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_139_4934">
          <Rect width="25" height="25" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default EditIcon;
