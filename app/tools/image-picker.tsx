import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';