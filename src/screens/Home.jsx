import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { useFirestore } from "../hook/useFirestore";
import MapHome from "../components/MapHome";
import { useEffect } from "react";

const Home = () => {
  const { getAllHeatmap, heatmap, loading, error } = useFirestore();

  useEffect(() => {
    getAllHeatmap();
  }, []);

  if (loading.getAllAlertas)
    return (
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
    );

  if (error)
    return (
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
    );
  return (
    <View style={styles.container}>
      <StatusBar />
      <MapHome points={heatmap} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
