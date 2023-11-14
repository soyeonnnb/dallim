import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function FriendRemoveIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 11" fill="none">
      <Path
        d="M5 4.4C6.18347 4.4 7.14286 3.41503 7.14286 2.2C7.14286 0.984974 6.18347 0 5 0C3.81653 0 2.85714 0.984974 2.85714 2.2C2.85714 3.41503 3.81653 4.4 5 4.4Z"
        fill={color}
      />
      <Path
        d="M0 11C0 8.16494 2.23858 5.86667 5 5.86667C7.76142 5.86667 10 8.16494 10 11H0Z"
        fill={color}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.5 5C9.5 4.72386 9.72386 4.5 10 4.5L14 4.5C14.2761 4.5 14.5 4.72386 14.5 5C14.5 5.27614 14.2761 5.5 14 5.5L10 5.5C9.72386 5.5 9.5 5.27614 9.5 5Z"
        fill={color}
      />
    </Svg>
  );
}

export default FriendRemoveIcon;
