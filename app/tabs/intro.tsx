import { View, Text, StyleSheet, ScrollView, Dimensions, BoxShadowValue } from 'react-native';
import { useContext } from 'react';
import DarkModeContext from '../settings/darkmode-context';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Card from '../conponents/card';

const { width, height } = Dimensions.get('window');
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');

const IntroScreen = () => {
  const {isEnabled, toggleSwitch} = useContext(DarkModeContext);
  
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Card title="卡片 1" content="這是卡片 1 的完整內容。" />
          <Card title="卡片 2" content="這是卡片 2 的完整內容。" />
          <Card title="卡片 3" content="這是卡片 3 的完整內容。" />
        </View>
        <View style={styles.container}>
          <Text>Copy Right</Text>
          <Text>Copy Right</Text>
          <Text>Copy Right</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: ThemeColors['white'],
  },
  scrollView: {
    flex: 1,
    width: width,
  },
  container:{
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: ThemeColors['white'],
    alignItems: "center",
  },
  mainText: {
    fontSize: RFPercentage(2.5),
  },
  h1Title: {

  },
  h2Title: {

  },
});