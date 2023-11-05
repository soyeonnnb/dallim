import Svg, {Path, G, Defs, Rect} from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  color: string;
}

function TagsIcon({width, height, color}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
      <G clip-path="url(#clip0_1046_19001)">
        <Path
          d="M16.3729 12.5H10.4688C9.34987 12.5 8.27681 12.9445 7.48564 13.7356C6.69447 14.5268 6.25 15.5999 6.25 16.7187V22.6229C6.25 23.7417 6.69375 24.8146 7.48542 25.6063L20.2271 38.3479C20.6188 38.7397 21.0839 39.0505 21.5958 39.2626C22.1077 39.4746 22.6563 39.5838 23.2104 39.5838C23.7645 39.5838 24.3131 39.4746 24.825 39.2626C25.3369 39.0505 25.802 38.7397 26.1937 38.3479L32.0979 32.4437C32.4897 32.052 32.8005 31.5869 33.0126 31.075C33.2246 30.5631 33.3338 30.0145 33.3338 29.4604C33.3338 28.9063 33.2246 28.3577 33.0126 27.8458C32.8005 27.3339 32.4897 26.8688 32.0979 26.4771L19.3542 13.7354C18.5634 12.9448 17.4911 12.5004 16.3729 12.5V12.5Z"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M36.6104 38.3482L42.5146 32.444C42.9064 32.0523 43.2172 31.5872 43.4293 31.0753C43.6413 30.5634 43.7505 30.0147 43.7505 29.4607C43.7505 28.9066 43.6413 28.358 43.4293 27.8461C43.2172 27.3342 42.9064 26.8691 42.5146 26.4773L27.6875 11.6523"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.5001 18.75H12.4792"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export default TagsIcon;
