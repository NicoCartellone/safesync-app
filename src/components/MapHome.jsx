import MapView, { Heatmap, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useMemo } from "react";

const MapHome = ({ alertas }) => {
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
        {alertas && (
          <>
            {alertas.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={`Alerta ${marker.tipo}`}
                description={marker.categoria}
                image={
                  marker.tipo === "Roja"
                    ? require("../../assets/rojo.png")
                    : require("../../assets/naranja.png")
                }
              />
            ))}
          </>
        )}
      </MapView>
    );
  }, [alertas]);
};
export default MapHome;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
