import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, StatusBar, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

import { colors } from "./constants/colors";

import ExpensesContextProvider from "./store/expenses-context";

import ExpenseView from "./screens/ExpenseView";
import ExpenseForm from "./screens/ExpenseForm";
import IconButton from "./components/IconButton";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenHeight = Dimensions.get("window").height;

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
          height: screenHeight * 0.12,
        },
        headerTintColor: "white",
        tabBarActiveTintColor: "#ffc32b",
        tabBarStyle: { backgroundColor: colors.primary500 },
        headerRight: () => {
          return (
            <IconButton
              onPress={() => {
                navigation.navigate("Add Expense");
              }}
              icon={"add-outline"}
              color="white"
            />
          );
        },
      }}
    >
      <BottomTab.Screen
        name="Recent Expenses (Last 7 Days)"
        component={ExpenseView}
        options={{
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" color={color} size={size} />
          ),
        }}
        initialParams={{ type: "recent" }}
      />
      <BottomTab.Screen
        name="All Expenses"
        component={ExpenseView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
        initialParams={{ type: "all" }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary500,
                height: screenHeight * 0.12,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="Expense View"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add Expense"
              component={ExpenseForm}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
