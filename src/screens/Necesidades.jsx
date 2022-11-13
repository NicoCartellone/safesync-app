import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { useFirestore } from "../hook/useFirestore";
import userImg from "../../assets/userImg.png";
import Divider from "../components/Divider";

const Necesidades = ({ navigation }) => {
  const { getAllNecesidades, necesidades, loading, error } = useFirestore();

  useEffect(() => {
    getAllNecesidades();
  }, []);

  const isLoading = loading.getAllNecesidades;

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
          <Text style={styles.textTitle}>Necesidades</Text>
          <TouchableOpacity
            style={styles.btnAlerta}
            onPress={() => navigation.navigate("CrearNecesidad")}
          >
            <Text style={styles.text}>Agregar una necesidad</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "80%" }}>
          <FlatList
            data={necesidades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginVertical: 10,
                    marginRight: 30,
                  }}
                >
                  <View style={{ paddingHorizontal: 50 }}>
                    <Text style={styles.textFlatList}>{item.categoria}</Text>
                    <Text style={styles.textFlatList}>{item.descripcion}</Text>
                  </View>
                  <View style={{ flexDirection: "column-reverse" }}>
                    <Text style={styles.textFlatList}>{item.fecha}</Text>
                    <Image source={userImg} style={{ width: 40, height: 40 }} />
                  </View>
                </View>
                <Divider />
              </View>
            )}
          />
        </View>
      </View>
    );
  }, [getAllNecesidades, necesidades, loading, error]);
};
export default Necesidades;

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
