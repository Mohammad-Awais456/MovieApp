// components/CustomSplash.js
import React, { useEffect } from "react";
import {
  View,
  Image,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // keep native splash visible

export default function CustomSplash({ onFinish }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Animate fade in of logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Simulate loading (or wait for async data)
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync(); // hide native splash
      onFinish(); // show main app
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <ActivityIndicator
        size="large"
        color="#00c4de"
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // same as native splash
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
