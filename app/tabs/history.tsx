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
import { get, deleteData, save } from '../tools/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, useDerivedValue, runOnJS, Easing } from 'react-native-reanimated';
import ReviewPage from '../conponents/ReviewPage';

const ThemeColors = require('../constants/colors.json');
const { width, height } = Dimensions.get('window');

const SavedData = ({ dataKey, deleteSavedData, setReview, fadeout }: { dataKey: string; deleteSavedData: (d: string) => void; setReview: (o: object) => void ; fadeout: ()=>void}) => {

  const date = new Date(dataKey);
  const [data, setData] = useState(null);

  useEffect(() => {
    get(dataKey)
      .then(response => {
        if (response != null) {
          setData(response);
        }
      })
      .catch(e => console.log(e));
  }, []);

  const setStar = (enabled: boolean) => {
    save(dataKey, { userCardAnswer: data!['userCardAnswer'], scanResult: data!['scanResult'], cardResult: data!['cardResult'], star: enabled });
    get(dataKey)
      .then(response => {
        if (response != null) {
          setData(response);
        }
      });
  }

  return (
    <View style={styles.SavedData}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
        <TouchableOpacity onPress={() => setStar(!data!['star'])}>
          <Ionicons name="star" size={RFPercentage(2.5)} color={(data && data['star']) ? "#E4D00A" : ThemeColors['black']} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
        <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.5) }}>
          {`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
        </Text>
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
        <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8) }}>
          {data ? (data['scanResult'][1] == -1 ? data['cardResult'][1] : (data['scanResult'][1] + data['cardResult'][1]) / 2) + "%" : "null"}
        </Text>
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
        <TouchableHighlight underlayColor={ThemeColors['babyBlue']} onPress={() => {fadeout(); setTimeout(()=>setReview(data!), 200)}} style={{ padding: 5, backgroundColor: ThemeColors['aquamarine'], borderRadius: 5, elevation: 3 }}>
          <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['white'], fontSize: RFPercentage(1.8) }}>
            Review
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%" }}>
        <TouchableHighlight onPress={() => deleteSavedData(dataKey)} style={{ padding: 5, backgroundColor: "#b20000", borderRadius: 5, elevation: 3 }}>
          <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['white'], fontSize: RFPercentage(1.8) }}>
            Delete
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const DataTable = ({ setReview }: { setReview: (o: object) => void }) => {

  const [savedKey, setSavedKey] = useState<Array<string>>([]);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const FadeInOutStyle = useAnimatedStyle(() => {
    return { 
      opacity: opacity.value
    };
  });

  const fadeout = () => {
    opacity.value = withTiming(0, { duration: 200 });
  }

  useEffect(() => {
    updateData();
  }, [])

  const updateData = async () => {
    get('savedData')
      .then(
        response => {
          if (response != null) {
            setSavedKey(response);
          }
          else {
            setSavedKey([]);
          }
        }
      )
      .catch(e => console.log(e));
  }

  const deleteSavedData = async (tar: string) => {
    await save('savedData', savedKey.filter(element => element !== tar));
    await updateData();
  }


  return (
    <Animated.View style={[styles.Container, FadeInOutStyle]}>
      <ImageBackground source={require('../../assets/images/background/spot_background_yellow.png')} resizeMode='cover' style={{ flex: 1, width: "100%", height: "100%" }} imageStyle={{ opacity: 0.15 }}>
        <View style={styles.TitleContainer}>
          <View style={styles.Title}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
              <Ionicons name="star-outline" size={RFPercentage(2.5)} color={ThemeColors['black']} />
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
              <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8) }}>
                Date
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
              <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8) }}>
                Overall
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%", borderRightWidth: 1, borderColor: ThemeColors['border'] }}>
              <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8) }}>
                Review
              </Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: "row", width: "100%", height: "80%" }}>
              <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(1.8) }}>
                Delete
              </Text>

            </View>
          </View>
        </View>
        <View style={styles.DataListContainer}>
          <ScrollView fadingEdgeLength={10} showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
            <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
              {savedKey.map((element, _) => (
                <SavedData key={element} setReview={setReview} dataKey={element} deleteSavedData={deleteSavedData} fadeout={fadeout}/>
              ))}
            </View>
          </ScrollView>
          <TouchableHighlight underlayColor={ThemeColors['aquamarine']} onPress={() => updateData()} style={{ position: "absolute", bottom: 20, width: width - 20, alignItems: "center", justifyContent: "center", flexDirection: "row", backgroundColor: ThemeColors['babyBlue'], padding: 10, borderRadius: 30, borderWidth: 3, borderColor: "#FFFFFF" }}>
            <>
              <Ionicons name="refresh-outline" size={RFPercentage(2)} color={ThemeColors['black']} />
              <Text style={{ fontFamily: "MerriweatherRegular", color: ThemeColors['black'], fontSize: RFPercentage(2) }}>
                Refresh
              </Text>
            </>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const HistoryScreen = () => {

  const [review, setReview] = useState<object | null>(null);

  return review ? <ReviewPage setReview={setReview} userCardAnswer={review['userCardAnswer']} scanResult={review['scanResult']}></ReviewPage> : <DataTable setReview={setReview}></DataTable>

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
    height: height * 0.1 - 20,
    width: width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
    marginVertical: 5
  }
});