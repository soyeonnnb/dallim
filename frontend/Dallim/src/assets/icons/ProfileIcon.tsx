import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function ProfileIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
      <G clipPath="url(#clip0_139_4933)">
        <Path
          d="M17.1875 9.375C17.1875 10.6182 16.6936 11.8105 15.8146 12.6896C14.9355 13.5686 13.7432 14.0625 12.5 14.0625C11.2568 14.0625 10.0645 13.5686 9.18544 12.6896C8.30636 11.8105 7.8125 10.6182 7.8125 9.375C7.8125 8.1318 8.30636 6.93951 9.18544 6.06044C10.0645 5.18136 11.2568 4.6875 12.5 4.6875C13.7432 4.6875 14.9355 5.18136 15.8146 6.06044C16.6936 6.93951 17.1875 8.1318 17.1875 9.375Z"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25C9.18479 25 6.00537 23.683 3.66117 21.3388C1.31696 18.9946 0 15.8152 0 12.5ZM12.5 1.5625C10.4403 1.56261 8.42245 2.14432 6.67875 3.24067C4.93506 4.33702 3.53638 5.90345 2.64369 7.75968C1.75101 9.6159 1.4006 11.6865 1.63281 13.7331C1.86502 15.7796 2.6704 17.7191 3.95625 19.3281C5.06563 17.5406 7.50781 15.625 12.5 15.625C17.4922 15.625 19.9328 17.5391 21.0438 19.3281C22.3296 17.7191 23.135 15.7796 23.3672 13.7331C23.5994 11.6865 23.249 9.6159 22.3563 7.75968C21.4636 5.90345 20.0649 4.33702 18.3212 3.24067C16.5776 2.14432 14.5597 1.56261 12.5 1.5625Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_139_4933">
          <Rect width="25" height="25" fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ProfileIcon;
