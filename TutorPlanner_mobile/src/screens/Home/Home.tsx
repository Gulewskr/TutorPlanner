import { Button, View, Text } from "react-native";
import styles from "./Home.scss";
import { StatusBar } from "expo-status-bar";
import CustomAlert from "../../components/alert/Alert";
import { useState } from "react";

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const showAlertHandler = () => setShowAlert(true);
  const closeAlert = () => setShowAlert(false);

  return (
    <View style={styles.container}>
      <Text>😘</Text>
      <Text>HOME SCREEN</Text>
      <Text>(to tylko tekst ale to już znak że zaczynamy działać :D)</Text>
      <StatusBar style="auto" />

      <Button
        title="Go to Profile Page"
        onPress={() => navigation.navigate("Profile")}
      />

      <Button
        title="Show Alert" // Button to show the alert
        onPress={showAlertHandler}
      />

      <View style={{ gap: 10 }}>
        <CustomAlert type="fail" visible={showAlert} onClose={closeAlert}>
          aaasdas asd asdas dafsd dsad asdas asd asdasd adas dasf sdfdsfaaaasdas
          asd asdas dafsd dsad asdas asd asdasd adas dasf sdfdsfaaaasdas asd
        </CustomAlert>
      </View>
    </View>
  );
};
