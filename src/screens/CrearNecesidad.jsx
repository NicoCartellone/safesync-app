import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SelectList from "react-native-dropdown-select-list";
import { useState } from "react";
import { useFirestore } from "../hook/useFirestore";

const CrearNecesidad = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { addNecesidad } = useFirestore();

  const data = [{ value: "Problema" }, { value: "Conexion barrial" }];

  const handleSubmit = () => {
    addNecesidad(selected, descripcion);
    navigation.reset({
      index: 1,
      routes: [{ name: "Necesidades" }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Necesidades")}
        style={styles.btnVolver}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          color={"#EDF2F4"}
          size={40}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <Text style={styles.textTitle}>Crear Necesidad</Text>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}
      >
        <SelectList
          data={data}
          setSelected={setSelected}
          boxStyles={{ backgroundColor: "white" }}
          placeholder="Seleccione la categoria"
          search={false}
          dropdownStyles={{ backgroundColor: "white" }}
        />
        <TextInput
          style={{
            padding: 10,
            width: "75%",
            marginTop: 10,
            borderRadius: 15,
            backgroundColor: "#EDEDED",
          }}
          multiline={true}
          numberOfLines={4}
          placeholder="Ingrese la descripcion de su necesidad"
          placeholderTextColor="black"
          onChangeText={setDescripcion}
          value={descripcion}
        />
        <View style={{ padding: 10, alignItems: "center" }}>
          {selected == "" ? (
            <>
              <TouchableOpacity style={styles.buttonForm} disabled={true}>
                <Text style={styles.btnText}>Crear</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.buttonForm}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Crear</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default CrearNecesidad;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#263248",
  },
  textTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  btnVolver: {
    marginTop: Constants.statusBarHeight,
    display: "flex",
    position: "absolute",
    top: 10,
    left: 10,
  },
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
});
