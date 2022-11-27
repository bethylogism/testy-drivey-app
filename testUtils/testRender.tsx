import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const testRender = (uiComponent: React.ReactElement) => {
  const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  };
  return render(uiComponent, { wrapper: AllTheProviders });
};
