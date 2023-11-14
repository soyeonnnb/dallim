import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  // color: string;
}

function DirectionLeftIcon({width, height}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.1279 3.34088C12.4574 3.67038 12.4574 4.20462 12.1279 4.53412L7.66199 9L12.1279 13.4659C12.4574 13.7954 12.4574 14.3296 12.1279 14.6591C11.7984 14.9886 11.2641 14.9886 10.9346 14.6591L5.87213 9.59662C5.54262 9.26712 5.54262 8.73288 5.87213 8.40338L10.9346 3.34088C11.2641 3.01137 11.7984 3.01137 12.1279 3.34088Z"
        fill="#DCDDE7"
      />
    </Svg>
  );
}

export default DirectionLeftIcon;
