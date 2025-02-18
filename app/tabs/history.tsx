import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ImageBackground, 
  Dimensions, 
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
 } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from 'react-native-responsive-fontsize';
import { get, deleteData } from '../tools/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

const ThemeColors = require('../constants/colors.json');
const { width, height } = Dimensions.get('window');

const getData = async () =>{
  get('savedData')
  .then(response=>{
    if(response){
      response.forEach(element => {
        get(element)
        .then(response=>console.log(typeof(response)))
        .catch(e=>console.log("Error:", e));
    });
    }
  })
  .catch(e=>console.log("Error:", e))
}

const clearData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('所有 AsyncStorage 資料已清除');
  } catch (error) {
    console.error('清除 AsyncStorage 失敗:', error);
  }
}

const SavedData = ({dataKey}:{dataKey: string}) => {

  const date = new Date(dataKey);
  const [star, setStar] = useState(false);

  return(
    <View style={styles.SavedData}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
        <TouchableOpacity onPress={()=>setStar(!star)}>
          <Ionicons name="star" size={RFPercentage(2.5)} color={star ? "#E4D00A" : ThemeColors['black']} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
        <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8)}}>
          {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
        </Text>
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
        <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8)}}>
           45.4%
        </Text>
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
        <TouchableHighlight style={{padding: 5, backgroundColor: ThemeColors['aquamarine'], borderRadius: 5}}>
          <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['white'], fontSize: RFPercentage(1.8)}}>
            Review
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%"}}>
        <TouchableHighlight style={{padding: 5, backgroundColor: "#b20000", borderRadius: 5}}>
            <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['white'], fontSize: RFPercentage(1.8)}}>
              Delete
            </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const HistoryScreen = () => {
  return (
    <View style={styles.Container}>
      <ImageBackground source={require('../../assets/images/content/spot_background_yellow.png')} resizeMode='cover' style={{flex: 1, width: "100%", height: "100%"}} imageStyle={{opacity: 0.15}}>
        <View style={styles.TitleContainer}>
          <View style={styles.Title}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
              <Ionicons name="star" size={RFPercentage(2.5)} color={ThemeColors['black']} />
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
              <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8)}}>
                          Date
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
              <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8)}}>
                          Overall
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
              <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8)}}>
                          Review
              </Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%"}}>
              <Text style={{fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8)}}>
                          Delete
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.DataListContainer}>
          <ScrollView showsVerticalScrollIndicator={false} style={{width: "100%"}}>
            <View style={{flex: 1, width: "100%", alignItems: "center"}}>
              <SavedData dataKey={"2025-02-18T14:19:14.197Z"}></SavedData>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    elevation: 10
  },
  Title: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    backgroundColor: ThemeColors['white'],
    borderRadius: 10,
    elevation: 5
  },
  DataListContainer: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    paddingBottom: 10
  },
  SavedData: {
    height: height*0.1-20, 
    width: width-20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
    marginVertical: 5
  }
});