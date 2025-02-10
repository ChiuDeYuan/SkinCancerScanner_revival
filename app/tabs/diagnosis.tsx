import {
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Button, 
  TouchableHighlight, 
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Animated, {
   useAnimatedStyle, 
   withTiming,
   Easing,
   useSharedValue,
   withSpring,
   SharedValue
} from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector, 
  GestureHandlerRootView,
  GestureType
} from "react-native-gesture-handler";

import images from '../constants/images';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;

const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');


const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const Card = ({idx, remainCard, translationX, nowCard, setNowCard, fakeCardOpacity, fakeCard, setFakeCard, setFinishCard} : {idx: number ; remainCard: number ; translationX: SharedValue<number> ; nowCard: number ; setNowCard: (r:number) => void ; fakeCardOpacity: SharedValue<number> ; fakeCard: number ; setFakeCard: (f:number) => void ; setFinishCard: (s:boolean) => void ; }) => {
  
  const cardX = useSharedValue(0)
  const cardOpacity = useSharedValue(1)

  const AnimatedCardStack = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${Math.min(translationX.value / 5, 30)}deg` },
        { translateX: translationX.value*idx / (25*(remainCard/5)) },
        { scale: 1-( 1- 3*( idx / remainCard))*(translationX.value / 10000) }
      ],
    };
  });

  const SlideStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardX.value }
      ],
      opacity: cardOpacity.value
    };
  });

  const updateCard = () => {
    cardX.value = withTiming(-400, { duration: 300 }, (finished) => {
      if (finished) {
        cardOpacity.value = withTiming(0, { duration: 0 });
        cardX.value = withTiming(0, { duration: 0 });
      }
    });
  }

  return (
    <View style={[styles.Container]}>
      <Animated.View style={[styles.CardStack, AnimatedCardStack, SlideStyle]}>
        <CardContent idx={idx} remainCard={remainCard} translationX={translationX} nowCard={nowCard} setNowCard={setNowCard} cardOpacity={cardOpacity} slideCard={updateCard} fakeCardOpacity={fakeCardOpacity} fakeCard={fakeCard} setFakeCard={setFakeCard} setFinishCard={setFinishCard}/>
      </Animated.View>
    </View>
  );
}

const CardContent = ({ idx, remainCard, translationX, nowCard, setNowCard, cardOpacity, slideCard, fakeCardOpacity, fakeCard, setFakeCard, setFinishCard } : { idx: number ; remainCard: number ; translationX: SharedValue<number> ; nowCard: number ; setNowCard: (r:number) => void ; cardOpacity: SharedValue<number> ; slideCard: () => void ; fakeCardOpacity: SharedValue<number> ; fakeCard: number ; setFakeCard: (f:number) => void ; setFinishCard: (s:boolean) => void ; }) => {

  const AnimatedCardContent = useAnimatedStyle(()=>{
    return { 
      elevation: idx == 0 ? 5 : withTiming(translationX.value < 30 ? 0 : 2, {duration: 200})
    };
  })

  const handlePress = () =>{
    slideCard();
    if(remainCard != 1){
      setTimeout(()=>{
        fakeCardOpacity.value = withTiming(1, { duration: 0 });
        setNowCard(nowCard+1);
        setTimeout(()=>{
          cardOpacity.value = withTiming(1, { duration: 0 });
          fakeCardOpacity.value = withTiming(0, { duration: 0 });
          setTimeout(()=>{
            setFakeCard(fakeCard+1)
          }, 100)
        }, 200);
      }, 350);
    }
    else{
      setTimeout(()=>{
        setFinishCard(true);
      }, 350);
    }
  }

  return(
    <Animated.View style={[styles.CardContent, AnimatedCardContent]}>
      {idx==remainCard-1 ? (
        <View style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>
          <View style={[styles.CardContentTop, {width: width-50}]}>
            <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24, position: "absolute", left: 0}}>
              {idx}
            </Text>
          </View>
          <View style={styles.CardContentMiddle1}>
            <Image source={images.diagnosis[nowCard]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
          </View>
          <View style={styles.CardContentMiddle2}>
            {
              
            }
          </View>
          <View style={styles.CardContentBottom}>
            <AnimatedTouchableHighlight onPress={()=>handlePress()} underlayColor={ThemeColors['touchable']} style={styles.NextButton}>
              <>
              <Animated.Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10}]}>
                Next
              </Animated.Text>
              <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
              </> 
            </AnimatedTouchableHighlight>
          </View>
        </View>   
      ):(
        <View style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>
          <View style={[styles.CardContentTop, {width: width-50}]}>
          <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24, position: "absolute", left: 0}}>
              {idx}
            </Text>
          </View>
          <View style={styles.CardContentMiddle1}>
            <Image source={images.diagnosis[nowCard+1]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
          </View>
          <View style={styles.CardContentMiddle2}>

          </View>
          <View style={styles.CardContentBottom}>
            <AnimatedTouchableHighlight onPress={()=>handlePress()} underlayColor={ThemeColors['touchable']} style={styles.NextButton}>
              <>
              <Animated.Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10}]}>
                Next
              </Animated.Text>
              <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
              </> 
            </AnimatedTouchableHighlight>
          </View>
        </View>   
      )}
    </Animated.View>
  );
}

const DiagnosisScreen = () => {
  const allCardNum = 22
  const [nowCard, setNowCard] = useState(0)
  const [fakeCard, setFakeCard] = useState(1)
  const [finishCard, setFinishCard] = useState(false) 

  const translationX = useSharedValue(0);
  const fakeCardOpacity = useSharedValue(0);

  const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    translationX.value = Math.max(event.translationX, 0);
  })
  .onEnd(() => {
    translationX.value = withSpring(0);
  });

  const AnimatedCircleindicator = useAnimatedStyle(()=>{
    return { 
      width: withTiming(translationX.value > 40 ? 150 : 0 , {duration: 250}),
      height: withTiming(translationX.value > 40 ? 150 : 0 , {duration: 250})
    };
  })

  const AnimatedFakeCard = useAnimatedStyle(()=>{
    return { 
      opacity: fakeCardOpacity.value
    };
  })

  return(
    !finishCard ? (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}}>
        <ImageBackground source={require('../../assets/images/content/bg_hospital_chiryou2.jpg')} resizeMode='contain' style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}} imageStyle={{opacity: 0.1}}>
          
          <Animated.View style={[styles.CircleIndicator, AnimatedCircleindicator]}>
            <Text style={styles.CircleIndicatorText}>
              {allCardNum-nowCard}
            </Text>
          </Animated.View>

          <GestureHandlerRootView style={[styles.Container]}>
            <GestureDetector gesture={panGesture}>
              <View style={[styles.Container]}>

                {Array.from({ length: Math.min(5, allCardNum-nowCard) }).map((_, idx) => (
                  // NOTE!!!: 畫面上最後一張idx==0，最前面idx==remainCard-1
                  <Card 
                    key={idx} 
                    idx={idx} 
                    remainCard={Math.min(5, allCardNum-nowCard)} 
                    translationX={translationX}
                    nowCard={nowCard}
                    setNowCard={setNowCard}
                    fakeCardOpacity={fakeCardOpacity}
                    fakeCard={fakeCard}
                    setFakeCard={setFakeCard}
                    setFinishCard={setFinishCard}
                  />
                ))}

                {
                //Fake Card
                }
                <Animated.View pointerEvents={'none'} style={[styles.Container, {opacity: 0.5}, AnimatedFakeCard]}>
                  <View pointerEvents={'none'} style={[styles.CardStack]}>
                    <View pointerEvents={'none'} style={[styles.CardContent]}>
                      <View pointerEvents={'none'} style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>
                        <View pointerEvents={'none'} style={styles.CardContentTop}>
                          <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                            {info['diagnosis'][fakeCard]['title']}
                          </Text>
                        </View>
                        <View pointerEvents={'none'}style={styles.CardContentMiddle1}>
                          <Image source={images.diagnosis[fakeCard]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
                        </View>
                        <View pointerEvents={'none'}style={styles.CardContentMiddle2}>
                          {
                            
                          }
                        </View>
                        <View pointerEvents={'none'}style={styles.CardContentBottom}>
                          <AnimatedTouchableHighlight disabled={true} onPress={()=>{}} underlayColor={ThemeColors['touchable']} style={styles.NextButton}>
                            <>
                            <Animated.Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10}]}>
                              Next
                            </Animated.Text>
                            <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
                            </> 
                          </AnimatedTouchableHighlight>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>

              </View>
            </GestureDetector>
          </GestureHandlerRootView>

        </ImageBackground>
      </View>
    ):(
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}}>
        <ImageBackground source={require('../../assets/images/content/bg_hospital_chiryou2.jpg')} resizeMode='contain' style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}} imageStyle={{opacity: 0.1}}>
          <View>
            <Button title='reset' onPress={()=>{
              setNowCard(0);
              setFakeCard(1);
              setFinishCard(false);
              fakeCardOpacity.value = withTiming(0, {duration: 0});
            }}></Button>
          </View>
        </ImageBackground>
      </View>
    )
  );
}

export default DiagnosisScreen;

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
    marginBottom: 40,
    borderWidth: 5,
    borderColor: "#ffffff",
    position: "absolute",
    top: 0,
  },
  CircleIndicator: {
    flex: 1,
    position: "absolute", 
    right: width-165, 
    borderRadius: 75, 
    width: 0, 
    height: 0, 
    backgroundColor: ThemeColors['aquamarine'],
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  CircleIndicatorText: {
    fontSize: RFPercentage(2.2),
    fontFamily: "MerriweatherBold",
    color: ThemeColors['white'],
    position: "absolute",
    left: 10,
  },
  CardContentTop: {
    flex: 2,
    width: cardWidth,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  CardContentMiddle1: {
    flex: 3,
    width: cardWidth,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  CardContentMiddle2: {
    flex: 2,
    width: cardWidth,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  CardContentBottom: {
    flex: 1,
    width: cardWidth-40,
    backgroundColor: "transparent",
    marginHorizontal: 40,
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