import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { useFirestore } from "../hook/useFirestore";
import userImg from "../../assets/userImg.png";
import Divider from "../components/Divider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TimeAgo from "@andordavoti/react-native-timeago";
import { auth } from "../firebase";
import { encuestas } from "../dataEncuenstas";

const Necesidades = ({ navigation }) => {
  const [showModal, setShowModal] = useState("");
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
        <View
          style={{
            justifyContent: "center",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.btnEncuensta}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Text style={{ fontSize: 10 }}>Encuestas</Text>
          </TouchableOpacity>
          <Modal animationType="fade" transparent visible={showModal}>
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(1,1,1,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: "80%",
                  width: "90%",
                  backgroundColor: "#263248",
                  alignItems: "center",
                }}
              >
                <FlatList
                  data={encuestas}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={{ marginVertical: 10, width: "100%" }}>
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Opiniones sobre {item.opinion}
                      </Text>
                      <View
                        style={{ flexDirection: "row", marginVertical: 20 }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 5,
                          }}
                        >
                          <Text>{item.btn1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            marginLeft: 10,
                            backgroundColor: "white",
                            borderRadius: 15,
                            padding: 5,
                          }}
                        >
                          <Text>{item.btn2}</Text>
                        </TouchableOpacity>
                      </View>
                      <Divider />
                    </View>
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              style={styles.btnModal}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color={"black"}
                size={30}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </Modal>
        </View>
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
    padding: 7,
    width: "30%",
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
  },
  btnModal: {
    display: "flex",
    position: "absolute",
    zIndex: 100,
    padding: 5,
    margin: 10,
    backgroundColor: "#eaeaea",
    borderRadius: 60,
  },
});
