import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  secondary: boolean;
  icon: string;
  children?: string;
  handleClick: () => void;
  isDisabled?: boolean;
}

const iconsMap: { [key: string]: any } = {
  minus: require("../../assets/icons/minus.png"),
  plus: require("../../assets/icons/plus.png"),
};

const CustomButton: React.FC<ButtonProps> = ({
  children,
  handleClick,
  secondary,
  isDisabled = false,
  icon,
}) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [buttonHeight, setButtonHeight] = useState<number>(0);
  const [width, setWidth] = useState(0);

  const style = styles(secondary, !!children, pressed, isDisabled);

  return (
    <View
      style={style.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
    >
      <Pressable
        disabled={isDisabled}
        style={style.button}
        onPress={handleClick}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setButtonHeight(height);
        }}
      >
        <View style={style.content}>
          {icon && iconsMap[icon] && (
            <Image source={iconsMap[icon]} style={style.icon} />
          )}
          {children && <Text style={style.text}>{children}</Text>}
        </View>
      </Pressable>
      <View style={[style.shadow, { height: buttonHeight, width }]} />
    </View>
  );
};

CustomButton.displayName = "Button";

export default CustomButton;

const styles = (
  secondary: boolean,
  isExpanded: boolean,
  pressed: boolean,
  isDisabled: boolean
) =>
  StyleSheet.create({
    container: { position: "relative", width: isExpanded ? 200 : 40 },

    button: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: 40,
      borderRadius: 10,
      width: isExpanded ? "auto" : 40,
      backgroundColor: isDisabled
        ? "#6F6F6F"
        : secondary
        ? pressed
          ? "#EFF5FF"
          : "#B0CFFF"
        : pressed
        ? "#F5D4F5"
        : "#FFA9F1",
      position: "relative",
      shadowColor: "#000000",
      elevation: 3,
      zIndex: 10,
      borderWidth: 1,
      borderColor: isDisabled ? "#4A4A4A" : "#070707",
      top: pressed ? 4 : 0,
      left: pressed ? 4 : 0,
    },

    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginVertical: 5,
      opacity: isDisabled ? 0.5 : 1,
    },

    icon: {
      width: 30,
      height: 30,
      resizeMode: "contain",
    },

    text: {
      fontSize: 12,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#070707",
      flexShrink: 1,
      maxWidth: "80%",
      paddingBottom: 2,
    },

    shadow: {
      borderRadius: 10,
      position: "absolute",
      top: 4,
      left: 4,
      backgroundColor: isDisabled
        ? "#6F6F6F"
        : secondary
        ? "#002C9E"
        : "#9E0042",
      borderWidth: 1,
      borderColor: isDisabled ? "#4A4A4A" : "#070707",
      zIndex: 1,
    },
  });
