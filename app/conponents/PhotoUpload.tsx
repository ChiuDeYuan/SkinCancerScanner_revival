import { 
    View,
    Text, 
    StyleSheet, 
    Button, 
    Image, 
    Dimensions, 
    TouchableHighlight, 
    TouchableOpacity, 
    Modal,
    FlatList,
    ScrollView
} from 'react-native';
import { useEffect, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import uploadImage from '../tools/networking';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ThemeColors = require('../constants/colors.json');
const info = require('../constants/information_basic.json');
const models = info['scanner']['models'];

const ImagePickerInfo1 = ({isModalVisible, setIsModalVisible, imagePicker} : {isModalVisible: boolean ; setIsModalVisible: (b: boolean)=>void ; imagePicker: ()=>void}) => {
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
                                    {info['scanner']['title']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['title1']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/melanoma_9994.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['scanner']['content1']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24, marginBottom: 20}} >
                                    {info['scanner']['title2']}
                                </Text>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-1']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_a.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-2']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_b.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-3']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_c.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-4']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_d.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-5']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_e.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['title3']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/choose_model.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['scanner']['content3']}
                                </Text>
                            </View>
                            
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>{setIsModalVisible(false); imagePicker();}} activeOpacity={0.3}>
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const ImagePickerInfo2 = ({isModalVisible, setIsModalVisible, imagePicker} : {isModalVisible: boolean ; setIsModalVisible: (b: boolean)=>void ; imagePicker: ()=>void}) => {
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
                                    {info['scanner']['title']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['title1']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/melanoma_9994.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['scanner']['content1']}
                                </Text>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24, marginBottom: 20}} >
                                    {info['scanner']['title2']}
                                </Text>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-1']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_a.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-2']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_b.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-3']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_c.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-4']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_d.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['content2-5']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.45, borderRadius: 20}}>
                                    <Image source={require('../../assets/images/content/abcde_e.png')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                            </View>
                            <View style={{width: width*0.6, paddingVertical: 20, borderBottomWidth: 1, borderColor: ThemeColors['touchable']}}>
                                <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherBold", color: ThemeColors['black'], textAlign: "center", lineHeight:24}} >
                                    {info['scanner']['title3']}
                                </Text>
                                <View style={{width: width*0.6, height: width*0.6, borderRadius: 20, marginVertical: 20}}>
                                    <Image source={require('../../assets/images/content/choose_model.jpg')} style={{flex: 1, width: null, height: null, resizeMode: "contain", borderRadius: 20}} />
                                </View>
                                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black'], lineHeight:24, textAlign: "center"}} >
                                    {info['scanner']['content3']}
                                </Text>
                            </View>
                            
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>{setIsModalVisible(false); imagePicker();}} activeOpacity={0.3}>
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const SelectModel = ({isModalVisible, setIsModalVisible, setModel} : {isModalVisible: boolean ; setIsModalVisible: (b: boolean)=>void ; setModel: (m: number)=>void}) =>{
    return(
        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <FlatList
                    data={models}
                    keyExtractor={( item ) => item}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.item} onPress={() => {setIsModalVisible(false); setModel(index);}}>
                            <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    )}/>
                    <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsModalVisible(false)}
                    activeOpacity={0.3}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const PhotoUpload = ({setScanResult}:{setScanResult: (a: number)=>void}) => {
    const [image, setImage] = useState<[string, string] | null>(null);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [model, setModel] = useState<number | null>(null);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 300 });
        return () => {
            opacity.value = withTiming(0, { duration: 300 });
        };
    }, []);

    const FadeInOutStyle = useAnimatedStyle(() => {
        return { 
           opacity: opacity.value
        };
    });

    const openRoll = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result != null && !result.canceled) {
            resizeImage(result.assets[0].uri!);
        }
    };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
          return;
        }
        
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        
        if (result != null && !result.canceled) {
            resizeImage(result.assets[0].uri!);
        }
    }

    const resizeImage = async (uri: string) => {
        if(!uri) return;
        try{
            const resizedImage = await ImageManipulator.manipulateAsync(
                uri, 
                [{resize: {width: 256, height: 256}}],
                {compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true}
            );
            setImage([uri, resizedImage.base64!]);

        }catch(e){
            console.log("error while resizing image: ", e);
        }
    }

    

    return (
        <Animated.View style={[styles.Container, FadeInOutStyle]}>
            <View style={{flex: 1, width: width, alignItems: "flex-end", justifyContent: "flex-end", paddingHorizontal: width*0.05, paddingBottom: height*0.015}}>
                <TouchableOpacity onPress={()=>{setScanResult(-1)}} style={styles.SkipContainer}>
                    <Text style={{fontFamily: "MerriweatherBold", color: "#777", fontSize: RFPercentage(1.6)}}>
                        Skip
                    </Text>
                    <Ionicons name="play-forward-outline" size={RFPercentage(2.2)} color={"#777"} style={{marginHorizontal: 5}} />
                </TouchableOpacity>
            </View>
            <View style={{flex: 4, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <ImagePickerInfo1 isModalVisible={isModalVisible1} setIsModalVisible={setIsModalVisible1} imagePicker={openRoll}></ImagePickerInfo1>
                <ImagePickerInfo2 isModalVisible={isModalVisible2} setIsModalVisible={setIsModalVisible2} imagePicker={openCamera}></ImagePickerInfo2>
                <SelectModel isModalVisible={isModalVisible3} setIsModalVisible={setIsModalVisible3} setModel={setModel}></SelectModel>
                <View style={styles.OuterPhotoFrameContainer}>
                    <View style={styles.InterPhotoFrameContainer}>
                        <TouchableHighlight activeOpacity={1} onPress={()=>{setIsModalVisible2(true)}} style={styles.Touchable} disabled={!(image==null)}>
                            <View style={[styles.PhotoFrame, {opacity: image ? 1 : 0.6}]}>
                                {image==null ? (
                                    <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                                        <Ionicons name="camera-outline" size={RFPercentage(3)} color={ThemeColors['black']} style={{marginRight: 10}} />
                                        <Text style={{fontSize: RFPercentage(2), fontFamily: "MerriweatherRegular"}}>
                                            Upload Photo
                                        </Text>
                                    </View>
                                ):(
                                    <Image source={{uri: image[0]}} style={styles.Image} />
                                )}
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

            <View style={{flex: 2, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <View style={styles.ButtonContainer}>
                    <TouchableHighlight underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>setIsModalVisible1(true)} style={[styles.Button]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="image-outline" size={RFPercentage(2.5)} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>
                                Choose from roll
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>setIsModalVisible2(true)} style={[styles.Button]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="camera-outline" size={RFPercentage(2.5)} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>
                                Open camera
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>setIsModalVisible3(true)} style={[styles.Button]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="hardware-chip-outline" size={RFPercentage(2.5)} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text numberOfLines={1} style={styles.ButtonText}>
                                {model==null ? "Select Model" : models[model]}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View> 
            </View>

            <View style={{flex: 2, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <LinearGradient colors={(image==null) ? [ThemeColors['touchable'], ThemeColors['touchable']] : ["#AE8625", "#F7EF8A", "#D2AC47", "#EDC967"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={[styles.PredictGradientContainer, {opacity: (image==null) ? 0.4 : 1}]}>
                    <TouchableOpacity onPress={()=>uploadImage(image![1]).then(response=>setScanResult(response))} style={[styles.PredictContainer, {backgroundColor: "#ffffff"}]} disabled={(image==null)}>
                        <LinearGradient colors={(image==null) ? [ThemeColors['border'], ThemeColors['border']] : ["#FFFFFF", "#E7CD78", "#FAF9D0"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={styles.PredictContainer}>
                            <Ionicons name="sparkles-outline" size={RFPercentage(3)} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={{fontSize: RFPercentage(3), fontFamily: "MerriweatherBoldItalic"}}>
                                Predict
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Animated.View>
    );
};

export default PhotoUpload;

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    OuterPhotoFrameContainer: {
        padding: 10,
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: ThemeColors['aquamarine'],
    },
    InterPhotoFrameContainer: {
        width: width * 0.9-6,
        height: width * 0.9-6,
        borderRadius: 40,
        borderWidth: width*0.025-3,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PhotoFrame: {
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },
    Touchable:{
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: ThemeColors['touchable'],
        alignItems: 'center',
        justifyContent: 'center',
    },
    Image: {
        flex: 1,
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: 30
    },
    ButtonContainer: {
        flex: 1,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    Button: {
        flex: 1,
        width: width * 0.9-30,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth: 3,
        elevation: 5,
        borderColor: ThemeColors['aquamarine'], 
        backgroundColor: 'white'
    },
    ButtonContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    ButtonText: {
        fontSize: RFPercentage(2),
        fontFamily: "MerriweatherRegular",
        color: ThemeColors['black'],
        maxWidth: width*0.7
    },
    PredictContainer: {
        width: width*0.5,
        height: height*0.1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 100,
    },
    PredictGradientContainer: {
        position: "absolute",
        top: 5,
        width: width*0.5+12, 
        height: height*0.1+12, 
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    },
    SkipContainer: {
        width: width*0.22,
        height: height*0.05,
        borderRadius: width*0.22,
        borderWidth: 3,
        borderColor: ThemeColors['touchable'],
        backgroundColor: ThemeColors['border'],
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
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
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: ThemeColors['border'],
    },
    itemText: {
      fontSize: RFPercentage(2),
      fontFamily: "MerriweatherBold", 
      color: ThemeColors['black'],
      lineHeight: 24
    },
    ScrollView: {
        height: height*0.6,
        backgroundColor: ThemeColors['border'],
        borderRadius: 20
    },
    ScrollViewInfoContainer: {
        alignItems: "center",
        paddingHorizontal: 30,
    }
  });