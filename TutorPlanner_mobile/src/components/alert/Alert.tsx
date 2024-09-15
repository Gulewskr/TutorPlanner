import React, { useEffect, useRef } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";

interface AlertProps {
  children: React.ReactNode;
  type: string;
  visible: boolean;
  onClose: () => void;
  time?: number;
}

const CustomAlert: React.FC<AlertProps> = ({
  children,
  type,
  visible,
  onClose,
  time,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const animationDuration = (time ?? 5) * 1000;

  useEffect(() => {
    if (visible) {
      animation.setValue(0);

      Animated.timing(animation, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(onClose, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose, animation]);

  const animatedWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const backgroundColor =
    type === "success" ? "#BAFCA2" : type === "fail" ? "#FF6B6B" : "#F4DDFF";
  const animatedColor = "#5E5E5E80";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.messageWrapper}>
              <View style={[styles.backgroundColor, { backgroundColor }]}>
                <Animated.View
                  style={[
                    styles.animatedColor,
                    { width: animatedWidth, backgroundColor: animatedColor },
                  ]}
                />
              </View>
              <View style={styles.message}>
                <Text style={styles.text}>{children}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
CustomAlert.displayName = "CustomAlert";

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },

  messageWrapper: {
    marginTop: 40,
    minWidth: 180,
    maxWidth: "80%",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#070707",
    borderRadius: 10,
  },

  backgroundColor: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
  },

  animatedColor: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 10,
    zIndex: 1,
    opacity: 0.5,
  },

  message: {
    padding: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#070707",
    fontSize: 12,
    textAlign: "center",
  },
});
