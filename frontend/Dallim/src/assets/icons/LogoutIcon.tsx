import Svg, {Path} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
}

function LogoutIcon({width, height}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M3 2C3 1.73478 3.10536 1.48043 3.29289 1.29289C3.48043 1.10536 3.73478 1 4 1H12C12.2652 1 12.5196 1.10536 12.7071 1.29289C12.8946 1.48043 13 1.73478 13 2V15H14.5C14.6326 15 14.7598 15.0527 14.8536 15.1464C14.9473 15.2402 15 15.3674 15 15.5C15 15.6326 14.9473 15.7598 14.8536 15.8536C14.7598 15.9473 14.6326 16 14.5 16H1.5C1.36739 16 1.24021 15.9473 1.14645 15.8536C1.05268 15.7598 1 15.6326 1 15.5C1 15.3674 1.05268 15.2402 1.14645 15.1464C1.24021 15.0527 1.36739 15 1.5 15H3V2ZM4 15H12V2H4V15Z"
        fill="white"
      />
      <Path
        d="M9 9C9 9.26522 9.10536 9.51957 9.29289 9.70711C9.48043 9.89464 9.73478 10 10 10C10.2652 10 10.5196 9.89464 10.7071 9.70711C10.8946 9.51957 11 9.26522 11 9C11 8.73478 10.8946 8.48043 10.7071 8.29289C10.5196 8.10536 10.2652 8 10 8C9.73478 8 9.48043 8.10536 9.29289 8.29289C9.10536 8.48043 9 8.73478 9 9Z"
        fill="white"
      />
    </Svg>
  );
}

export default LogoutIcon;