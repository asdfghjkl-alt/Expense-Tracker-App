import { Text, StyleSheet, View } from "react-native";

import { getFormattedDate } from "../../util/date";
import { colors } from "../../constants/colors";

import IconButton from "../IconButton";

export default function ExpenseItem({ desc, date, price, onDelete, onEdit }) {
  return (
    <View style={styles.cont}>
      <View style={styles.textCont}>
        <Text style={styles.title}>{desc}</Text>
        <Text style={styles.date}>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.rightCont}>
        <View style={styles.btnCont}>
          <IconButton icon={"create-outline"} color="white" onPress={onEdit} />
          <IconButton icon={"trash"} color="white" onPress={onDelete} />
        </View>
        <View style={styles.priceCont}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "right",
    flex: 1,

    elevation: 4,

    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: colors.primary500,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
  },
  rightCont: {
    marginLeft: 10,
    maxWidth: "30%",
  },
  btnCont: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  priceCont: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",

    backgroundColor: "white",
    alignItems: "center",
  },
  textCont: {
    flex: 5,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
  },
  date: {
    color: "#edebf2",
  },
  price: {
    fontWeight: "bold",
    color: colors.primary500,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
