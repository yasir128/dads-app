import * as React from 'react';

import { StyleSheet, View } from 'react-native';

export default function Avatar({ color = '#92bda3', size, Icon }) {
  return (
    <View
      style={[
        avatarStyles.container,
        { width: size, height: size, backgroundColor: color },
      ]}>
      { Icon }
    </View>
  );
}

const avatarStyles = StyleSheet.create({
  container: {
    borderRadius: 60,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
