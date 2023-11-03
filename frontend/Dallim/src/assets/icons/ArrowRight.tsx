import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function ArrowRight({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.87213 3.34088C6.20163 3.01137 6.73587 3.01137 7.06537 3.34088L12.1279 8.40338C12.4574 8.73288 12.4574 9.26712 12.1279 9.59662L7.06537 14.6591C6.73587 14.9886 6.20163 14.9886 5.87213 14.6591C5.54262 14.3296 5.54262 13.7954 5.87213 13.4659L10.338 9L5.87213 4.53412C5.54262 4.20462 5.54262 3.67038 5.87213 3.34088Z"
        fill={color}
      />
    </Svg>
  );
}

export default ArrowRight;
