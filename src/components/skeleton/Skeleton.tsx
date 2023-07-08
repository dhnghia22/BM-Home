import React, { memo, useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  shape?: 'circle' | 'square' | 'text' | 'portrait' | 'landscape';
  width?: number;
  height?: number;
  marginTop?: number;
  style?: ViewStyle;
  borderRadius?: number;
}

const startValue = 0.5;
const endValue = 1;
const useNativeDriver = Platform.OS !== 'web';
const isInteraction = false;
const duration = 500;

const Skeleton: React.FC<SkeletonProps> = ({
  shape = 'square',
  width,
  height,
  marginTop,
  style,
  borderRadius,
}) => {
  const animation = useRef(new Animated.Value(startValue)).current;
  useEffect(() => {
    const start = () => {
      Animated.sequence([
        Animated.timing(animation, {
          duration,
          isInteraction,
          toValue: endValue,
          useNativeDriver,
        }),
        Animated.timing(animation, {
          duration,
          isInteraction,
          toValue: startValue,
          useNativeDriver,
        }),
      ]).start((e) => {
        if (e.finished) {
          start();
        }
      });
    };
    start();
  }, [animation]);
  const animationStyle = {
    backgroundColor: '#E1E9EE',
    height: '100%',
    opacity: animation,
  };
  const shapeStyle = styles[shape] || styles.square;

  return (
    <Animated.View
      style={[
        animationStyle,
        shapeStyle,
        width && { width },
        height && { height },
        marginTop && { marginTop },
        borderRadius && { borderRadius },
        style && { ...style },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  square: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  text: {
    width: 122,
    height: 12,
    borderRadius: 6,
  },
  portrait: {
    width: 48,
    height: 72,
    borderRadius: 4,
  },
  landscape: {
    width: 72,
    height: 48,
    borderRadius: 4,
  },
});

export default memo(Skeleton);
