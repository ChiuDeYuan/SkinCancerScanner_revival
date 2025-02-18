import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableHighlight, 
    Image,
    ScrollView
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
  const ThemeColors = require('../constants/colors.json');
  const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);
  
  const DiagnosisEnd = ({resetALL} : {resetALL: ()=>void }) => {
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

    const fadeout = () => {
        opacity.value = withTiming(0, { duration: 300 });
    }
  
    return(
        <Animated.View pointerEvents={'box-none'} style={[{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: ThemeColors['babyBlue']}, FadeInOutStyle]}>

                    <View style={styles.CardContentTop}>
                        <Text style={{fontSize: RFPercentage(3), fontFamily: "MerriweatherRegular", color: ThemeColors['navyBlue']}}>
                            Nearby clinics:
                        </Text>
                    </View>

                    <View style={styles.CardContentMiddle1}>
                        <Image source={require('../../assets/images/content/google_map_example.png')} style={{height: "100%", width: width-40}}></Image>
                    </View>

                    <View pointerEvents={'box-none'} style={styles.CardContentMiddle2}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{flexGrow: 1}}>
                                <Text style={{textAlign: "center", fontSize: RFPercentage(3), fontFamily: "MerriweatherRegular", color: "#b20000", marginBottom: 10}}>
                                    DISCLAIMER:
                                </Text>
                                <Text style={{textAlign: "justify", fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight: 24}}>
                                    The results of these tests has not yet been approved by the conventional chains of medication and may be heavily biased. The indexes are purely a suggestion on whether you should pay a visit to your local clinic. It is recommended that you take these numbers with a grain of salt and follow the advices of your dermatologist when there's any contradiction. The development team of this application does not bear any responsibilities if the app or results are used improperly.
                                </Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.CardContentBottom}>
                        <AnimatedTouchableHighlight onPress={()=>{fadeout(); setTimeout(()=>{resetALL()}, 300)}} underlayColor={ThemeColors['touchable']} style={styles.NextButton}>
                            <>
                                <Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular", color: ThemeColors['white'], marginLeft: 10}]}>
                                    FINISH
                                </Text>
                                <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
                            </> 
                        </AnimatedTouchableHighlight>
                    </View>

        </Animated.View>
    );
  }
  
  export default DiagnosisEnd;
  
  const styles = StyleSheet.create({
    CardContentTop: {
      flex: 1.2,
      width: width,
      alignItems: "center",
      justifyContent: "flex-end",
      paddingBottom: 20
    },
    CardContentMiddle1: {
      flex: 4,
      width: width-width*0.1,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderColor: ThemeColors['white'],
      paddingBottom: height*0.02
    },
    CardContentMiddle2: {
      flex: 3,
      width: width,
      backgroundColor: "transparent",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: width*0.1,
      paddingVertical: 20
    },
    CardContentBottom: {
      flex: 2,
      width: width-width*0.1,
      backgroundColor: "transparent",
      marginHorizontal: width*0.1,
      borderTopWidth: 1,
      borderColor: ThemeColors['white'],
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    NextButton: { 
      padding: 10, 
      borderRadius: 50,
      width: width-width*0.1, 
      backgroundColor: ThemeColors['aquamarine'], 
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "row"
    }
  });