import React from 'react';
import {useState, useEffect} from 'react';

// icons
import MainIcon from '../../../assets/icons/MainIcon';
import ChartIcon from '../../../assets/icons/ChartIcon';
import SocialIcon from '../../../assets/icons/SocialIcon';
import EditIcon from '../../../assets/icons/EditIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';

// styles
import * as varStyles from '../styles';

interface NavIconProps {
  focused: boolean;
  darkMode: boolean;
  type: 'main' | 'social' | 'chart' | 'edit' | 'profile';
}

const getNavIconColor = (darkMode: boolean, focused: boolean) => {
  let iconColor;
  if (darkMode) {
    iconColor = focused ? varStyles.colors.white : 'orange'; // 하양 주황
  } else {
    iconColor = focused
      ? varStyles.colors.lightPurple
      : varStyles.colors.darkBlue; // 보라 분홍
  }
  return iconColor;
};

const NavIcon = ({focused, darkMode, type}: NavIconProps) => {
  let IconComponent;

  const [color, setColor] = useState('#F78CA2');

  useEffect(() => {
    setColor(getNavIconColor(darkMode, focused));
  }, [darkMode, focused]);

  switch (type) {
    case 'main':
      IconComponent = MainIcon;
      break;
    case 'social':
      IconComponent = SocialIcon;
      break;
    case 'chart':
      IconComponent = ChartIcon;
      break;
    case 'edit':
      IconComponent = EditIcon;
      break;
    case 'profile':
      IconComponent = ProfileIcon;
      break;
    default:
      throw new Error(`Unknown icon type: ${type}`);
  }

  return (
    <>
      <IconComponent color={color} width={25} height={25} />
    </>
  );
};

export default NavIcon;
