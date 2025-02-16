import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableHighlight,
    TouchableOpacity
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
        <View style={{flex: 1}}>
            <View style={{flex: 2}}>
                <TouchableOpacity style={{height: 40, width: 40, borderRadius: 20, backgroundColor: ThemeColors['border'], alignItems: "center", justifyContent: "center", flexDirection: "row", position: "absolute", right: 10, top: 10}}>
                    <Ionicons name="person-circle-outline" size={35} color={ThemeColors['aquamarine']}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
                <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card3'}></IntroCard>
                <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card1'}></IntroCard>
                <IntroCard toggleScroll={toggleScroll} scrollToPosition={scrollToPosition} idx={'card4'}></IntroCard>
                <Ionicons name="caret-forward-outline" size={100} color={ThemeColors['black']} style={{marginHorizontal: 5, position: "absolute", right: -25, opacity: 0.3}} />
                <Ionicons name="caret-back-outline" size={100} color={ThemeColors['black']} style={{marginHorizontal: 5, position: "absolute", left: -25, opacity: 0.3}} />
            </View>
            <View style={{flex: 2, alignItems: "flex-start", justifyContent: "center", flexDirection: "row"}}>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: ThemeColors['babyBlue'], marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
                <View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, borderWidth: 3, borderColor: ThemeColors['aquamarine']}}>

                </View>
            </View>
        </View>
    );
  };
  
  export default IntroScreen;
  
  const styles = StyleSheet.create({
    mainView: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "row",
      width: width,
      backgroundColor: ThemeColors['white'],
    },
    scrollView: {
      flex: 2,
      width: width,
      backgroundColor: 'transparent',
    },
    container:{
      marginHorizontal: 20,
      marginVertical: 0,
      backgroundColor: 'transparent',
      alignItems: "center",
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