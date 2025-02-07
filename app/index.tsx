import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';
import { useFonts } from "expo-font";
import { Merriweather_300Light_Italic, Merriweather_400Regular, Merriweather_400Regular_Italic,  } from '@expo-google-fonts/merriweather';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { LibreBaskerville_400Regular } from '@expo-google-fonts/libre-baskerville';
import * as SplashScreen from 'expo-splash-screen'
import { useState } from 'react';

import IntroScreen from './tabs/intro';
import DiagnosisScreen from './tabs/diagnosis';
import HistoryScreen from './tabs/history';
import AboutScreen from './tabs/about';
import SettingScreen from './tabs/settings';
import CameraTestScreen from './tabs/camera-test';
import { useColorScheme } from "react-native";
import { useCallback, useEffect } from "react";
import { get, save } from "./tools/storage";

const Drawer = createDrawerNavigator();
const ThemeColors = require('./constants/colors.json');

function CustomDrawerContent(props: any) {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            marginHorizontal: 20,
            marginBottom: 10,
            color: "gray",
            borderBottomWidth:1,
            borderColor:"#ddd",
          }}
        >
        </Text>
        <DrawerItemList {...props} />
      </View>
      <View style={{padding: 20, borderTopWidth: 1, borderColor: "#ddd" }}>
        <Text style={{fontSize: 14, color: "gray" }}>
         copyright
        </Text>
      </View>
    </View>
  );
}

const screenOpts = {
  headerShadowVisible:false, 
  drawerItemStyle:{marginVertical:3, marginHorizontal:10}, 
  drawerLabelStyle:{fontSize:18, fontFamily:"MerriweatherRegular"},
  headerStyle:{
    backgroundColor:'white'
  }
};

export default function App() {

  useFonts({
    LibreRegular: LibreBaskerville_400Regular,
    MerriweatherRegular: Merriweather_400Regular,
    PlayfairRegular: PlayfairDisplay_400Regular
  });

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="Introduction" screenOptions={screenOpts}> 
      <Drawer.Screen name="Introduction" component={IntroScreen} options={{drawerIcon:()=><Ionicons name="information-circle-outline" size={22} color="green" />}} />
      <Drawer.Screen name="Start Diagnosis" component={DiagnosisScreen} options={{drawerIcon:()=><Ionicons name="pulse-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="My History" component={HistoryScreen} options={{drawerIcon:()=><Ionicons name="folder-open-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="About" component={AboutScreen} options={{drawerIcon:()=><Ionicons name="help-circle-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="Settings" component={SettingScreen} options={{drawerIcon:()=><Ionicons name="settings-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="Camera-test" component={CameraTestScreen}/>
    </Drawer.Navigator>
  );
}

