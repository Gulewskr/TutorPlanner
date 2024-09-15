import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import styles from "./Home.scss";
import { StatusBar } from "expo-status-bar";
import CustomAlert from "../../components/alert/Alert";
import { useState } from "react";
import CustomInput from "../../components/input/Input";
import CustomButton from "../../components/button/Button";
import CustomTile from "../../components/tile/Tile";
import Navbar from "../../components/navbar/Navbar";
import LinearGradient from "react-native-linear-gradient";

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const showAlertHandler = () => setShowAlert(true);
  const closeAlert = () => setShowAlert(false);
  const users = ["OLA P", "KAMIL S"];

  return (
    <View style={styles.container}>
      {/* <LinearGradient
        colors={["#FFB6C1", "#FF6347"]}
        style={styles.gradient}
      ></LinearGradient> */}
      <Text>😘</Text>
      <Text>HOME SCREEN</Text>
      <Text>(to tylko tekst ale to już znak że zaczynamy działać :D)</Text>
      <StatusBar style="auto" />

      {users.map((user, i) => (
        <Button
          key={`user-${i}`}
          title={`Go to ${user} Page`}
          onPress={() => navigation.navigate("Profile", { name: user })}
        />
      ))}

      <View style={{ gap: 10 }}>
        <CustomButton
          key={1}
          icon="minus"
          secondary
          isDisabled
          handleClick={() => 1}
        >
          Usuń
        </CustomButton>
        <CustomButton
          key={12}
          icon="minus"
          secondary
          isDisabled
          handleClick={() => 1}
        >
          Usuń
        </CustomButton>
        <CustomButton
          key={13}
          icon="minus"
          secondary
          isDisabled
          handleClick={() => 1}
        >
          Usuń
        </CustomButton>
        <CustomButton
          key={31}
          icon="minus"
          secondary
          isDisabled
          handleClick={() => 1}
        >
          Usuń
        </CustomButton>
        <CustomButton
          key={14}
          icon="minus"
          secondary
          isDisabled
          handleClick={() => 1}
        >
          Usuń
        </CustomButton>
      </View>
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {},
// });

{
  /* <Button
        title="Show Alert" // Button to show the alert
        onPress={showAlertHandler}
      /> */
}

{
  /* <CustomAlert type="fail" visible={showAlert} onClose={closeAlert}>
          aaasdas asd asdas dafsd dsad asdas asd asdasd adas dasf sdfdsfaaaasdas
          asd asdas dafsd dsad asdas asd asdasd adas dasf sdfdsfaaaasdas asd
        </CustomAlert> */
}

{
  /* <CustomTile color="green">AAAAAA</CustomTile>
        <CustomTile color="yellow">AAAAAA</CustomTile>
        <CustomTile color="purple">AAAAAA</CustomTile> */
}

{
  /* <CustomInput />
        <CustomInput title="aaa" />
        <CustomInput title="aaa" icon="minus" />
        <CustomInput title="aaa" icon="minus" label="aaa" /> */
}
