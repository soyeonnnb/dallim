import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function RunningAlarmIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
      <G clip-path="url(#clip0_1046_18993)">
        <Path
          d="M20.8333 10.4167C20.8333 9.3116 21.2722 8.25179 22.0536 7.47039C22.835 6.68899 23.8949 6.25 24.9999 6.25C26.105 6.25 27.1648 6.68899 27.9462 7.47039C28.7276 8.25179 29.1666 9.3116 29.1666 10.4167C31.5591 11.548 33.5987 13.309 35.0667 15.511C36.5347 17.7131 37.3758 20.2731 37.4999 22.9167V29.1667C37.6567 30.4619 38.1154 31.7022 38.8391 32.7878C39.5628 33.8733 40.5313 34.7738 41.6666 35.4167H8.33325C9.46854 34.7738 10.437 33.8733 11.1607 32.7878C11.8844 31.7022 12.3431 30.4619 12.4999 29.1667V22.9167C12.624 20.2731 13.4651 17.7131 14.9331 15.511C16.4012 13.309 18.4407 11.548 20.8333 10.4167"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.75 35.417V37.5003C18.75 39.1579 19.4085 40.7476 20.5806 41.9197C21.7527 43.0918 23.3424 43.7503 25 43.7503C26.6576 43.7503 28.2473 43.0918 29.4194 41.9197C30.5915 40.7476 31.25 39.1579 31.25 37.5003V35.417"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M43.75 14.0146C42.3835 11.0422 40.3991 8.3952 37.9292 6.25"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.25 14.0146C7.61531 11.0426 9.59823 8.39562 12.0667 6.25"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1046_18993">
          <Rect width="50" height="50" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default RunningAlarmIcon;
