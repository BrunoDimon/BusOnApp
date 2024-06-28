import React, { useState } from "react";
import { Animated } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";

export default TypingIndicator = ({ isTyping = false }) => {
  const [yCoords, setYCoords] = useState(new Animated.Value(200));
  const [heightScale, setHeightScale] = useState(new Animated.Value(0));
  const [marginScale, setmarginScale] = useState(new Animated.Value(0));

  // on isTyping fire side effect
  if (isTyping) {
    slideIn();
  } else {
    slideOut();
  }

  // side effect
  function slideIn() {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 35,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 8,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }

  // side effect
  function slideOut() {
    Animated.parallel([
      Animated.spring(yCoords, {
        toValue: 200,
        useNativeDriver: false,
      }),
      Animated.timing(heightScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(marginScale, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: yCoords,
            },
          ],
          height: heightScale,
          marginLeft: 8,
          marginBottom: marginScale,
          width: 45,
          borderRadius: 20,
          backgroundColor: "#FFC100",
        },
      ]}
    >
      <TypingAnimation
        style={{ marginLeft: 6, marginTop: 7.2 }}
        dotRadius={3}
        dotMargin={5.5}
        dotColor={"#ffffff"}
      />
    </Animated.View>
  );
};
