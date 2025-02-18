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
import Animated, { configureReanimatedLogger } from 'react-native-reanimated';
import { useState } from 'react';


const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;
const ThemeColors = require('../constants/colors.json');
const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

const DisplayCard = ({isModalVisible, setIsModalVisible, scanResult} : {isModalVisible: boolean ; setIsModalVisible: (b: boolean)=>void ; scanResult: [string, number]}) =>{
    const base64ImgUri = `data:image/jpeg;base64,${scanResult[0]}`;

    return(
        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.CardStack, {width: cardWidth, height: cardHeight, borderRadius: 20, marginHorizontal: 10}]}>
                <View style={[styles.CardContent, {backgroundColor: scanResult[1]<=50 ? ThemeColors['resultPage'][0] : (scanResult[1]>80 ? ThemeColors['resultPage'][2] : ThemeColors['resultPage'][1]), borderRadius: 20, borderWidth: 5,}]}>
                    <View style={{flex: 1, width: cardWidth, height: cardHeight, alignItems: "center"}}>

                    <View style={[styles.CardContentTop, {width: cardWidth, paddingHorizontal: width*0.1, paddingTop: height*0.02,}]}>
                        <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24}}>
                        Uploaded Photo
                        </Text>
                    </View>

                    <View style={[styles.CardContentMiddle1, {borderBottomWidth: 1, width: (cardWidth-width*0.1), marginHorizontal: width*0.1, paddingBottom: height*0.02}]}>
                      {scanResult[0] == "null" ? 
                        <Text style={{fontSize: RFPercentage(4), fontFamily: "MerriweatherRegular"}}>
                          N/A
                        </Text>
                        : 
                        <View style={{width: "100%", height: "100%"}}>
                            <Image source={{uri: base64ImgUri}} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
                        </View>
                      }
                    </View>

                    <View style={[styles.CardContentMiddle2, {width: cardWidth, flexDirection: "column"}]}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                          <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue']}}>
                              Prediction:
                          </Text>
                        </View>
                        <View style={{flex: 3}}>
                          <View style={{flex: 1, borderRadius: 10, marginVertical: 10, marginHorizontal: cardWidth*0.1, alignItems: "center", justifyContent: "center", backgroundColor: ThemeColors['border'], paddingHorizontal: 10}}>
                              <Text numberOfLines={3} style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular"}}>
                              {scanResult[1] != -1 ? scanResult[1]+"%" : "N/A"}
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

const ScanDisplayCard = ({scale, scanResult}:{scale: number ; scanResult: [string, number]}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const base64ImgUri = `data:image/jpeg;base64,${scanResult[0]}`;

  return(
    <View style={[styles.CardStack, {width: cardWidth*scale, height: cardHeight*scale, borderRadius: 20*scale, marginHorizontal: 10}]}>

      <DisplayCard isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} scanResult={scanResult}></DisplayCard>

      <TouchableOpacity onLongPress={()=>setIsModalVisible(true)} style={[styles.CardContent, {backgroundColor: scanResult[1]<=50 ? ThemeColors['resultPage'][0] : (scanResult[1]>80 ? ThemeColors['resultPage'][2] : ThemeColors['resultPage'][1]), borderRadius: 20*scale, borderWidth: 5*scale,}]}>
        <View pointerEvents={'none'} style={{flex: 1, width: cardWidth*scale, height: cardHeight*scale, alignItems: "center"}}>

          <View style={[styles.CardContentTop, {width: cardWidth*scale, paddingHorizontal: width*0.1*scale, paddingTop: height*0.02*scale,}]}>
            <Text style={{fontSize: RFPercentage(2)*scale, fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue'], lineHeight: 24*scale}}>
              Uploaded Photo
            </Text>
          </View>

          <View style={[styles.CardContentMiddle1, {borderBottomWidth: 1*scale, width: (cardWidth-width*0.1)*scale, marginHorizontal: width*0.1*scale, paddingBottom: height*0.02*scale}]}>
            {scanResult[0] == "null" ? 
              <Text style={{fontSize: RFPercentage(4)*scale, fontFamily: "MerriweatherRegular"}}>
                N/A
              </Text>
              : 
              <View style={{width: "100%", height: "100%"}}>
                  <Image source={{uri: base64ImgUri}} style={{flex: 1, height: null, resizeMode: "contain"}}></Image>
              </View>
            }
          </View>

          <View style={[styles.CardContentMiddle2, {width: cardWidth*scale, flexDirection: "column"}]}>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
              <Text style={{fontSize: RFPercentage(2)*scale, fontFamily: "MerriweatherBold", color: ThemeColors['navyBlue']}}>
                Prediction:
              </Text>
            </View>
            <View style={{flex: 3}}>
              <View style={{flex: 1, borderRadius: 10*scale, marginVertical: 10*scale, marginHorizontal: cardWidth*0.1*scale, alignItems: "center", justifyContent: "center", backgroundColor: ThemeColors['border'], paddingHorizontal: 10*scale}}>
                <Text numberOfLines={3} style={{fontSize: RFPercentage(2)*scale, fontFamily: "MerriweatherRegular"}}>
                  {scanResult[1] != -1 ? scanResult[1]+"%" : "N/A"}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.CardContentBottom, {width: (cardWidth-width*0.1)*scale, marginHorizontal: width*0.1*scale, borderTopWidth: 1*scale,}]}>
            <AnimatedTouchableHighlight onPress={()=>setIsModalVisible(false)} underlayColor={ThemeColors['touchable']} style={[styles.NextButton, {bottom: 12*scale, right: 5*scale, padding: 10*scale, borderRadius: 50*scale, backgroundColor: ThemeColors['aquamarine']}]}>
              <>
                <Text style={[{fontSize: RFPercentage(2)*scale, fontFamily: "MerriweatherBoldItalic", color: ThemeColors['white'], marginLeft: 10*scale}]}>
                  Close
                </Text>
                <Ionicons name="chevron-forward-outline" size={24*scale} color={ThemeColors['white']} />
              </> 
            </AnimatedTouchableHighlight>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ScanDisplayCard;

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