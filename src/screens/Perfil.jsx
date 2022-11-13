import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useContext, useMemo } from "react";
import { UserContext } from "../context/UserProvider";

const Perfil = () => {
  const { signOutUser, userData } = useContext(UserContext);

  return useMemo(() => {
    return (
      <View style={styles.cotainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textTitle}>Perfil</Text>
          <Text style={styles.text}>Nombre: {userData.displayName}</Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={signOutUser} style={styles.btnAlerta}>
            <Text style={styles.textBtn}>Cerrar Seión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [userData, signOutUser]);
};
export default Perfil;
const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: "#263248",
  },
  text: {
    color: "white",
    textAlign: "center",
    textTransform: "capitalize",
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
  textTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
});
