import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import CustomSplash from "../components/CustomSplash";
import { useState } from "react";

export default function RootLayout() {
  const toastConfig = {
    success: ({ text1 }) => (
      <View
        style={{
          height: 40,
          width: "90%",
          backgroundColor: "#000", // black background
          borderWidth: 0.5,
          borderLeftWidth: 6,
          borderColor: "#00c4de", // your border color
          paddingHorizontal: 15,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "#00c4de", // text color
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {text1}
        </Text>
      </View>
    ),
  };

  const [appReady, setAppReady] = useState(false);

  if (!appReady) {
    // Show custom splash until app is ready
    return <CustomSplash onFinish={() => setAppReady(true)} />;
  }
  return (
    <>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </>
  );
}
