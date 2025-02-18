import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableHighlight, 
    Image,
  } from 'react-native';
  import { useEffect } from 'react';
  import { RFPercentage } from "react-native-responsive-fontsize";
  import Animated, {
     useAnimatedStyle, 
     withTiming,
     useSharedValue,
  } from 'react-native-reanimated';
  import { Ionicons } from "@expo/vector-icons";
  
  const { width, height } = Dimensions.get('window');
  const cardWidth = width*0.8;
  const cardHeight = height*0.75;
  const ThemeColors = require('../constants/colors.json');
  const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);
  
  const DiagnosisStart = ({setStartDiagnosis} : {setStartDiagnosis: (b: boolean)=>void }) => {
    const opacity = useSharedValue(0);
    const cardX = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
        return () => {
            opacity.value = withTiming(0, { duration: 300 });
        };
    }, []);
    
    const FadeInOutStyle = useAnimatedStyle(() => {
        return { 
            opacity: opacity.value
        };
    });

    const SlideStyle = useAnimatedStyle(() => {
        return {
          transform: [
            { translateX: cardX.value }
          ],
        };
    });

    const slideCard = () => {
        cardX.value = withTiming(-400, { duration: 300 });
    }
  
    return(
      <Animated.View style={[{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row"}, FadeInOutStyle]}>

        <Animated.View style={[styles.Container, SlideStyle]}>
            <View style={[styles.CardStack]}>
                <View style={[styles.CardContent]}>
                    <View style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>

                        <View style={styles.CardContentTop}>
                            <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                                Skin Cancer Self-diagnosis
                            </Text>
                        </View>

                        <View style={styles.CardContentMiddle1}>
                            <Image source={require('../../assets/images/content/smartphone_app_doctor_man.png')} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
                        </View>

                        <View style={styles.CardContentMiddle2}>
                            <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                                Including self-examination form and photo recognition, tailor-made for you!
                            </Text>
                        </View>

                        <View style={styles.CardContentBottom}>
                            <AnimatedTouchableHighlight onPress={()=>{slideCard(); setTimeout(()=>{setStartDiagnosis(true)}, 300)}} underlayColor={ThemeColors['touchable']} style={styles.NextButton}>
                                <>
                                    <Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular", color: ThemeColors['white'], marginLeft: 10}]}>
                                        START
                                    </Text>
                                    <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
                                </> 
                            </AnimatedTouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>

      </Animated.View>
    );
  }
  
  export default DiagnosisStart;
  
  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      width: width,
    },
    BottomCardContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute"
    },
    CardStack: {
      width: cardWidth,
      height: cardHeight,
      backgroundColor: "white",
      borderRadius: 20
    },
    CardContent: {
      flex: 1,
      width: cardWidth,
      height: cardHeight,
      borderRadius: 20,
      backgroundColor: ThemeColors['babyBlue'],
      alignItems: "center",
      borderWidth: 5,
      borderColor: "#ffffff",
      position: "absolute",
      top: 0,
    },
    CardContentTop: {
      flex: 2,
      width: cardWidth,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: width*0.1,
      paddingTop: height*0.02,
    },
    CardContentMiddle1: {
      flex: 3,
      width: cardWidth-width*0.1,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderColor: ThemeColors['white'],
      marginHorizontal: width*0.1,
      paddingBottom: height*0.02
    },
    CardContentMiddle2: {
      flex: 2,
      width: cardWidth,
      backgroundColor: "transparent",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 30
    },
    CardContentBottom: {
      flex: 1,
      width: cardWidth-width*0.1,
      backgroundColor: "transparent",
      marginHorizontal: width*0.1,
      borderTopWidth: 1,
      borderColor: ThemeColors['white']
    },
    NextButton: {
      position: "absolute", 
      bottom: 12, 
      right: 5, 
      padding: 10, 
      borderRadius: 50, 
      backgroundColor: ThemeColors['aquamarine'], 
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "row"
    }
  });