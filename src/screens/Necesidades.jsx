import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { useFirestore } from "../hook/useFirestore";
import userImg from "../../assets/userImg.png";
import Divider from "../components/Divider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TimeAgo from "@andordavoti/react-native-timeago";
import { auth } from "../firebase";

const Necesidades = ({ navigation }) => {
  const {
    getAllNecesidades,
    necesidades,
    loading,
    error,
    updateAddLike,
    updateSubLike,
    addLikeArray,
    removeLikeArray,
  } = useFirestore();

  useEffect(() => {
    getAllNecesidades();
  }, []);

  const isLoading = loading.getAllNecesidades;

  const handleLikeAdd = (item) => {
    addLikeArray(item.id);
    updateAddLike(item.id);
  };

  const handleLikeSub = (item) => {
    removeLikeArray(item.id);
    updateSubLike(item.id);
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
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "white" }}>Cargando Necesidades</Text>
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
        <View></View>
        <View style={{ height: "75%", marginTop: 30 }}>
          <FlatList
            data={necesidades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10,
                    marginHorizontal: 40,
                  }}
                >
                  <View>
                    <View style={{ margin: 10, alignItems: "flex-end" }}>
                      <Text style={styles.textTitleFlatList}>
                        {item.categoria}
                      </Text>
                      <Text style={styles.textBodyFlatList}>
                        {item.descripcion}
                      </Text>
                      <View>
                        {item.likes.indexOf(auth.currentUser.uid) !== -1 ? (
                          <TouchableOpacity
                            style={{ marginTop: 5 }}
                            onPress={() => handleLikeSub(item)}
                          >
                            <MaterialCommunityIcons
                              name="heart"
                              color="red"
                              size={20}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{ marginTop: 5 }}
                            onPress={() => handleLikeAdd(item)}
                          >
                            <MaterialCommunityIcons
                              name="heart"
                              color="white"
                              size={20}
                            />
                          </TouchableOpacity>
                        )}

                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            textAlign: "center",
                          }}
                        >
                          {item.like}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "column-reverse" }}>
                    <TimeAgo
                      style={styles.textBodyFlatList}
                      dateTo={new Date(item.fecha)}
                      hideAgo={true}
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
  textBodyFlatList: {
    color: "#C7C7C7",
    textTransform: "capitalize",
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
  },
  textTitleFlatList: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 20,
    textAlign: "center",
  },
  btnEncuensta: {
    alignItems: "center",
    padding: 5,
    width: "20%",
    height: 20,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
});
