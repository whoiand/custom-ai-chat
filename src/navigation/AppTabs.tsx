import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "@screens/ChatScreen";
import ProfileScreen from "@screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

export type AppTabParamList = {
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const iconSize = 20;

const AppTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={iconSize}
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={iconSize}
              name={focused ? "person" : "person-outline"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
