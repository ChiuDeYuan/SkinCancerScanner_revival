import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Image, Dimensions, StatusBar } from 'react-native';
import { useFonts } from "expo-font";
import { Merriweather_400Regular, Merriweather_700Bold, Merriweather_700Bold_Italic} from '@expo-google-fonts/merriweather';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { LibreBaskerville_400Regular } from '@expo-google-fonts/libre-baskerville';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen'
import { useState } from 'react';

import IntroScreen from './tabs/intro';
import DiagnosisScreen from './tabs/diagnosis';
import HistoryScreen from './tabs/history';
import AboutScreen from './tabs/about';
import SettingScreen from './tabs/settings';
import { useColorScheme } from "react-native";
import { useCallback, useEffect } from "react";
import { get, save } from "./tools/storage";

const {width, height} = Dimensions.get('window') 
const Drawer = createDrawerNavigator();
const ThemeColors = require('./constants/colors.json');
const brandImg = require('../assets/images/SkinCancerScanner.jpg');

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
            borderBottomWidth: 1,
            borderColor: ThemeColors['border'],
          }}
        >
        </Text>
        <DrawerItemList {...props} />
      </View>
      <View style={{flex:1}}>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            marginHorizontal: 20,
            marginBottom: 10,
            color: "gray",
            borderBottomWidth: 1,
            borderColor: ThemeColors['border'],
          }}
        >
        </Text>
        <View style={{flex:1, paddingHorizontal:30}}>
          <Image source={brandImg} style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain',
            opacity:0.72,
          }}/>
        </View>
      </View>
    </View>
  );
}

const screenOpts = {
  headerShadowVisible:false, 
  headerStatusBarHeight:0,
  drawerItemStyle:{
    marginVertical:3, 
    marginHorizontal:10
  }, 
  drawerLabelStyle:{
    fontSize:18, 
    fontFamily:"MerriweatherRegular"
  },
  headerStyle:{
    backgroundColor: ThemeColors['white'],
    borderColor: ThemeColors['border'],
    borderBottomWidth: 1
  },
  headerTitleStyle:{
    fontFamily: "MerriweatherRegular",
    color: ThemeColors['black']
  }
};

export default function App() {

  useFonts({
    LibreRegular: LibreBaskerville_400Regular,
    MerriweatherRegular: Merriweather_400Regular,
    MerriweatherBoldItalic: Merriweather_700Bold_Italic,
    MerriweatherBold: Merriweather_700Bold,
    PlayfairRegular: PlayfairDisplay_400Regular,
    RobotoRegular: Roboto_400Regular,
    RobotoMedium: Roboto_500Medium,
    RobotoBold: Roboto_700Bold
  });

  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor="black"
      />
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="Introduction" screenOptions={screenOpts}> 
      <Drawer.Screen name="Introduction" component={IntroScreen} options={{drawerIcon:()=><Ionicons name="information-circle-outline" size={22} color="green" />}} />
      <Drawer.Screen name="Start Diagnosis" component={DiagnosisScreen} options={{drawerIcon:()=><Ionicons name="pulse-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="My History" component={HistoryScreen} options={{drawerIcon:()=><Ionicons name="folder-open-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="About" component={AboutScreen} options={{drawerIcon:()=><Ionicons name="help-circle-outline" size={22} color="green" />}}/>
      <Drawer.Screen name="Settings" component={SettingScreen} options={{drawerIcon:()=><Ionicons name="settings-outline" size={22} color="green" />}}/>
    </Drawer.Navigator>
    </>  
  );
}

