import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import { useFirestore } from "../hook/useFirestore";
import { useEffect, useMemo } from "react";
import userImg from "../../assets/userImg.png";
import Divider from "../components/Divider";

const Seguridad = ({ navigation }) => {
  const { getAllAlertas, alertas, loading, error } = useFirestore();

  useEffect(() => {
    getAllAlertas();
  }, []);

  const isLoading = loading.getAllAlertas;

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
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textTitle}>Seguridad</Text>
          <TouchableOpacity
            style={styles.btnAlerta}
            onPress={() => navigation.navigate("CrearAlerta")}
          >
            <Text style={styles.text}>Agregar una alerta</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "75%", marginTop: 30 }}>
          {alertas ? (
            <FlatList
              data={alertas}
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
                      <Text style={styles.textFlatList}>{item.fecha}</Text>
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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#263248",
              }}
            >
              <Text style={{ color: "white" }}>Todavia no hay alertas</Text>
            </View>
          )}
        </View>
      </View>
    );
  }, [getAllAlertas, alertas, loading, error]);
};
export default Seguridad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263248",
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
    fontStyle: "italic",
  },
  textTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  textFlatList: {
    color: "white",
    textTransform: "capitalize",
  },
});
