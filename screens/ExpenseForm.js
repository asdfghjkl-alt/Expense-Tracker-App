import { Text, Pressable, StyleSheet, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { ExpensesContext } from "../store/expenses-context";
import { colors } from "../constants/colors";

import Input from "../components/Input";
import { storeExpenses, updateExpense } from "../util/http";

export default function ExpenseForm({ route }) {
  const navigation = useNavigation();
  const expenseCtx = useContext(ExpensesContext);

  const defaultValues = route.params;

  useEffect(() => {
    if (defaultValues) {
      navigation.setOptions({
        title: "Edit Expense",
      });
    }
  }, []);

  const [expense, setExpense] = useState({
    price: {
      value: defaultValues ? defaultValues.price.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : "",
      isValid: true,
    },
    desc: {
      value: defaultValues ? defaultValues.desc.toString() : "",
      isValid: true,
    },
  });

  function inputHandler(inputIdentifier, enteredText) {
    setExpense((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredText, isValid: true },
      };
    });
  }

  async function addExpense() {
    const expenseData = {
      price: parseFloat(parseFloat(expense.price.value).toFixed(2)),
      date: new Date(expense.date.value),
      desc: expense.desc.value,
    };

    const priceIsValid = !isNaN(expenseData.price) && expenseData.price > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.desc.trim().length > 0;

    if (!priceIsValid || !dateIsValid || !descriptionIsValid) {
      setExpense((curInputs) => {
        return {
          price: { value: curInputs.price.value, isValid: priceIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          desc: {
            value: curInputs.desc.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    if (defaultValues) {
      expenseCtx.updateExpense({ ...expenseData, id: defaultValues.id });
      await updateExpense(defaultValues.id, expenseData);
    } else {
      const id = await storeExpenses(expenseData);
      expenseCtx.addExpense({ ...expenseData, id: id });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.cont}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.upperCont}>
        <Input
          style={styles.smallTextInput}
          invalid={!expense.price.isValid}
          label="Price: "
          textInputConfig={{
            keyboardType: "decimal-pad",
            inputMode: "decimal",
            value: expense.price.value,
            onChangeText: inputHandler.bind(this, "price"),
            placeholder: "18.83",
          }}
        />
        <Input
          style={styles.smallTextInput}
          invalid={!expense.date.isValid}
          label="Date: "
          textInputConfig={{
            keyboardType: "phone-pad",
            inputMode: "text",
            value: expense.date.value,
            onChangeText: inputHandler.bind(this, "date"),
            placeholder: "YYYY-MM-DD",
            invalid: !expense.date.isValid,
            maxLength: 10,
          }}
        />
      </View>
      <Input
        style={styles.textInput}
        textInputConfig={{
          keyboardType: "default",
          inputMode: "text",
          value: expense.desc.value,
          multiline: true,
          onChangeText: inputHandler.bind(this, "desc"),
          placeholder: "Insert Description here",
        }}
        label="Description: "
        invalid={!expense.desc.isValid}
      />
      <Pressable
        onPress={addExpense}
        style={({ pressed }) => [styles.btn, pressed ? styles.pressed : null]}
      >
        <View style={styles.btn}>
          <Text style={styles.btnText}>Enter</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingTop: "30%",
    alignItems: "center",
    backgroundColor: colors.primary800,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
  btn: {
    backgroundColor: colors.primary500,
    padding: 10,
    borderRadius: 10,
    width: "auto",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  smallTextInput: {
    fontSize: 16,
    padding: 10,
    width: 150,
  },
  textInput: {
    height: 100,
    fontSize: 16,
    borderRadius: 5,
    width: 290,
    marginBottom: 30,
  },
  subText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  upperCont: {
    flexDirection: "row",
    margin: 10,
  },
  inputCont: {
    margin: 10,
  },
});
