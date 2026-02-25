import { View,Image, Pressable, Keyboard } from 'react-native'
import logo from "../assets/images/logo.png";
const Container = ({children, className}) => {
  return (
     <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>

    <View style={{paddingTop: 40}} className={`flex-1 bg-secondary py-2 px-2  ${className || ''}`}>
    <Image
  source={logo}
  style={{
    width: 200,
    height:70,
    alignSelf: "center",
    resizeMode: "contain",
    
    marginBottom: 20,
  }}
/>
      {children}
    </View>
    </Pressable>
  )
}

export default Container