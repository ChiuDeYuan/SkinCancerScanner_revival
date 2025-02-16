import {
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Button, 
  TouchableHighlight, 
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Animated, {
   useAnimatedStyle, 
   withTiming,
   useSharedValue,
   withSpring,
   SharedValue
} from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector, 
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import DiagnosisCard from '../conponents/DiagnosisCard';
import images from '../constants/images';
import DiagnosisAnswerBox from '../conponents/DiagnosisAnswerBox';
import PhotoUpload from '../conponents/PhotoUpload';
import ResultPage from '../conponents/ResultPage';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const DiagnosisScreen = () => {
  const allCardNum = info['diagnosis'].length;
  const [nowCard, setNowCard] = useState(0);
  const [fakeCard, setFakeCard] = useState(1);
  const [finishCard, setFinishCard] = useState(false) ;
  const [UserAnswer, setUserAnswer] = useState<Array<number>>([]);
  const [scanResult, setScanResult] = useState<number | null>(null);
  const translationX = useSharedValue(0);
  const fakeCardOpacity = useSharedValue(0);

  const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    translationX.value = Math.max(event.translationX, 0);
  })
  .onEnd(() => {
    translationX.value = withSpring(0);
  });

  const addAnswer = (ans: number) => {
    setUserAnswer((prevAns) => [...prevAns, ans]);
  };

  const AnimatedCircleindicator = useAnimatedStyle(()=>{
    return { 
      width: withTiming(translationX.value > 40 ? width*0.4 : 0 , {duration: 250}),
      height: withTiming(translationX.value > 40 ? width*0.4 : 0 , {duration: 250})
    };
  })

  const AnimatedFakeCard = useAnimatedStyle(()=>{
    return { 
      opacity: fakeCardOpacity.value
    };
  })

  useEffect(()=>{
    console.log(UserAnswer);
  }, [UserAnswer])

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
                  <DiagnosisCard 
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
                    addAnswer={addAnswer}
                  />
                ))}

                {/*Fake Card*/}
                <Animated.View pointerEvents={'none'} style={[styles.Container, AnimatedFakeCard]}>
                  <View pointerEvents={'none'} style={[styles.CardStack]}>
                    <View pointerEvents={'none'} style={[styles.CardContent]}>
                      <View pointerEvents={'none'} style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>
                        <View pointerEvents={'none'} style={styles.CardContentTop}>
                          <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                            {fakeCard >= allCardNum ? info['diagnosis'][0]['title'] : info['diagnosis'][fakeCard]['title']}
                          </Text>
                        </View>
                        <View pointerEvents={'none'}style={styles.CardContentMiddle1}>
                          <Image source={fakeCard >= allCardNum ? images.diagnosis[0] : images.diagnosis[fakeCard]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
                        </View>
                        <View pointerEvents={'none'}style={styles.CardContentMiddle2}>
                          <DiagnosisAnswerBox nowCard={fakeCard >= allCardNum ? 0 : fakeCard} setFinishQuestion={()=>{}} sendAnswer={false} addAnswer={addAnswer}  disable={true}></DiagnosisAnswerBox>
                        </View>
                        <View pointerEvents={'none'}style={styles.CardContentBottom}>
                          <AnimatedTouchableHighlight disabled={true} onPress={()=>{}} underlayColor={ThemeColors['touchable']} style={styles.NextButton}>
                            <>
                            <Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10}]}>
                              Next
                            </Text>
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
          {
            scanResult ? (
              <ResultPage userCardAnswer={UserAnswer} scanResult={scanResult}></ResultPage>
            ):(
              <PhotoUpload setScanResult={setScanResult}></PhotoUpload>
            )
          }
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
    flexDirection: "row"
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
    backgroundColor: ThemeColors['touchable'], 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row"
  },
  CircleIndicator: {
    flex: 1,
    position: "absolute", 
    right: width-width*0.42, 
    borderRadius: width*0.5, 
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
  }
});