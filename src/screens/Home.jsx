import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { useFirestore } from "../hook/useFirestore";
import MapHome from "../components/MapHome";
import { useEffect, useMemo } from "react";

const Home = () => {
  const {
    getAllAlertasNaranjas,
    getAllAlertasRojas,
    alertasNaranjas,
    alertasRojas,
    loading,
    error,
  } = useFirestore();

  useEffect(() => {
    getAllAlertasRojas();
    getAllAlertasNaranjas();
  }, []);

  const isLoading = loading.getAllAlertasRojas && loading.getAllAlertasNaranjas;

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
        <Text style={{ color: "white" }}>Cargando mapa...</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <StatusBar />
        <MapHome
          alertasRojas={alertasRojas}
          alertasNaranjas={alertasNaranjas}
        />
      </View>
    );
  }, [
    getAllAlertasNaranjas,
    getAllAlertasRojas,
    alertasNaranjas,
    alertasRojas,
    loading,
    error,
  ]);
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
