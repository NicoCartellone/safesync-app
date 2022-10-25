import MapView, { Heatmap } from "react-native-maps";
import { StyleSheet } from "react-native";

const MapHome = ({ points }) => {
  const puntosMapa = points;

  const puntos = [
    {
      latitude: -34.59568986845935,
      longitude: -58.444114961826585,
      weight: 19,
    },
    {
      latitude: -34.612671442474316,
      longitude: -58.453781716525555,
      weight: 19,
    },
  ];

  const alertaRoja = {
    colors: ["red"],
    startPoints: [0.07],
  };

  const alertaNaranja = {
    colors: ["orange"],
    startPoints: [0.07],
  };
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -34.59568986845935,
        longitude: -58.444114961826585,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      }}
    >
      <Heatmap points={puntosMapa} radius={20} gradient={alertaNaranja} />
      <Heatmap points={puntos} radius={20} gradient={alertaRoja} />
    </MapView>
  );
};
export default MapHome;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
