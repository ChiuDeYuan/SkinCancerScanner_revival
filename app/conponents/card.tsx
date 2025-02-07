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

const { width, height } = Dimensions.get('window');
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');

const Card = ({ scrollToPosition, toggleScroll }: { scrollToPosition: (y: number) => void , toggleScroll: (t: boolean) => void }) =>{
  const [toggleCard, setToggleCard] = useState(false);
  const cardRef = useRef<View>(null);
  const [cardY, setCardY] = useState(0);

  useEffect(() => {
    if(toggleCard){
      scrollToPosition(cardY);
    }
    else{
      scrollToPosition(cardY-height*0.2);
    }
  }, [toggleCard]);

  const CardStyle = useAnimatedStyle(()=>{
    return { 
      width: withTiming(toggleCard? width : width*0.6, {duration:300, easing:Easing.bezier(0.5, 0.01, 0, 1)}),
      height: withTiming(toggleCard? height : height*0.5, {duration:300, easing:Easing.bezier(0.5, 0.01, 0, 1)}),
      borderRadius: withTiming(toggleCard ? 0 : 20, { duration: 300 })
    };
  })

  return(
    <Animated.View ref={cardRef} onLayout={(event) => setCardY(event.nativeEvent.layout.y)} style={[styles.CardStyle, CardStyle]}>
      {toggleCard ? 
      (
        <View>
          <TouchableOpacity onPress={() => {setToggleCard(false); toggleScroll(true)}} 
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            backgroundColor: ThemeColors['aquamarine'],
            borderRadius: 20,
            padding: 10,
          }}>
              <Ionicons name="arrow-back" size={24} color="#eff0f1" />
          </TouchableOpacity>
          <Text>Toggled!</Text>
        </View>
      ) : 
      (
        <TouchableHighlight underlayColor="#6caccf" onPress={() => {setToggleCard(true); toggleScroll(false);}} style={{width: width*0.5,
          height: height*0.5,
          borderRadius: 20,
          backgroundColor: ThemeColors['babyBlue'],
          alignItems: "center",}}>
        <Text>
          Test
        </Text>
       </TouchableHighlight>
      )}
    </Animated.View>
  );
}

export default Card;

const styles = StyleSheet.create({
  CardStyle: {
    width: width*0.6,
    height: height*0.5,
    borderRadius: 20,
    backgroundColor: ThemeColors['babyBlue'],
    alignItems: "center",
    marginBottom: 40,
    elevation: 10,
  }
});