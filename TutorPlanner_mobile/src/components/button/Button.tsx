import * as React from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
// import styles from "./Button.scss";

interface ButtonProps {
  secondary: boolean;
  icon: string;
  // key: string;
  title: string;
  handleClick: () => void;
}

const iconsMap: { [key: string]: any } = {
  minus: require("../../assets/icons/minus.png"),
  plus: require("../../assets/icons/plus.png"),
  // check: require("../../assets/icons/check.png"),
};

const CustomButton: React.FC<ButtonProps> = ({
  // key,
  title,
  handleClick,
  secondary,
  icon,
}) => {
  const style = styles(secondary, !!title, icon);
  return (
    <View style={{ position: "relative" }}>
      <Pressable style={style.button} onPress={handleClick}>
        <View style={style.content}>
          {icon && iconsMap[icon] && (
            <Image source={iconsMap[icon]} style={style.icon} />
          )}
          <Text style={style.text}>{title}</Text>
        </View>
      </Pressable>
      <View style={style.shadow} />
    </View>
  );
};

CustomButton.displayName = "Button";

export default CustomButton;

const styles = (secondary: boolean, isExpanded: boolean, icon?: string) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      borderRadius: 10,
      width: isExpanded ? 200 : 40,
      backgroundColor: secondary ? "#B0CFFF" : "#FFA9F1",
      position: "relative",
      shadowColor: "#000000",
      elevation: 3,
      zIndex: 10,
      borderWidth: 1,
      borderColor: "#070707",
    },

    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    icon: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },

    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#070707",
      display: isExpanded ? "flex" : "none",
    },

    shadow: {
      height: 40,
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
