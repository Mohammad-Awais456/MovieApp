import { View, Image } from "react-native";
import logo from "../assets/images/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
const Container = ({ children, className, showLogo = true }) => {
  return (
    <SafeAreaView className="bg-secondary" style={{ flex: 1 }}>
      <View
        style={{ flex: 1 }}
        className={`  py-[45] px-4  ${className || ""}`}
      >
        {showLogo && (
          <Image
            source={logo}
            style={{
              width: 200,
              height: 70,
              alignSelf: "center",
              resizeMode: "contain",

              marginBottom: 20,
            }}
          />
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;
