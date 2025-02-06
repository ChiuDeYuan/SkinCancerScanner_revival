import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useContext } from 'react';
import DarkModeContext from '../settings/darkmode-context';

const IntroScreen = () => {
  const {isEnabled, toggleSwitch} = useContext(DarkModeContext);
  
  return (
    <View style={styles.container}>
      <Text>Intro Screen</Text>
      { isEnabled === 'dark' ? <Text>Dark mode is enabled</Text> : <Text>Dark mode is disabled</Text> }
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});