import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Container from "../components/Container";
import FormRegister from "../components/Formulario/FormRegister";
import img from "../../assets/adaptive-icon.png";

const Register = ({ navigation }) => {
  return (
    <Container>
      <View style={styles.iconCoantainer}>
        <Image source={img} style={{ width: 150, height: 150 }} />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 40 }}>Registrate</Text>
        <FormRegister />
        <View style={styles.redirectContainer}>
          <Text style={{ color: "white" }}>ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color: "white",
                textDecorationLine: "underline",
                fontWeight: "bold",
              }}
            >
              Inicia Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
export default Register;

const styles = StyleSheet.create({
  iconCoantainer: {
    alignItems: "center",
  },

  redirectContainer: {
    padding: 10,
    alignItems: "center",
  },
});
