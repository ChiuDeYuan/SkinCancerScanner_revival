import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as ImageManipulator from 'expo-image-manipulator'
;
import uploadImage from '../tools/networking';

const { width, height } = Dimensions.get('window');

const CameraTestScreen = () => {
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
        <View style={styles.container}>
            <View style={styles.photoFrame}>
                {image && <Image source={{ uri: image[0] }} style={styles.image} />}
            </View>
            <Button title="camera" onPress={openCamera} />
            <Button title="camera roll" onPress={openRoll} />
            <Button title="Predict" onPress={() => uploadImage(image![1])} />
        </View>
    );
};

export default CameraTestScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoFrame: {
        padding: 10,
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
    },
    image: {
        width: width * 0.9,
        height: width * 0.9,
        borderRadius: 30,
    },
  });