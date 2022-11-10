import MapView, { Heatmap } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useMemo } from "react";

const MapHome = ({ alertasRojas, alertasNaranjas }) => {
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
  return useMemo(() => {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.59568986845935,
          longitude: -58.444114961826585,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        provider="google"
      >
        {alertasNaranjas ? (
          <Heatmap
            points={alertasNaranjas}
            radius={20}
            gradient={alertaNaranja}
          />
        ) : (
          <Heatmap points={puntos} radius={20} gradient={alertaNaranja} />
        )}
        {alertasRojas ? (
          <Heatmap points={alertasRojas} radius={20} gradient={alertaRoja} />
        ) : (
          <Heatmap points={puntos} radius={20} gradient={alertaNaranja} />
        )}
      </MapView>
    );
  }, [alertasRojas, alertasNaranjas, alertaRoja, alertaNaranja]);
};
export default MapHome;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
