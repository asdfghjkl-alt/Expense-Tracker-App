import { StyleSheet, View, FlatList } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { ExpensesContext } from "../../store/expenses-context";
import { getFormattedDate } from "../../util/date";

import { removeExpense } from "../../util/http";

import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ displayedExpenses }) {
  const expenseCtx = useContext(ExpensesContext);

  const navigation = useNavigation();

  function renderExpense(itemData) {
    function deleteExpense() {
      expenseCtx.removeExpense(itemData.item.id);
      removeExpense(itemData.item.id);
    }

    function editExpense() {
      navigation.navigate("Add Expense", {
        ...itemData.item,
        date: getFormattedDate(itemData.item.date),
      });
    }

    return (
      <ExpenseItem
        desc={itemData.item.desc}
        date={itemData.item.date}
        price={itemData.item.price}
        onDelete={deleteExpense}
        onEdit={editExpense}
      />
    );
  }

  return (
    <View style={styles.cont}>
      <FlatList
        data={displayedExpenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpense}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
});
