export default function animateView (toValue, animatedRef, duration, delay) {
    return Animated.timing(
      animatedRef,
      {
        toValue,
        duration,
        useNativeDriver: true,
        delay,
      }
    )
  }
