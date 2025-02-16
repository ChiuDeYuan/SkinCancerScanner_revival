import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableHighlight
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import IntroCard from '../conponents/IntroCard';

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
      <View style={{flex: 1, marginVertical: 30, position: "absolute", top: 0}}>
        <Text style={{color: ThemeColors['border'], fontFamily: "MerriweatherBoldItalic", fontSize: 40, marginBottom: 100}}>
          Touch To Expand
        </Text>
        <Text style={{color: ThemeColors['border'], fontFamily: "MerriweatherBoldItalic", fontSize: 40, marginBottom: 100}}>
          Touch To Expand
        </Text>
        <Text style={{color: ThemeColors['border'], fontFamily: "MerriweatherBoldItalic", fontSize: 40, marginBottom: 100}}>
          Touch To Expand
        </Text>
        <Text style={{color: ThemeColors['border'], fontFamily: "MerriweatherBoldItalic", fontSize: 40, marginBottom: 100}}>
          Touch To Expand
        </Text>
        <Text style={{color: ThemeColors['border'], fontFamily: "MerriweatherBoldItalic", fontSize: 40, marginBottom: 100}}>
          Touch To Expand
        </Text>
      </View>
      <ScrollView scrollEnabled={scrollable} style={styles.scrollView} ref={scrollViewRef} fadingEdgeLength={scrollable ? 10 : 0} horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
        <View style={styles.container}>
          <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card1'}></IntroCard>
          <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card2'}></IntroCard>
          <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card3'}></IntroCard>
          <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card4'}></IntroCard>
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
    backgroundColor: 'transparent'
  },
  container:{
    marginHorizontal: 20,
    marginVertical: 0,
    backgroundColor: 'transparent',
    alignItems: "center",
    flexDirection: "row"
  },
  bottomView:{
    marginHorizontal: 40,
    marginVertical: 40,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: ThemeColors['border']
  },
  bottomText: {
    fontSize: RFPercentage(2.5),
  },
  toTop: {
    backgroundColor: ThemeColors['babyBlue'],
    borderRadius: 30,
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 10,
    marginTop: 30
  }
});