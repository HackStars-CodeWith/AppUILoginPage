import React, { useEffect, useRef } from "react";
import { Animated, Easing, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from "../constants/Animation";

export default function BackgroundAnimation({ ImagePath = '../assets/images/BackWall2.jpg' }) {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  const getImageSource = () => {
    if (typeof ImagePath === 'number') {
      return ImagePath;
    }
    return { uri: ImagePath };
  };

  return (
    <AnimatedImage
      resizeMode="repeat"
      style={[
        styles.background,
        {
          transform: [
            {
              translateX: translateAnimation,
            },
            {
              translateY: translateAnimation,
            },
          ],
        },
      ]}
      source={getImageSource()}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 1,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],
  },
});
