import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import SelectList from "react-native-dropdown-select-list";
import { useEffect, useState, useContext } from "react";
import { useFirestore } from "../../hook/useFirestore.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-root-toast";
import {
  sendPushNotification,
  setNotificationMessage,
} from "../../utils/notifications.js";
import { UserContext } from "../../context/UserProvider";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getCurrentLocation } from "../../utils/locations";
import * as Location from "expo-location";

const FormAlertaRoja = () => {
  const initialValues = {
    latitude: -34.59568986845935,
    longitude: -58.444114961826585,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState("");
  const [newLocation, setNewLocation] = useState(initialValues);
  const [saveNewLocation, setSaveNewLocation] = useState({});
  const [adressText, setAdressText] = useState("");

  const { userData } = useContext(UserContext);

  const { addAlerta, getAllUsers, users } = useFirestore();

  const nombre = userData.displayName;

  useEffect(() => {
    getAllUsers();
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewLocation(response.location);
      }
    })();
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
    addAlerta(
      selected,
      "Roja",
      saveNewLocation.latitude,
      saveNewLocation.longitude,
      nombre
    );
    sendNotification();
  };

  const handleLocationSubmit = async () => {
    setSaveNewLocation(newLocation);
    Toast.show("Alerta roja guardada");
  };

  const sendNotification = async () => {
    const tokenUser = handleToken();
    await Promise.all(
      tokenUser.map(async (userToken) => {
        const messageNotification = setNotificationMessage(
          userToken,
          `Alerta Roja`,
          `${selected} en ${adressText}`,
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
          <GooglePlacesAutocomplete
            placeholder="Escribe la ubicación"
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setAdressText(data.structured_formatting.main_text);
              // 'details' is provided when fetchDetails = true
              setNewLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            query={{
              key: "AIzaSyBawHzXYjCT-6GOmeX7hyIxVVB3FJxnts8",
              language: "es",
            }}
            styles={{
              container: {
                display: "flex",
                position: "absolute",
                zIndex: 100,
                width: "90%",
                top: 30,
              },
              listView: { backgroundColor: "white" },
            }}
          />
          <View
            style={{ height: "75%", width: "90%", backgroundColor: "#fff" }}
          >
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
                latitudeDelta: newLocation.latitudeDelta,
                longitudeDelta: newLocation.latitudeDelta,
              }}
              region={{
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
                latitudeDelta: newLocation.latitudeDelta,
                longitudeDelta: newLocation.latitudeDelta,
              }}
            >
              <Marker
                draggable
                coordinate={{
                  latitude: newLocation.latitude,
                  longitude: newLocation.longitude,
                }}
                onDragEnd={async (e) => {
                  setNewLocation({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  });
                  const res = await Location.reverseGeocodeAsync({
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                  const address = `${res[0].street} ${res[0].streetNumber}`;
                  setAdressText(address);
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
                onPress={handleLocationSubmit}
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
