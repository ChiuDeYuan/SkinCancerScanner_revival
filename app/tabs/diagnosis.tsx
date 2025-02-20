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
import DiagnosisForm from '../conponents/DiagnosisForm';
import DiagnosisStart from '../conponents/DiagnosisStart';
import DiagnosisEnd from '../conponents/DiagnosisEnd';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;
const ThemeColors = require('../constants/colors.json');

const DiagnosisScreen = () => {
  const [finishCard, setFinishCard] = useState(false);
  const [startDiagnosis, setStartDiagnosis] = useState(false);
  const [UserAnswer, setUserAnswer] = useState<Array<number>>([]);
  const [scanResult, setScanResult] = useState<[string, number] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const addAnswer = (ans: number) => {
    setUserAnswer((prevAns) => [...prevAns, ans]);
  };

  useEffect(()=>{
    console.log(UserAnswer);
  }, [UserAnswer])

  const resetALL = () => {
    setFinishCard(false);
    setStartDiagnosis(false);
    setUserAnswer([]);
    setScanResult(null);
    setShowResult(false);
  }

  return(
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}}>
      <ImageBackground source={require('../../assets/images/background/spot_background_green.png')} resizeMode='cover' style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height}} imageStyle={{opacity: 0.2}}>
          
      {
      
      !startDiagnosis ? (       
        <DiagnosisStart setStartDiagnosis={setStartDiagnosis}></DiagnosisStart>
      ):

      !finishCard? (
        <DiagnosisForm setFinishCard={setFinishCard} addAnswer={addAnswer}></DiagnosisForm>
      ):
      
      !scanResult ? (
        <PhotoUpload setScanResult={setScanResult}></PhotoUpload>
      ):
      
      !showResult ? (
        <ResultPage userCardAnswer={UserAnswer} scanResult={scanResult} setShowResult={setShowResult}></ResultPage>
      ):

      (
        <DiagnosisEnd resetALL={resetALL}></DiagnosisEnd>
      )

      }

      </ImageBackground>
    </View>
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