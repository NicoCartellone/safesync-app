import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

import Register from "../screens/Register";
import Login from "../screens/Login";
import MainTab from "./MainTab";
import CrearAlerta from "../screens/CrearAlerta";
import CrearNecesidad from "../screens/CrearNecesidad";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={MainTab} />
            <Stack.Screen name="CrearAlerta" component={CrearAlerta} />
            <Stack.Screen name="CrearNecesidad" component={CrearNecesidad} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
