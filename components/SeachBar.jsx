import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

const SeachBar = ({ handleSearch, defaultValue = "" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const searchInputRef = useRef(null);

  useEffect(() => {
    console.log("this is the default value: ", defaultValue);
    setSearchQuery(defaultValue);
    // if (!defaultValue) {
    //   setIsFocused(false);
    // } else {
    //   setIsFocused(true);
    // }
  }, [defaultValue]);

  return (
    <View className="w-full justify-center">
      {/* ICON */}
      {!isFocused && !searchQuery && (
        <Pressable
          onPress={() => searchInputRef.current.focus()}
          style={{
            flexDirection: "row",
            gap: 5,
            width: "100%",
            position: "absolute",
            left: 5,
            zIndex: 1,
          }}
        >
          <Ionicons name="search-outline" size={20} color="white" />
          <Text className="text-primary">Enter the movie name</Text>
        </Pressable>
      )}
      {/* INPUT */}
      <TextInput
        onSubmitEditing={() => handleSearch(searchQuery)} // press enter
        returnKeyType="search"
        ref={searchInputRef}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        onFocus={() => setIsFocused(true)}
        onPress={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border-b border-primary text-[16px] text-primary "
      />
    </View>
  );
};

export default SeachBar;
