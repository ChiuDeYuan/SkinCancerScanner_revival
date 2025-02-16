import {
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;

const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');

const MonoSelect = ({nowCard, setFinishQuestion, sendAnswer, addAnswer, disable}:{nowCard: number ; setFinishQuestion: (f: boolean)=>void ; sendAnswer: boolean ; addAnswer: (a: any)=>void ; disable: boolean ;}) => {

  const [checked, setChecked] = useState<number | null>(null);
  const options = info['diagnosis'][nowCard]['choices'];

  const handlePress = (idx: number) => {
    setChecked(idx);
    setFinishQuestion(true);
  }

  useEffect(() => {
    if(sendAnswer && checked != null && !disable){
      addAnswer(checked);
      setChecked(null);
    }
  }, [sendAnswer]);

  return(
    <View style={{flex: 1, width: cardWidth, height: null, alignItems: "center", justifyContent: "space-evenly", paddingVertical: 10}}>
      {options.map((option: string, idx: number) => (
        <TouchableOpacity
          disabled={disable}
          key={idx}
          onPress={() => handlePress(idx)}
          activeOpacity={0.5}
          style={{
            width: cardWidth-height*0.035,
            height: height*0.035,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            backgroundColor: checked === idx ? "#ffffff" : ThemeColors['white'],
            borderWidth: 3,
            borderColor: checked === idx ? ThemeColors['navyBlue'] : ThemeColors['aquamarine']
          }}
        >
          <View style={{
            position: "absolute",
            left: width*0.005,
            width: width*0.05,
            height: width*0.05, 
            borderRadius: 100, 
            borderWidth: 3,
            borderColor: checked === idx ? ThemeColors['navyBlue'] : ThemeColors['aquamarine'],
            alignItems: "center",
            justifyContent: "center"
            }}>
              <View style={{
              width: width*0.027,
              height: width*0.027, 
              borderRadius: 100, 
              backgroundColor: checked === idx? ThemeColors['navyBlue'] : ThemeColors['aquamarine'], 
              }}></View>
          </View>
          <View style={{width: cardWidth, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
            <Text style={{fontFamily: "MerriweatherBold", color: checked === idx ? ThemeColors['navyBlue'] : ThemeColors['aquamarine'], }}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MonoSelect