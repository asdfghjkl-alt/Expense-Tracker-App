import { Text, StyleSheet, Platform, View } from "react-native";

import { colors } from "../constants/colors";

export default function TotalDisplay({ totalCost, onPress }) {
  return (
    <View style={styles.cont} onPress={onPress}>
      <Text style={styles.title}>Total</Text>
      <Text style={styles.price}>${totalCost.toFixed(2)}</Text>
    </View>
  );
}
// this.duration = duration;
// this.complexity = complexity;
// this.affordability = affordability;
const styles = StyleSheet.create({
  cont: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primary50,

    elevation: 4,

    alignItems: "right",
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    overflow: Platform.OS === "android" ? "hidden" : "visible", // ripple effect doesn't go past corners on android
  },
  priceCont: {
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "right",

    backgroundColor: "white",
  },
  title: {
    color: colors.primary400,
    fontSize: 15,
  },
  price: {
    fontWeight: "bold",
    color: colors.primary500,
  },
});
