import { View, Text, StyleSheet, Button, Image, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import uploadImage from '../tools/networking';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ThemeColors = require('../constants/colors.json')

const PhotoUpload = () => {
    const [image, setImage] = useState<[string, string] | null>(null);

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
        <View style={styles.Container}>
            <View style={{flex: 5, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <TouchableOpacity style={styles.SkipContainer}>
                    <Text style={{fontFamily: "MerriweatherBold", color: "#777"}}>
                        Skip
                    </Text>
                    <Ionicons name="play-forward-outline" size={20} color={"#777"} style={{marginHorizontal: 5}} />
                </TouchableOpacity>
                <View style={styles.OuterPhotoFrameContainer}>
                    <View style={styles.InterPhotoFrameContainer}>
                        <TouchableHighlight activeOpacity={1} onPress={()=>{openCamera()}} style={styles.Touchable}>
                            <View  style={[styles.PhotoFrame, {opacity: image ? 1 : 0.6}]}>
                                {image && <Image source={{uri: image[0]}} style={styles.Image} />}
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View style={{flex: 2, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <View style={styles.ButtonContainer}>
                    <TouchableHighlight underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>openRoll()} style={[styles.Button, {borderColor: ThemeColors['aquamarine'], backgroundColor: 'white'}]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="image-outline" size={22} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>Choose from roll</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>openCamera()} style={[styles.Button, {borderColor: ThemeColors['aquamarine'], backgroundColor: 'white'}]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="camera-outline" size={22} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>Camera</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={image==null} underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>uploadImage(image![1])} style={[styles.Button, {borderColor: ThemeColors['aquamarine'], backgroundColor: 'white'}]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="hardware-chip-outline" size={22} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>Select Model</Text>
                        </View>
                    </TouchableHighlight>
                </View> 
            </View>
            <View style={{flex: 2, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                <LinearGradient colors={["#AE8625", "#F7EF8A", "#D2AC47", "#EDC967"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={[styles.PredictGradientContainer]}>
                    <TouchableOpacity style={[styles.PredictContainer, {backgroundColor: "#ffffff"}]}>
                        <LinearGradient colors={["#FFFFFF", "#E7CD78", "#FAF9D0"]} start={{ x: 0, y: 0}} end={{ x: 1, y: 1}} style={styles.PredictContainer}>
                            <Ionicons name="sparkles-outline" size={RFPercentage(3)} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={{fontSize: RFPercentage(3), fontFamily: "MerriweatherBoldItalic"}}>
                                Predict
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
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
        position: "absolute",
        bottom: 0,
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
        elevation: 5
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
        color: ThemeColors['black']
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
        position: "absolute",
        top: 60,
        right: 30,
        width: 100,
        height: 40,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: ThemeColors['touchable'],
        backgroundColor: ThemeColors['border'],
        opacity: 0.5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    }
  });