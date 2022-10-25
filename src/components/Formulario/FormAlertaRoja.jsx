import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import SelectList from "react-native-dropdown-select-list";
import { useState } from "react";
import { useFirestore } from "../../hook/useFirestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { ToastAndroid } from "react-native";

const FormAlertaRoja = () => {
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState("");
  const [newLocation, setNewLocation] = useState({});

  const { addAlerta, addHeatmap } = useFirestore();

  const data = [
    { value: "robo" },
    { value: "situacion de inseguridad" },
    { value: "accidente de transito" },
    { value: "violencia" },
    { value: "incendio" },
  ];

  const handleSubmit = () => {
    addAlerta(selected, "roja");
    addHeatmap(newLocation.latitude, newLocation.longitude);
  };

  return (
    <View>
      <SelectList
        data={data}
        setSelected={setSelected}
        boxStyles={{ backgroundColor: "#DF0E01", borderColor: "#DF0E01" }}
        inputStyles={{ color: "white" }}
        placeholder="Seleccione la categoria"
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
            <Text style={{ color: "white" }}>Ubicacion de la alerta</Text>
            <MaterialCommunityIcons
              name="map-marker"
              color={"white"}
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
                onDragEnd={(e) => {
                  setNewLocation(e.nativeEvent.coordinate);
                  ToastAndroid.show("Ubicacion guardada", ToastAndroid.LONG);
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
    backgroundColor: "black",
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
});
