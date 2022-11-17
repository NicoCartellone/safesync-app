import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useContext, useMemo, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useFirestore } from "../hook/useFirestore";
import userImg from "../../assets/userImg.png";
import Divider from "../components/Divider";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import TimeAgo from "@andordavoti/react-native-timeago";

const Perfil = () => {
  const { signOutUser, userData } = useContext(UserContext);
  const { getAlertXuser, alertXuser, loading, error } = useFirestore();

  useEffect(() => {
    getAlertXuser();
  }, []);

  const isLoading = loading.getAlertXuser;

  return useMemo(() => {
    return error ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#263248",
        }}
      >
        <Text>{error}</Text>
      </View>
    ) : isLoading ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#263248",
        }}
      >
        <Text style={{ color: "white" }}>Cargando datos...</Text>
      </View>
    ) : (
      <View style={styles.cotainer}>
        <StatusBar style="light" />
        <View
          style={{
            marginTop: Constants.statusBarHeight,
            alignItems: "flex-end",
            justifyContent: "center",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity onPress={() => signOutUser()}>
            <View style={{ alignItems: "center", marginVertical: 5 }}>
              <MaterialCommunityIcons
                name="logout"
                color="white"
                size={30}
              ></MaterialCommunityIcons>
              <Text style={{ color: "white", fontSize: 10, marginTop: 2 }}>
                Cerrar Sesión
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={styles.textTitle}>Perfil</Text>
          <Text style={styles.text}>{userData.displayName}</Text>
          <Text style={styles.text}>{userData.email}</Text>
        </View>
        <View style={{ height: "75%", marginTop: 30 }}>
          {alertXuser ? (
            <FlatList
              data={alertXuser}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 10,
                      marginHorizontal: 20,
                      marginRight: 30,
                    }}
                  >
                    <View>
                      <View style={{ margin: 10 }}>
                        <Text style={{ color: "white", textAlign: "center" }}>
                          {item.nombre} alertó
                        </Text>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        {item.tipo == "Roja" ? (
                          <Text
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: 10,
                              padding: 5,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.categoria}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              backgroundColor: "orange",
                              color: "black",
                              borderRadius: 10,
                              padding: 5,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.categoria}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={{ flexDirection: "column-reverse" }}>
                      <TimeAgo
                        style={styles.textFlatList}
                        dateTo={new Date(item.fecha)}
                      />
                      <Image
                        source={userImg}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </View>
                  <Divider />
                </View>
              )}
            />
          ) : (
            <View>
              <Text>Todavia no creaste una alerta</Text>
            </View>
          )}
        </View>
      </View>
    );
  }, [userData, signOutUser, alertXuser, getAlertXuser, error, loading]);
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
    marginVertical: 2,
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
  },
  textFlatList: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 10,
  },
});
