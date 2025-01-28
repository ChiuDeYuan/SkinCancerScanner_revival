import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from "react-native";
import IntroScreen from './tabs/intro';
import DiagnosisScreen from './tabs/diagnosis';
import HistoryScreen from './tabs/history';
import AboutScreen from './tabs/about';
import SettingScreen from './tabs/setting';
import Icon from '@react-native-vector-icons/simple-line-icons';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Introduction" component={IntroScreen} options={{drawerIcon:()=><Icon name='info' size={30} color={'#101010'}></Icon>}} />
      <Drawer.Screen name="Start Diagnosis" component={DiagnosisScreen} />
      <Drawer.Screen name="My History" component={HistoryScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
}