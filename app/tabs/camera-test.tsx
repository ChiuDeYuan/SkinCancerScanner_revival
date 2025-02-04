import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const CameraTestScreen = () => {
    const [image, setImage] = useState<string | null>(null);

    const openRoll = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result != null && !result.canceled) {
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);
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
          setImage(result.assets[0].uri);
        }
    }

    const uploadImage = async () => {
        const formData = new FormData();
        const blob = await (await fetch(image!)).blob();
        console.log(blob);
        formData.append('image', blob, 'image.jpg');
        var testData = {data:'test'};

        fetch('http://116.241.64.125:8080/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(testData),
        })
        .then(response => response.json())
        .then( data => console.log(data))
        .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <View style={styles.photoFrame}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <Button title="camera" onPress={openCamera} />
            <Button title="camera roll" onPress={openRoll} />
            <Button title="OK" onPress={uploadImage} />
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