import {
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Button, 
  TouchableHighlight, 
  TouchableOpacity,
  Image
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
import { createAnimatedComponent } from 'react-native-reanimated/lib/typescript/createAnimatedComponent';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.7;

const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');


const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const Card = ({idx, remainCard, translationX, panGesture} : {idx: number; remainCard: number; translationX: SharedValue<number>; panGesture: GestureType;}) => {
  
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

  return (
      <GestureHandlerRootView style={[styles.container]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.CardStack, AnimatedCardStack]}>
            <CardContent idx={idx} remainCard={remainCard} translationX={translationX}/>
          </Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
  );
}

const CardContent = ({ idx, remainCard, translationX } : { idx: number ; remainCard: number ; translationX: SharedValue<number> }) => {
  const [toggleCard, setToggleCard] = useState(false);
  const [pageIdx, setPageIdx] = useState(1);

  const AnimatedCardContent = useAnimatedStyle(()=>{
    return { 
      elevation: idx == 0 ? 5 : withTiming(translationX.value < 30 ? 0 : 2, {duration: 200})
    };
  })

  return(
    <Animated.View style={[styles.CardContent, AnimatedCardContent]}>

    </Animated.View>
  );
}

const ProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(progress+1)
  }, [progress]);

  return 
}

const DiagnosisScreen = () => {
  const [remainCard, setRemainCard] = useState(1)

  const translationX = useSharedValue(0);

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

  return(
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: width, height: height,}}>
      <Animated.View style={[styles.CircleIndicator, AnimatedCircleindicator]}>
        <Text style={{position: "absolute", left: 10, fontSize: RFPercentage(2.2), fontFamily: "MerriweatherBold", color: ThemeColors['white']}}>
          {remainCard}
        </Text>
      </Animated.View>
      {Array.from({ length: Math.min(5, remainCard) }).map((_, idx) => (
        // NOTE!!!: 畫面上最後一張idx==0，最前面idx==remainCard-1
        <Card 
          key={idx} 
          idx={idx} 
          remainCard={Math.min(5, remainCard)} 
          translationX={translationX}
          panGesture={panGesture}
        />
      ))}
    </View>
  );
}

export default DiagnosisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
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
});