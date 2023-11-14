import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
}

function AddFriendIcon({width, height}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 35 35" fill="none">
      <Path
        d="M14 15.75C16.8995 15.75 19.25 13.3995 19.25 10.5C19.25 7.60051 16.8995 5.25 14 5.25C11.1005 5.25 8.75 7.60051 8.75 10.5C8.75 13.3995 11.1005 15.75 14 15.75Z"
        fill="white"
      />
      <Path
        d="M14 19.25C19.799 19.25 24.5 23.951 24.5 29.75H3.5C3.5 23.951 8.20101 19.25 14 19.25Z"
        fill="white"
      />
      <Path
        d="M28 12.25C28 11.2835 27.2165 10.5 26.25 10.5C25.2835 10.5 24.5 11.2835 24.5 12.25V14H22.75C21.7835 14 21 14.7835 21 15.75C21 16.7165 21.7835 17.5 22.75 17.5H24.5V19.25C24.5 20.2165 25.2835 21 26.25 21C27.2165 21 28 20.2165 28 19.25V17.5H29.75C30.7165 17.5 31.5 16.7165 31.5 15.75C31.5 14.7835 30.7165 14 29.75 14H28V12.25Z"
        fill="white"
      />
    </Svg>
  );
}

export default AddFriendIcon;
