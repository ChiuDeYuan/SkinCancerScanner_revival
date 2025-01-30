import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import IntroScreen from './tabs/intro';
import DiagnosisScreen from './tabs/diagnosis';
import HistoryScreen from './tabs/history';
import AboutScreen from './tabs/about';
import SettingScreen from './tabs/settings';
import { useColorScheme } from "react-native";
import { useCallback, useEffect } from "react";
import { get, save } from "./tools/storage";


const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <Drawer.Navigator initialRouteName="Introduction" screenOptions={{drawerItemStyle:{marginVertical:3}, drawerLabelStyle:{fontSize:18}}}> 
      <Drawer.Screen name="Introduction" component={IntroScreen} options={{drawerIcon:()=><Ionicons name="information-circle-outline" size={22} color="green" />}} />
      <Drawer.Screen name="Start Diagnosis" component={DiagnosisScreen} options={{drawerIcon:()=><Ionicons name="pulse-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="My History" component={HistoryScreen} options={{drawerIcon:()=><Ionicons name="folder-open-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="About" component={AboutScreen} options={{drawerIcon:()=><Ionicons name="help-circle-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="Settings" component={SettingScreen} options={{drawerIcon:()=><Ionicons name="settings-outline" size={22} color="green" />}}/>
    </Drawer.Navigator>
  );
}