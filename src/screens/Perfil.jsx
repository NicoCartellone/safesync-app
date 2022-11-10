import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useFirestore } from "../hook/useFirestore";
import { auth } from "../firebase";

const Perfil = () => {
  const { signOutUser } = useContext(UserContext);
  const { getAllUsers, users } = useFirestore();

  let arrayUsers = [];

  for (let i = 0; i < users.length; i++) {
    const currentValue = users[i];
    if (currentValue.uid == auth.currentUser.uid) {
      arrayUsers.push(currentValue);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <View style={styles.cotainer}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.textTitle}>Perfil</Text>
        <FlatList
          data={arrayUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>Nombre: {item.displayName}</Text>
              <Text style={styles.text}>Email: {item.email}</Text>
            </View>
          )}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={signOutUser} style={styles.btnAlerta}>
          <Text style={styles.textBtn}>Cerrar Seión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
