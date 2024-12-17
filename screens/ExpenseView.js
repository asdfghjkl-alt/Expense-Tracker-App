import { StyleSheet, View } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";

import { ExpensesContext } from "../store/expenses-context";

import ExpenseList from "../components/ExpenseList/ExpenseList";
import TotalDisplay from "../components/TotalDisplay";

export default function ExpenseView({ route, navigation }) {
  const { type } = route.params;

  const [total, setTotal] = useState(0);

  const expenseCtx = useContext(ExpensesContext);

  var displayedExpenses;

  if (type === "recent") {
    displayedExpenses = expenseCtx.expenses.filter((item) => {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      const itemDate = new Date(item.date);
      return itemDate >= sevenDaysAgo && itemDate <= today;
    });
  } else {
    displayedExpenses = expenseCtx.expenses;
  }

  useLayoutEffect(() => {
    var tempExpenses;
    if (type === "recent") {
      tempExpenses = expenseCtx.expenses.filter((item) => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const itemDate = new Date(item.date);
        return itemDate >= sevenDaysAgo && itemDate <= today;
      });
    } else {
      tempExpenses = expenseCtx.expenses;
    }
    var tempTotal = 0;
    for (let i = 0; i < tempExpenses.length; i++) {
      tempTotal += tempExpenses[i].price;
    }
    setTotal(tempTotal);
  }, [total, expenseCtx]);

  return (
    <View style={styles.cont}>
      <TotalDisplay totalCost={total} />
      <ExpenseList displayedExpenses={displayedExpenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 25,
    backgroundColor: "#1a0763",
  },
  text: {
    color: "white",
  },
});
