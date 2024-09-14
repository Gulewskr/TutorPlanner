import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  secondary: boolean;
  icon: string;
  title: string;
  handleClick: () => void;
}

const iconsMap: { [key: string]: any } = {
  minus: require("../../assets/icons/minus.png"),
  plus: require("../../assets/icons/plus.png"),
};

const CustomButton: React.FC<ButtonProps> = ({
  title,
  handleClick,
  secondary,
  icon,
}) => {
  const [pressed, setPressed] = React.useState<boolean>(false);
  const [buttonHeight, setButtonHeight] = React.useState<number>(0);

  const style = styles(secondary, !!title, pressed, icon);

  return (
    <View style={{ position: "relative" }}>
      <Pressable
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
          {title && <Text style={style.text}>{title}</Text>}
        </View>
      </Pressable>
      <View style={[style.shadow, { height: buttonHeight }]} />
    </View>
  );
};

CustomButton.displayName = "Button";

export default CustomButton;

const styles = (
  secondary: boolean,
  isExpanded: boolean,
  pressed: boolean,
  icon?: string
) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      minHeight: 40,
      borderRadius: 10,
      width: isExpanded ? 200 : 40,
      backgroundColor: secondary ? "#B0CFFF" : "#FFA9F1",
      position: "relative",
      shadowColor: "#000000",
      elevation: 3,
      zIndex: 10,
      borderWidth: 1,
      borderColor: "#070707",
      top: pressed ? 4 : 0,
      left: pressed ? 4 : 0,
    },

    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginVertical: 5,
    },

    icon: {
      width: 20,
      height: 20,
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
      width: isExpanded ? 200 : 40,
      position: "absolute",
      top: 4,
      left: 4,
      backgroundColor: secondary ? "#002C9E" : "#9E0042",
      borderWidth: 1,
      borderColor: "#070707",
      zIndex: 1,
    },
  });
