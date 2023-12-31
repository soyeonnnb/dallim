import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function SearchIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
        stroke={color}
        stroke-width="1.5"
      />
      <Path
        d="M13.8562 13.8497L16 16M13.8562 13.8497C14.4747 13.2295 14.8571 12.3737 14.8571 11.4286C14.8571 9.53502 13.3221 8 11.4286 8C9.53502 8 8 9.53502 8 11.4286C8 13.3221 9.53502 14.8571 11.4286 14.8571C12.377 14.8571 13.2355 14.4721 13.8562 13.8497Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SearchIcon;
