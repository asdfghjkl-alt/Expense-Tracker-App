import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  removeExpense: (id) => {},
  updateExpense: (updatedExpense) => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  function addExpense(expense) {
    setExpenses((currentExpenses) => [...currentExpenses, expense]);
  }

  function removeExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(({ id }) => id !== expenseId)
    );
  }

  function updateExpense(updatedExpense) {
    const updatableExpenseIndex = expenses.findIndex(
      (expense) => updatedExpense.id === expense.id
    );

    const updatedExpenses = [...expenses];

    updatedExpenses[updatableExpenseIndex] = updatedExpense;
    setExpenses(updatedExpenses);
  }

  const value = {
    expenses: expenses,
    addExpense: addExpense,
    removeExpense: removeExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
