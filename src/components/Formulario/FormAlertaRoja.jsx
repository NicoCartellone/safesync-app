import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import SelectList from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { useFirestore } from "../../hook/useFirestore.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { ToastAndroid } from "react-native";
import {
  sendPushNotification,
  setNotificationMessage,
} from "../../utils/notifications.js";

const FormAlertaRoja = () => {
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState("");
  const [newLocation, setNewLocation] = useState({});

  const { addAlerta, addAlertaRoja, getAllUsers, users } = useFirestore();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleToken = () => {
    let tokenData = users;
    let tokens = tokenData.map((item) => item.token);
    if (tokens !== undefined) {
      let token = tokens;
      return token;
    }
  };

  const data = [
    { value: "Robo" },
    { value: "Situacion de inseguridad" },
    { value: "Accidente de transito" },
    { value: "Violencia" },
    { value: "Incendio" },
  ];

  const handleSubmit = () => {
    addAlerta(selected, "roja");
    addAlertaRoja(newLocation.latitude, newLocation.longitude);
    sendNotification();
  };

  const sendNotification = async () => {
    const tokenUser = handleToken();
    await Promise.all(
      tokenUser.map(async (userToken) => {
        const messageNotification = setNotificationMessage(
          userToken,
          `Alerta Roja`,
          selected,
          { data: `Data de prueba` }
        );
        await sendPushNotification(messageNotification);
      })
    );
  };

  return (
    <View style={{ bottom: 20 }}>
      <SelectList
        data={data}
        setSelected={setSelected}
        boxStyles={{ backgroundColor: "#DF0E01", borderColor: "#DF0E01" }}
        inputStyles={{ color: "white" }}
        placeholder="Seleccioné la categoria"
        search={false}
        dropdownStyles={{ backgroundColor: "#DF0E01" }}
        arrowicon={
          <MaterialCommunityIcons
            name="menu-down"
            color={"#EDF2F4"}
            size={20}
          ></MaterialCommunityIcons>
        }
        dropdownTextStyles={{ color: "white" }}
      />
      <View style={styles.containerModalBtn}>
        <TouchableOpacity
          style={styles.btnOpenModal}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "black" }}>Seleccioné la ubicación</Text>
            <MaterialCommunityIcons
              name="map-marker"
              color={"black"}
              size={20}
            ></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
      </View>
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
            style={{ height: "75%", width: "90%", backgroundColor: "#fff" }}
          >
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: -34.59568986845935,
                longitude: -58.444114961826585,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                draggable
                isPreselected={true}
                coordinate={{
                  latitude: -34.59568986845935,
                  longitude: -58.444114961826585,
                }}
                onDragStart={(e) => {
                  setNewLocation(e.nativeEvent.coordinate);
                }}
                onDragEnd={(e) => {
                  setNewLocation(e.nativeEvent.coordinate);
                }}
              />
            </MapView>
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
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  ToastAndroid.show("Ubicacion guardada", ToastAndroid.LONG);
                }}
                style={styles.btnModalConfirmarUbicacion}
              >
                <Text style={{ color: "white" }}>Guardar ubicación</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ padding: 10, alignItems: "center" }}>
        {selected == "" ? (
          <>
            <TouchableOpacity style={styles.buttonForm} disabled={true}>
              <Text style={styles.btnText}>Crear</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.buttonForm} onPress={handleSubmit}>
              <Text style={styles.btnText}>Crear</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
export default FormAlertaRoja;

const styles = StyleSheet.create({
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
  containerModalBtn: {
    padding: 10,
  },
  btnOpenModal: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "white",
  },
  btnModal: {
    display: "flex",
    position: "absolute",
    zIndex: 100,
    padding: 5,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 60,
  },
  btnModalConfirmarUbicacion: {
    width: "50%",
    padding: 5,
    margin: 10,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
  },
});
