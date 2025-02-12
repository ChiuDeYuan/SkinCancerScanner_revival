import { View, Text, StyleSheet, Button, Image, Dimensions, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import uploadImage from '../tools/networking';

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
                <View style={styles.OuterPhotoFrameContainer}>
                    <View style={styles.InterPhotoFrameContainer}>
                        <TouchableHighlight activeOpacity={1} onPress={()=>{}} style={styles.Touchable}>
                            <View  style={styles.PhotoFrame}>
                                {image && <Image source={{ uri: image[0] }} style={styles.Image} />}
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
                            <Text style={styles.ButtonText}>Choose...</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>openCamera()} style={[styles.Button, {borderColor: ThemeColors['aquamarine'], backgroundColor: 'white'}]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="camera-outline" size={22} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>Camera</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={image==null} underlayColor={ThemeColors['border']} activeOpacity={0.9} onPress={()=>uploadImage(image![1])} style={[styles.Button, {borderColor: image ? ThemeColors['aquamarine'] : ThemeColors['touchable'], backgroundColor: image ? 'white' : '#eee'}]}>
                        <View style={styles.ButtonContent}>
                            <Ionicons name="bar-chart-outline" size={22} color={ThemeColors['black']} style={{marginHorizontal: 5}} />
                            <Text style={styles.ButtonText}>Predict</Text>
                        </View>
                    </TouchableHighlight>
                </View> 
            </View>
            <View style={{flex: 2, width: width, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: "pink"}}>
                <View style={styles.SkipContainer}></View>
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
        padding: 10,
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        opacity: 0.6
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
        resizeMode: "contain",
        width: null,
        height: null,
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
    }
  });