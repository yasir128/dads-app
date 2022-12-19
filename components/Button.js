import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Pressable } from 'react-native';

export default function Button({ onPress, buttonTitle, color, disabled }) {
  const scaleAnimationRef = useRef(new Animated.Value(0)).current;
  const scaleAnimation = scaleAnimationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });

  const onPressIn = () => {
    Animated.spring(scaleAnimationRef, {
      toValue: 1,
      speed: 15,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnimationRef, {
      toValue: 0,
      speed: 18,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{ ...styles.container, opacity: disabled ? 0.5 : 1, transform: [{ scale: scaleAnimation }] }}>
      <Pressable
        disabled={disabled}
        style={{ ...styles.button, backgroundColor: color || '#382633' }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}>
        <Text style={styles.buttonTitle}>{buttonTitle}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: '70%',
    height: 50,
    padding: 10,
    borderRadius: 10,
    /* hugely annoying box-shadow: */
    borderWidth: 1,
    borderColor: '#0000001a',
    borderBottomWidth: 0,
    shadowColor: '#00000012',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});
