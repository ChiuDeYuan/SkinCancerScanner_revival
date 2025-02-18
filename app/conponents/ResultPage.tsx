import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    Image, 
    Dimensions, 
    TouchableHighlight, 
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import { useEffect, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, useDerivedValue, runOnJS, Easing } from 'react-native-reanimated';
import ResultDisplayCard from './ResultDisplayCard';
import ScanDisplayCard from './ScanDisplayCard';
import ScoreCalculator from '../tools/score-calculator';
import saveResult from '../tools/saveResult';

const { width, height } = Dimensions.get('window');
const ThemeColors = require('../constants/colors.json');
const info = require('../constants/information_basic.json');
const AllCardNum = info['diagnosis'].length;
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const ResultInfo = ({isModalVisible, setIsModalVisible} : {isModalVisible: boolean ; setIsModalVisible: (b: boolean)=>void ;}) => {
    return(
        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView style={styles.ScrollView}>
                        <View style={styles.ScrollViewInfoContainer}>
                            <View style={{width: width*0.6, marginTop: 20, paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title1']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/long_press_example.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['resultPage']['content1']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title2']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/save_result_example.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['content2']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title3']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/overall_example.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center", marginBottom: 10}} >
                                    {info['resultPage']['content3-1']}
                                </Text>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['resultPage']['content3-2']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title4']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/genetics_example.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center", marginBottom: 10}} >
                                    {info['resultPage']['content4-1']}
                                </Text>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['resultPage']['content4-2']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title5']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/current_example.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center", marginBottom: 10}} >
                                    {info['resultPage']['content5-1']}
                                </Text>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['resultPage']['content5-2']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['resultPage']['title6']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/photo_example.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center", marginBottom: 10}} >
                                    {info['resultPage']['content6-1']}
                                </Text>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['resultPage']['content6-2']}
                                </Text>
                            </View>
                            
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>{setIsModalVisible(false);}} activeOpacity={0.3}>
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const ResultPage = ({userCardAnswer, scanResult, setShowResult} : {userCardAnswer: Array<number> ; scanResult: [string, number] ; setShowResult: (b: boolean)=>void ;}) => {
    const cardResult = ScoreCalculator(userCardAnswer);
    const opacity = useSharedValue(0);
    const overallValue = useSharedValue(0);
    const [displayValue, setDisplayValue] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const pumpingIcon = useSharedValue(1);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        pumpingIcon.value = withRepeat(
          withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }), 
          -1,
          true
        );
    }, []);

    const PumpingIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: pumpingIcon.value }]
        };
    });

    useEffect(() => {
        overallValue.value = withTiming(scanResult[1] != -1 ? parseFloat(((cardResult[1]+scanResult[1])/2).toFixed(1)) : cardResult[1], { duration: 600, easing: Easing.out(Easing.exp) });
    }, []);

    useDerivedValue(() => {
        runOnJS(setDisplayValue)(parseFloat((overallValue.value).toFixed(1)));
    }, [overallValue]);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
    }, []);

    const FadeInOutStyle = useAnimatedStyle(() => {
        return { 
           opacity: opacity.value
        };
    });

    const fadeout = () => {
        opacity.value = withTiming(0, { duration: 300 });
    }
    
    return (
        <Animated.View style={[styles.Container, FadeInOutStyle]}>
            <View style={styles.ResultContainer}>

                <ResultInfo isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></ResultInfo>

                <View style={{width: width*0.9, height: width*0.9, backgroundColor: "white", borderRadius: 30, borderWidth: 10, borderColor: ThemeColors['babyBlue']}}>
                    <TouchableOpacity onPress={()=>setIsModalVisible(true)} style={{height: width*0.1, width: width*0.1, borderRadius: 20, backgroundColor: ThemeColors['babyBlue'], alignItems: "center", justifyContent: "center", flexDirection: "row", position: "absolute", right: 5, top: 5, opacity: 0.4}}>
                        <Ionicons name="information-circle-outline" size={RFPercentage(4)} color={ThemeColors['aquamarine']}></Ionicons>
                    </TouchableOpacity>
                    <View style={{flex: 5, alignItems: "center"}}>
                        <View style={{flex: 2, alignItems: "center", justifyContent: "flex-end"}}>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(5)}}>
                                Overall
                            </Text>
                        </View>
                        <View style={{flex: 3, flexDirection: "row", alignItems: "flex-end", paddingBottom: 10}}>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(12)}}>
                                {displayValue}
                            </Text>
                            <Text style={{fontFamily: "MerriweatherBold", fontSize: RFPercentage(4), marginLeft: 10, marginBottom: 15}}>
                                %
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 2, alignItems: "center", justifyContent: "center", flexDirection: "row", paddingHorizontal: 10}}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(1.8)}}>
                                Genetics
                            </Text>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(3.8)}}>
                                {cardResult[0]}%
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(1.8)}}>
                                Current
                            </Text>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(3.8)}}>
                                {cardResult[1]}%
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(1.8)}}>
                                Photo
                            </Text>
                            <Text style={{fontFamily: "LibreBaskervilleBold", fontSize: RFPercentage(3.8)}}>
                                {scanResult[1] != -1 ? scanResult[1]+"%" : "N/A"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.CardReview}>    
                <View style={{flex: 1, height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.CardScrollView} contentContainerStyle={{paddingHorizontal: 10}}>
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                            {Array.from({ length: AllCardNum }).map((_, idx) => (
                                <ResultDisplayCard key={idx} userCardAnswer={userCardAnswer} idx={idx} scale={0.35}></ResultDisplayCard>
                            ))}
                            <ScanDisplayCard scale={0.35} scanResult={scanResult}></ScanDisplayCard>
                        </View>
                    </ScrollView>
                </View>
                <AnimatedIonicons name="caret-back-outline" size={RFPercentage(10)} color={ThemeColors['black']} style={[{position:"absolute", left: 0, opacity: 0.5 }, PumpingIconStyle]}/>
                <AnimatedIonicons name="caret-forward-outline" size={RFPercentage(10)} color={ThemeColors['black']} style={[{position:"absolute", right: 0, opacity: 0.5 }, PumpingIconStyle]} />
            </View>
            <View style={styles.BottomContainer}>
                <View style={{flex: 1, height: "100%", alignItems: "flex-start", justifyContent: "center", flexDirection: "row"}}>
                    <LinearGradient colors={["#F8F8F8", "#C0C0C0", "#ECECEC", "#FFFFFF"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={[styles.BottomButtonGradientContainer]}>
                        <TouchableOpacity disabled={saved} onPress={()=>{setSaved(true); saveResult(cardResult, userCardAnswer, scanResult);}} style={[styles.BottomButtonContainer, {backgroundColor: "#ffffff"}]}>
                            <LinearGradient colors={["#FFFFFF", "#C0C0C0", "#ECECEC"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={styles.BottomButtonContainer}>
                                <Ionicons name={saved ? "checkmark-circle-outline" : "folder-open-outline"} size={RFPercentage(2)} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherBoldItalic", color: ThemeColors['black']}}>
                                    {saved ? "Saved" : "Save Result"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{flex: 1, height: "100%", alignItems: "flex-start", justifyContent: "center", flexDirection: "row"}}>
                    <LinearGradient colors={[ThemeColors['babyBlue'], ThemeColors['babyBlue']]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={[styles.BottomButtonGradientContainer]}>
                        <TouchableOpacity onPress={()=>{fadeout(); setTimeout(()=>setShowResult(true), 300)}} style={[styles.BottomButtonContainer, {backgroundColor: "#ffffff"}]}>
                            <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={styles.BottomButtonContainer}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBoldItalic", marginLeft: 10, color: ThemeColors['black']}}>
                                    Next
                                </Text>
                                <Ionicons name="chevron-forward-outline" size={RFPercentage(2.3)} color={ThemeColors['black']} style={{}} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Animated.View>
    );
};

export default ResultPage;

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ThemeColors['white']
    },
    ResultContainer: {
        flex: 3,
        width: width,
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "row",
    },
    CardScrollView: {
        flex: 1,
        width: width,
        height: '100%',
    },
    CardReview: {
        flex: 2,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    BottomContainer: {
        flex: 1, 
        width: width, 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "row"
    },
    BottomButtonContainer: {
        width: width*0.35-10, 
        height: height*0.07-10, 
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 100,
    },
    BottomButtonGradientContainer: {
        width: width*0.35, 
        height: height*0.07, 
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    modalContent: {
        width: width*0.8,
        backgroundColor: ThemeColors['white'],
        borderRadius: 20,
        padding: 10,
        elevation: 5,
    },
    ScrollView: {
        height: height*0.6,
        backgroundColor: ThemeColors['border'],
        borderRadius: 20
    },
    ScrollViewInfoContainer: {
        alignItems: "center",
        paddingHorizontal: 30,
    },
    closeButton: {
        padding: 10,
        backgroundColor: "#d0e5d0",
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        fontSize: RFPercentage(1.8),
        fontFamily: "MerriweatherBoldItalic", 
        color: ThemeColors['black']
    },
  });