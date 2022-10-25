import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FormAlertaRoja from "../components/Formulario/FormAlertaRoja";
import FormAlertaNaranja from "../components/Formulario/FormAlertaNaranja";

const CrearAlerta = ({ navigation }) => {
  const [changeForm, setChangeForm] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{ name: "Necesidades" }],
          });
          navigation.navigate("Home");
        }}
        style={styles.btnVolver}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          color={"#EDF2F4"}
          size={26}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <Text style={styles.textTitle}>Crear alerta de seguridad</Text>
      <Text style={styles.textChangeBtn}>Elejir alerta roja o naranja</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#DF0E01",
            margin: 10,
            borderRadius: 10,
          }}
          onPress={() => setChangeForm(true)}
        >
          <Text style={{ color: "white" }}>Alerta Roja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#DCAE56",
            margin: 10,
            borderRadius: 10,
          }}
          onPress={() => setChangeForm(false)}
        >
          <Text style={{ color: "black" }}>Alerta Naranja</Text>
        </TouchableOpacity>
      </View>
      <View>{changeForm ? <FormAlertaRoja /> : <FormAlertaNaranja />}</View>
    </View>
  );
};
export default CrearAlerta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#263248",
  },
  textTitle: {
    display: "flex",
    position: "absolute",
    top: 60,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  btnAlerta: {
    alignItems: "center",
    padding: 10,
    width: "50%",
    height: 40,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "white",
  },
  text: {
    alignItems: "center",
    color: "black",
  },
  pickerNaranja: {
    backgroundColor: "#DCAE56",
    color: "black",
    textAlign: "center",
    marginBottom: 50,
  },
  pickerRojo: {
    height: 50,
    backgroundColor: "#C3433B",
    color: "white",
    textAlign: "center",
    marginBottom: 50,
  },
  labelTextAlerta: {
    color: "white",
    marginBottom: 5,
  },
  btnVolver: {
    marginTop: Constants.statusBarHeight,
    display: "flex",
    position: "absolute",
    top: 10,
    left: 10,
  },
  buttonForm: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "black",
  },
  btnText: {
    alignItems: "center",
    color: "white",
  },
  textChangeBtn: {
    color: "white",
  },
});
