import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FormLogin from "../components/Formulario/FormLogin";
import Container from "../components/Container";
import { StatusBar } from "expo-status-bar";
import img from "../../assets/adaptive-icon.png";

const Login = ({ navigation }) => {
  return (
    <Container>
      <StatusBar style="light" />
      <View style={styles.iconCoantainer}>
        <Image source={img} style={{ width: 150, height: 150 }} />
      </View>
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 40 }}>Iniciar Sesión</Text>
        <FormLogin />
        <View style={styles.redirectContainer}>
          <Text style={{ color: "white" }}>No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "white",
                textDecorationLine: "underline",
                fontWeight: "bold",
              }}
            >
              Registrate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  redirectContainer: {
    padding: 10,
    alignItems: "center",
  },

  iconCoantainer: {
    alignItems: "center",
  },
});
