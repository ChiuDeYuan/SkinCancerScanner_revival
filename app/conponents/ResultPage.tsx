import { View, Text, StyleSheet, Button, Image, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ThemeColors = require('../constants/colors.json')

const ResultPage = () => {
    
    return (
        <View style={styles.Container}>
            
        </View>
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
      backgroundColor: "red"
    },
    
  });