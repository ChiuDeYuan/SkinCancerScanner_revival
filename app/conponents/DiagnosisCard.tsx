import {
    View, 
    Text, 
    Dimensions, 
    TouchableHighlight, 
    Image,
    StyleSheet
} from 'react-native';
import { useEffect, useState } from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";
import Animated, {
    useAnimatedStyle, 
    withTiming,
    useSharedValue,
    SharedValue
} from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import DiagnosisAnswerBox from './DiagnosisAnswerBox';
import images from '../constants/images';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);
  
const DiagnosisCard = ({idx, remainCard, translationX, nowCard, setNowCard, fakeCardOpacity, fakeCard, setFakeCard, setFinishCard, addAnswer} : {idx: number ; remainCard: number ; translationX: SharedValue<number> ; nowCard: number ; setNowCard: (r:number)=>void ; fakeCardOpacity: SharedValue<number> ; fakeCard: number ; setFakeCard: (f:number)=>void ; setFinishCard: (s:boolean)=>void ; addAnswer: (a: any)=>void ; }) => {
  
    const cardX = useSharedValue(0);
    const cardOpacity = useSharedValue(1);
  
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
          <CardContent idx={idx} remainCard={remainCard} translationX={translationX} nowCard={nowCard} setNowCard={setNowCard} cardOpacity={cardOpacity} slideCard={updateCard} fakeCardOpacity={fakeCardOpacity} fakeCard={fakeCard} setFakeCard={setFakeCard} setFinishCard={setFinishCard} addAnswer={addAnswer}/>
        </Animated.View>
      </View>
    );
  }
  
const CardContent = ({ idx, remainCard, translationX, nowCard, setNowCard, cardOpacity, slideCard, fakeCardOpacity, fakeCard, setFakeCard, setFinishCard, addAnswer } : { idx: number ; remainCard: number ; translationX: SharedValue<number> ; nowCard: number ; setNowCard: (r:number) => void ; cardOpacity: SharedValue<number> ; slideCard: ()=>void ; fakeCardOpacity: SharedValue<number> ; fakeCard: number ; setFakeCard: (f:number)=>void ; setFinishCard: (s:boolean)=>void ; addAnswer: (a: any)=>void ;}) => {

    const [finishQuestion, setFinishQuestion] = useState(false);
    const [sendAnswer, setSendAnswer] = useState(false);

    const AnimatedCardContent = useAnimatedStyle(()=>{
        return { 
            elevation: idx == 0 ? 5 : withTiming(translationX.value < 30 ? 0 : 2, {duration: 200})
        };
    })
    
    const handlePress = () =>{
        setSendAnswer(true);
        slideCard();
        setFinishQuestion(false);
        if(remainCard > 1){
            setTimeout(()=>{
                setSendAnswer(false);
                fakeCardOpacity.value = withTiming(1, { duration: 0 });
                setNowCard(nowCard+1);
                setTimeout(()=>{
                cardOpacity.value = withTiming(1, { duration: 0 });
                fakeCardOpacity.value = withTiming(0, { duration: 0 });
                setTimeout(()=>{
                    setFakeCard(fakeCard+1);
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
                
                <View style={[styles.CardContentTop]}>
                    <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                    {info['diagnosis'][nowCard]['title']}
                    </Text>
                </View>

                <View style={styles.CardContentMiddle1}>
                    <Image source={images.diagnosis[nowCard]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
                </View>

                <View style={styles.CardContentMiddle2}>
                    <DiagnosisAnswerBox nowCard={nowCard} setFinishQuestion={setFinishQuestion} sendAnswer={sendAnswer} addAnswer={addAnswer}  disable={false}></DiagnosisAnswerBox>
                </View>

                <View style={styles.CardContentBottom}>
                    <AnimatedTouchableHighlight onPress={()=>handlePress()} underlayColor={ThemeColors['touchable']} style={[styles.NextButton, {backgroundColor: finishQuestion ? ThemeColors['aquamarine'] : ThemeColors['touchable']}]} disabled={!finishQuestion}>
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
            <View style={[styles.CardContentTop]}>
            <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                {info['diagnosis'][nowCard+1]['title']}
                </Text>
            </View>
            <View style={styles.CardContentMiddle1}>
                <Image source={images.diagnosis[nowCard+1]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
            </View>
            <View style={styles.CardContentMiddle2}>
                <DiagnosisAnswerBox nowCard={nowCard+1} setFinishQuestion={setFinishQuestion} sendAnswer={false} addAnswer={addAnswer}  disable={true}></DiagnosisAnswerBox>
            </View>
            <View style={styles.CardContentBottom}>
                <AnimatedTouchableHighlight onPress={()=>handlePress()} underlayColor={ThemeColors['touchable']} style={[styles.NextButton, {backgroundColor: ThemeColors['touchable']}]} disabled={true}>
                    <>
                        <Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10}]}>
                            Next
                        </Text>
                        <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
                    </> 
                </AnimatedTouchableHighlight>
            </View>
            </View>   
        )}
        </Animated.View>
    );
}

export default DiagnosisCard;

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
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "row"
    }
  });