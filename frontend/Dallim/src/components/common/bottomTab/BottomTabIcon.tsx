import React from 'react';
import {useState, useEffect} from 'react';

// icons
import MainIcon from '../../../assets/icons/MainIcon';
import ChartIcon from '../../../assets/icons/ChartIcon';
import SocialIcon from '../../../assets/icons/SocialIcon';
import EditIcon from '../../../assets/icons/EditIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';

// styles
import * as varStyles from '../globalStyles';

interface NavIconProps {
  focused: boolean;
  type: 'main' | 'social' | 'chart' | 'edit' | 'profile';
}

const getNavIconColor = (focused: boolean) => {
  let iconColor;

  iconColor = focused
    ? varStyles.colors.lightPurple
    : varStyles.colors.darkBlue;
  return iconColor;
};

const NavIcon = ({focused, type}: NavIconProps) => {
  let IconComponent;

  const [color, setColor] = useState('#F78CA2');

  useEffect(() => {
    setColor(getNavIconColor(focused));
  }, [focused]);

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
