import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SelectList from "react-native-dropdown-select-list";
import { useState } from "react";
import { useFirestore } from "../../hook/useFirestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FormAlertaNaranja = ({ navigation }) => {
  const [selected, setSelected] = useState("");

  const { addAlerta } = useFirestore();

  const data = [{ value: "auto sospechoso" }, { value: "persona sospechosa" }];

  const handleSubmit = () => {
    addAlerta(selected, "naranaja");
  };

  return (
    <View>
      <SelectList
        data={data}
        setSelected={setSelected}
        boxStyles={{ backgroundColor: "#DCAE56", borderColor: "#DCAE56" }}
        inputStyles={{ color: "black" }}
        placeholder="Seleccione la categoria"
        search={false}
        dropdownStyles={{ backgroundColor: "#DCAE56" }}
        arrowicon={
          <MaterialCommunityIcons
            name="menu-down"
            color={"black"}
            size={20}
          ></MaterialCommunityIcons>
        }
        dropdownTextStyles={{ color: "black" }}
      />
      <View style={styles.containerModalBtn}>
        <TouchableOpacity style={styles.btnOpenModal}>
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
export default FormAlertaNaranja;
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
  btnOpenModal: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "black",
  },
  containerModalBtn: {
    padding: 10,
  },
});
