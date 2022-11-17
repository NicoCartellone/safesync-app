import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { useFirestore } from "../hook/useFirestore";
import userImg from "../../assets/userImg.png";
import Divider from "../components/Divider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TimeAgo from "@andordavoti/react-native-timeago";

const Necesidades = ({ navigation }) => {
  const [isPress, setIsPress] = useState(false);
  const {
    getAllNecesidades,
    necesidades,
    loading,
    error,
    updateAddLike,
    updateSubLike,
  } = useFirestore();

  useEffect(() => {
    getAllNecesidades();
  }, []);

  const isLoading = loading.getAllNecesidades;

  const handleLikeAdd = (item) => {
    setIsPress(!isPress);
    updateAddLike(item.id, item.like);
  };

  const handleLikeSub = (item) => {
    setIsPress(!isPress);
    updateSubLike(item.id, item.like);
  };

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
                    justifyContent: "space-around",
                    marginTop: 30,
                    marginBottom: 15,
                    marginRight: 30,
                  }}
                >
                  <View style={{ paddingHorizontal: 50 }}>
                    <Text style={styles.textTitleFlatList}>
                      {item.categoria}
                    </Text>
                    <Text style={styles.textBodyFlatList}>
                      {item.descripcion}
                    </Text>
                    {isPress ? (
                      <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() => handleLikeAdd(item)}
                      >
                        <MaterialCommunityIcons
                          name="thumb-up-outline"
                          color="white"
                          size={20}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() => handleLikeSub(item)}
                      >
                        <MaterialCommunityIcons
                          name="thumb-up-outline"
                          color="#aeaeae"
                          size={20}
                        />
                      </TouchableOpacity>
                    )}

                    <Text style={{ color: "white", fontSize: 10 }}>
                      {item.like}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column-reverse" }}>
                    <TimeAgo
                      style={styles.textBodyFlatList}
                      dateTo={new Date(item.fecha)}
                    />
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
  }, [getAllNecesidades, necesidades, loading, error, isPress]);
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
  textBodyFlatList: {
    color: "#C7C7C7",
    textTransform: "capitalize",
    fontSize: 10,
    marginTop: 10,
  },
  textTitleFlatList: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 20,
  },
});
