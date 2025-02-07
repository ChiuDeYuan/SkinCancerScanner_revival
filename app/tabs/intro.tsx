import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Button, 
  TouchableHighlight, 
  TouchableOpacity 
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Animated, {
   useAnimatedStyle, 
   withTiming,
   Easing
} from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";

import Card from '../conponents/card';

const { width, height } = Dimensions.get('window');
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');

const IntroScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollable, setScrollable] = useState(true);

  const scrollToPosition = (y:number) => {
    scrollViewRef.current?.scrollTo({ y, animated: true });
  };

  const toggleScroll = (t:boolean) => {
    setScrollable(t);
  };

  return (
    <View style={styles.mainView}>
      <ScrollView scrollEnabled={scrollable} style={styles.scrollView} ref={scrollViewRef} fadingEdgeLength={scrollable ? 10 : 0}>
        <View style={styles.container}>
          <View style={{height:20}}></View>
          <Card toggleScroll={toggleScroll} scrollToPosition={scrollToPosition}></Card>
          <Card toggleScroll={toggleScroll} scrollToPosition={scrollToPosition}></Card>
          <Card toggleScroll={toggleScroll} scrollToPosition={scrollToPosition}></Card>
          <Button title='to top' onPress={()=>scrollToPosition(0)}/>
        </View>
        <View style={styles.bottomView}>
          <Text style = {styles.mainText}>Copy Right</Text>
          <Text style = {styles.mainText}>Copy Right</Text>
          <Text style = {styles.mainText}>Copy Right</Text>
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
    backgroundColor: ThemeColors['white']
  },
  container:{
    marginHorizontal: 20,
    marginVertical: 0,
    backgroundColor: ThemeColors['white'],
    alignItems: "center",
  },
  bottomView:{
    marginHorizontal: 20,
    marginVertical: 0,
    backgroundColor: 'red',
    alignItems: "center",
    position: "static"
  },
  mainText: {
    fontSize: RFPercentage(2.5),
    position: "static"
  },
  h1Title: {

  },
  h2Title: {

  }
});