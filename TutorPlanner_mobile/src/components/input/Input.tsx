import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

interface InputProps {
  title?: string;
  icon?: string;
  label?: string;
}

const iconsMap: { [key: string]: any } = {
  minus: require("../../assets/icons/minus.png"),
  plus: require("../../assets/icons/plus.png"),
};

const CustomInput: React.FC<InputProps> = ({ title, icon, label }) => {
  const [width, setWidth] = useState(0);

  return (
    <View
      style={{ position: "relative", marginTop: 10, width: 320 }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.content}>
        {icon && <Image source={iconsMap[icon]} style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholder={title ? `--${title}--` : ""}
        />
      </View>

      <View style={[styles.shadow, { width }]}></View>
    </View>
  );
};

CustomInput.displayName = "CustomInput";

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: -12,
    left: 10,
    zIndex: 2,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#070707",
    width: 120,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#070707",
    textAlign: "center",
    textAlignVertical: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  shadow: {
    borderRadius: 10,
    height: 40,
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "#9E0042",
    borderWidth: 1,
    borderColor: "#070707",
    zIndex: -1,
  },
});
