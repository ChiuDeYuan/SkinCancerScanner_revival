import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;
const ThemeColors = require('../constants/colors.json');

const SkinColorPicker = ({nowCard, setFinishQuestion, sendAnswer, addAnswer, disable}:{nowCard: number ; setFinishQuestion: (f: boolean)=>void ; sendAnswer: boolean ; addAnswer: (a: any)=>void ; disable: boolean}) => {

    const progress = useSharedValue(0.5);
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    const AnimatedThumb = useAnimatedStyle(()=>{
      return { 
        opacity: progress.value
      };
    })
  

    useEffect(() => {
        if(sendAnswer && !disable){
          if(progress.value > 0.7){
            addAnswer(0); //dark
          }
          else if(progress.value < 0.3){
            addAnswer(2); //light
          }
          else{
            addAnswer(1); //in between
          }
          setTimeout(()=>{
            progress.value = 1;
          }, 300)
        }
    }, [sendAnswer]);

    return (
        <View style={{flex: 1, width: cardWidth, alignItems: "center", paddingVertical: 10}}>
        <Slider 
        disable={disable}
        progress={progress} 
        minimumValue={min} 
        maximumValue={max} 
        sliderHeight={12}
        style={{width: cardWidth-70, height: 50}} 
        renderThumb={()=>
          <View style={{width: 30, height: 30, borderRadius: 100, backgroundColor: "white", borderWidth: 1, borderColor: ThemeColors['black'], alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
            <TouchableOpacity disabled={disable} activeOpacity={1} onPressIn={()=>setFinishQuestion(true)} style={{width: 60, height: 60, borderRadius: 100, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
              <View style={{width: 26, height: 26, borderRadius: 100, backgroundColor: "#FAEBE6", borderWidth: 1, borderColor: ThemeColors['black'], alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <Animated.View style={[{width: 26, height: 26, borderRadius: 100, backgroundColor: "#4A332D", opacity: 1}, AnimatedThumb]}>
                
                </Animated.View>
              </View>
            </TouchableOpacity>  
          </View>    
        } 
        renderTrack={()=><View></View>}
        renderContainer={()=><LinearGradient
            colors={["#FAEBE6", "#4A332D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{width: cardWidth-70, height: 12, borderRadius: 20}}
          ></LinearGradient> }
          renderBubble={()=>
          <View style={{width: 60, height: 40, borderRadius: 10, backgroundColor: "#FAEBE6", borderWidth: 2, borderColor: ThemeColors['black'], alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
          <Animated.View style={[{width: 60, height: 40, borderRadius: 10, backgroundColor: "#4A332D", opacity: 1, borderWidth: 2, borderColor: ThemeColors['black']}, AnimatedThumb]}>
          </Animated.View>
        </View>}
      bubbleOffsetX={27}
      bubbleTranslateY={-45}
        />
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  box: {
    flex: 1,
    width: 150,
    height: 20,
    backgroundColor: 'blue', // 初始為藍色
    marginBottom: 20,
    borderRadius: 10,
  },
  slider: {
    width: 50,
    height: 40,
  },
});

export default SkinColorPicker;
