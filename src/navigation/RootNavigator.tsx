import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppStore } from "@store/useAppStore";
import LoginScreen from "@screens/LoginScreen";
import AppTabs from "./AppTabs";

export type RootStackParamList = {
  Login: undefined;
  AppTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const user = useAppStore((state) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name='AppTabs' component={AppTabs} />
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
