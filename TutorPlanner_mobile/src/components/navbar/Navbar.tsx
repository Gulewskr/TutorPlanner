import React, { useState } from "react";
import styles from "./Navbar.scss";
import {
  View,
  TouchableOpacity,
  Animated,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface IconProps {
  name: string;
  icon: ImageSourcePropType;
}

const Navbar: React.FC = () => {
  const navigation = useNavigation();

  const [activeRoute, setActiveRoute] = useState<string>("Home");

  const icons: IconProps[] = [
    {
      name: "Calendar",
      icon: require("../../assets/icons/calendar.png"),
    },
    {
      name: "Students",
      icon: require("../../assets/icons/students.png"),
    },
    {
      name: "Home",
      icon: require("../../assets/icons/home.png"),
    },
    {
      name: "Payments",
      icon: require("../../assets/icons/payments.png"),
    },
    {
      name: "Notes",
      icon: require("../../assets/icons/notes.png"),
    },
  ];

  const handlePress = (route: string) => {
    setActiveRoute(route);
    navigation.navigate(route);
  };

  return (
    <View style={styles.navbar}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(icon.name)}
          style={styles.iconContainer}
        >
          <Animated.View
            style={[
              styles.iconWrapper,
              activeRoute === icon.name && styles.activeIconWrapper, // Apply raised style to active icon
            ]}
          >
            {activeRoute === icon.name ? (
              <>
                <View style={styles.backgroundRadius}></View>
                <View style={styles.background}></View>
                <View style={styles.activeIconContainer}>
                  <Image
                    source={icon.icon}
                    style={[styles.icon, styles.activeIcon]}
                  />
                </View>
              </>
            ) : (
              <Image
                source={icon.icon}
                style={[styles.icon, styles.inactiveIcon]}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
