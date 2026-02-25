import { Tabs } from "expo-router";
import MyTabBar from "../../components/MyTabBar";
export default function TabLayout() {

return<>

 <Tabs screenOptions={{
   headerShown: false, 
   
  }} tabBar={props => <MyTabBar {...props} />} />
  </>

}