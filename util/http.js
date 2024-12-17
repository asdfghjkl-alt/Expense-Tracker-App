import axios from "axios";

const BACKEND_URL = "https://first-app-db-d9034-default-rtdb.firebaseio.com";

export async function storeExpenses(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );

  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      price: response.data[key].price,
      date: response.data[key].date,
      desc: response.data[key].desc,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json/`, expenseData);
}

export function removeExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json/`);
}
