import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function MyTabBar({ state, descriptors, navigation }) {
  const tabs = [{ name: "index" }, { name: "search" }, { name: "saved" }];
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        bottom: insets.bottom + 5,
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        height: 45,
        marginBottom: 0,
        borderRadius: 100,
        backgroundColor: "black",
      }}
    >
      {tabs.map((route, index) => {
        const isFocused = state.routes[state.index].name === route.name;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <Pressable
            key={route.name + index}
            onPress={onPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            className={`flex-row rounded-full  gap-1   ${isFocused ? "bg-accent" : ""}`}
          >
            <Ionicons
              name={
                route.name === "index"
                  ? "home"
                  : route.name === "profile"
                    ? "grid-outline"
                    : route.name === "saved"
                      ? "bookmark-outline"
                      : route.name === "search"
                        ? "search-outline"
                        : ""
              }
              size={18}
              color={isFocused ? "black" : "white"}
            />
            {isFocused && (
              <Text
                numberOfLines={1}
                style={{ fontSize: 15 }}
                className={`
              capitalize
              
              ${isFocused ? "color-text" : "color-primary"}`}
              >
                {index === 0 ? "Home" : route.name}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
