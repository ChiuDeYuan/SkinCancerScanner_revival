import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableHighlight, 
    TouchableOpacity,
    Image,
    Modal
  } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import images from '../constants/images';
import DiagnosisAnswerBox from '../conponents/DiagnosisAnswerBox';
import Animated from 'react-native-reanimated';
import { useState } from 'react';


const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;
const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');
const AllCardNum = info['diagnosis'].length
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const DisplayCard = ({isModalVisible, setIsModalVisible, userCardAnswer, idx} : {isModalVisible: boolean ; setIsModalVisible: (b: boolean)=>void ; userCardAnswer: Array<number> ; idx: number}) =>{
    return(
        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
              <View style={[styles.CardStack, {width: cardWidth, height: cardHeight, borderRadius: 20, marginHorizontal: 10}]}>
                <View style={[styles.CardContent, {backgroundColor: ThemeColors['resultPage'][info['diagnosis'][idx]['risk'][userCardAnswer[idx]]], borderRadius: 20, borderWidth: 5,}]}>
                  <View style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>

                    <View style={[styles.CardContentTop, {width: cardWidth, paddingHorizontal: width*0.1, paddingTop: height*0.02,}]}>
                      <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                        {idx >= AllCardNum ? info['diagnosis'][0]['title'] : info['diagnosis'][idx]['title']}
                      </Text>
                    </View>

                    <View style={[styles.CardContentMiddle1, {borderBottomWidth: 1, width: (cardWidth-width*0.1), marginHorizontal: width*0.1, paddingBottom: height*0.02}]}>
                      <Image source={idx >= AllCardNum ? images.diagnosis[0] : images.diagnosis[idx]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
                    </View>

                    <View style={[styles.CardContentMiddle2, {width: cardWidth, flexDirection: "column"}]}>
                      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue']}}>Your answer:</Text>
                      </View>
                      <View style={{flex: 3}}>
                        <View style={{flex: 1, borderRadius: 10, marginVertical: 10, marginHorizontal: cardWidth*0.1, alignItems: "center", justifyContent: "center", backgroundColor: ThemeColors['border'], paddingHorizontal: 10}}>
                          <Text numberOfLines={3} style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular"}}>
                            {info['diagnosis'][idx]['choices'][userCardAnswer[idx]]}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.CardContentBottom, {width: (cardWidth-width*0.1), marginHorizontal: width*0.1, borderTopWidth: 1,}]}>
                      <AnimatedTouchableHighlight onPress={()=>setIsModalVisible(false)} underlayColor={ThemeColors['touchable']} style={[styles.NextButton, {bottom: 12, right: 5, padding: 10, borderRadius: 50, backgroundColor: ThemeColors['aquamarine']}]}>
                        <>
                          <Text style={[{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10}]}>
                            Close
                          </Text>
                          <Ionicons name="chevron-forward-outline" size={24} color={ThemeColors['white']} />
                        </> 
                      </AnimatedTouchableHighlight>
                    </View>

                  </View>
                </View>
              </View>
            </View>
        </Modal>
    );
}

const ResultDisplayCard = ({userCardAnswer, idx, scale}:{userCardAnswer: Array<number>, idx: number, scale: number}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return(
    <View style={[styles.CardStack, {width: cardWidth*scale, height: cardHeight*scale, borderRadius: 20*scale, marginHorizontal: 10}]}>

      <DisplayCard userCardAnswer={userCardAnswer} idx={idx} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></DisplayCard>

      <TouchableOpacity onLongPress={()=>setIsModalVisible(true)} style={[styles.CardContent, {backgroundColor: ThemeColors['resultPage'][info['diagnosis'][idx]['risk'][userCardAnswer[idx]]], borderRadius: 20*scale, borderWidth: 5*scale,}]}>
        <View pointerEvents={'none'} style={{flex: 1, width: cardWidth*scale, height: cardHeight*scale, alignItems: "center"}}>

          <View style={[styles.CardContentTop, {width: cardWidth*scale, paddingHorizontal: width*0.1*scale, paddingTop: height*0.02*scale,}]}>
            <Text style={{fontSize: RFPercentage(2)*scale, fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24*scale}}>
              {idx >= AllCardNum ? info['diagnosis'][0]['title'] : info['diagnosis'][idx]['title']}
            </Text>
          </View>

          <View style={[styles.CardContentMiddle1, {borderBottomWidth: 1*scale, width: (cardWidth-width*0.1)*scale, marginHorizontal: width*0.1*scale, paddingBottom: height*0.02*scale}]}>
            <Image source={idx >= AllCardNum ? images.diagnosis[0] : images.diagnosis[idx]} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
          </View>

          <View style={[styles.CardContentMiddle2, {width: cardWidth*scale}]}>
            
          </View>

          <View style={[styles.CardContentBottom, {width: (cardWidth-width*0.1)*scale, marginHorizontal: width*0.1*scale, borderTopWidth: 1*scale,}]}>
            
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
}
  
export default ResultDisplayCard;

const styles = StyleSheet.create({
  CardStack: {
    backgroundColor: "white",
  },
  CardContent: {
    flex: 1,
    alignItems: "center",
    borderColor: "#ffffff",
    elevation: 5
  },
  CardContentTop: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  CardContentMiddle1: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: ThemeColors['white'],
  },
  CardContentMiddle2: {
    flex: 2,
    justifyContent: "center",
    flexDirection: "row"
  },
  CardContentBottom: {
    flex: 1,
    borderColor: ThemeColors['white']
  },
  NextButton: {
    position: "absolute", 
    backgroundColor: ThemeColors['touchable'], 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row"
  },
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
  },
});