import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  ImageBackground
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import IntroCard from '../conponents/AboutCard';

const { width, height } = Dimensions.get('window');
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');
const AllCardNum = info['about'].length

const AboutScreen = () => {

  const [scrollable, setScrollable] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const windowWidth = width*0.65+30

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}}>
      <ImageBackground source={require('../../assets/images/background/spot_background_pink.png')} resizeMode='cover' style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}} imageStyle={{opacity: 0.3}}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>

          <View style={{flex: 4, alignItems: "center", justifyContent: "center"}}>
            <ScrollView
            scrollEnabled={scrollable}
            style={styles.scrollView} 
            ref={scrollViewRef} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            pagingEnabled={true}
            snapToInterval={windowWidth}
            decelerationRate="fast"
            disableIntervalMomentum={true}
            >
              <View style={styles.container}>
                {Array.from({ length: AllCardNum }).map((_, idx) => (
                  <IntroCard setScrollable={setScrollable} key={idx} idx={idx}></IntroCard>
                ))}
              </View>
            </ScrollView>
          </View>
          
          <View style={{height: "100%", width: (width-windowWidth-30)/2, backgroundColor: "red", position: "absolute", right: 0, opacity: 0}} />
          <View style={{height: "100%", width: (width-windowWidth-30)/2, backgroundColor: "red", position: "absolute", left: 0, opacity: 0}} />

        </View>
      </ImageBackground>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: width,
    height: "100%",
  },
  container:{
    flex: 1,
    paddingHorizontal: width*0.175-15,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
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