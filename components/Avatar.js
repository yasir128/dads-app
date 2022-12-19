import * as React from 'react';


// import Icon from 'react-native-vector-icons/Entypo';
import CircleIcon from './CircleIcon'

import { View } from 'react-native';


const Icon = () => <View />

export default function Avatar({ size, Profile }) {
  return (
    <CircleIcon size={size} Icon={Profile || <Icon name="user" size={size * 0.5} color="#ffff" /> } />
  );
}
