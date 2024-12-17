import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  setRetrievedExpenses: (expenses) => {},
  removeExpense: (id) => {},
  updateExpense: (updatedExpense) => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  function addExpense(expense) {
    setExpenses((currentExpenses) => [expense, ...currentExpenses]);
  }

  function removeExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(({ id }) => id !== expenseId)
    );
  }

  function setRetrievedExpenses(retrievedExpenses) {
    setExpenses(retrievedExpenses.reverse());
  }

  function updateExpense(updatedExpense, id) {
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
    setRetrievedExpenses: setRetrievedExpenses,
    removeExpense: removeExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
