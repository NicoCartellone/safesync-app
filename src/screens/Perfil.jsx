import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Perfil = () => {
  const { signOutUser } = useContext(UserContext);
  return (
    <View style={styles.cotainer}>
      <Text style={styles.text}>Perfil</Text>
      <TouchableOpacity onPress={signOutUser} style={styles.btnAlerta}>
        <Text style={styles.textBtn}>Cerrar Seión</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Perfil;
const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263248",
  },
  text: {
    color: "white",
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
  textBtn: {
    alignItems: "center",
    color: "black",
    fontStyle: "italic",
  },
});
