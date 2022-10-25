import { StyleSheet, Text, View } from "react-native";
const Divider = (props) => {
  return (
    <View
      style={[
        styles.divider,
        { borderColor: props.color ? props.color : "#156894" },
      ]}
    />
  );
};
export default Divider;
const styles = StyleSheet.create({
  divider: {
    flex: 1,
    width: "100%",
    borderTopWidth: 1,
  },
});
