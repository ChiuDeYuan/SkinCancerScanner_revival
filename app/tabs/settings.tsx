import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    FlatList,
    Switch
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { clearStorage } from '../tools/storage';

const { width, height } = Dimensions.get('window');
const ThemeColors = require('../constants/colors.json');
const info = require('../constants/information_basic.json');

const SettingsList = ({item} : {item: object}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    
    const options = item['options'];
  
    const handleSelectItem = (index: number) => {
      setSelectedItem(index);
      setIsModalVisible(false);
    };

    useEffect(()=>{
      
    }, [])
  
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <TouchableOpacity
          style={styles.selectBox} 
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.selectedText} numberOfLines={1}>
            {selectedItem == null ? "Choose..." : options[selectedItem]}
          </Text>
        </TouchableOpacity>
  
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={( item ) => item}
                renderItem={({ item, index }) => (
                  <TouchableOpacity 
                    style={styles.item} 
                    onPress={() => handleSelectItem(index)}
                  >
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
                activeOpacity={0.3}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
}

const SettingsButton = ({item} : {item: object}) => {
    return (
        <TouchableOpacity
        style={[styles.selectBox, {elevation: 3, backgroundColor: ThemeColors['white']}]} 
        onPress={() => {}}>
            <Text style={styles.selectedText} numberOfLines={1}>
                {item['options'][0]}
            </Text>
        </TouchableOpacity>
      );
}

const SettingSwitch = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#E5E5E5'}
          onValueChange={toggleSwitch}
          value={false}
          disabled={true}
        />
    );
}

const Item = ({ item } : { item: object }) => {
    return(
        <View style={styles.Items}>
            <View style={{flex: 1, height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", borderRightWidth: 1, borderColor: ThemeColors['border']}}>
                <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['black']}}>
                    {item['title']}
                </Text>
            </View>
            <View style={{flex: 1, height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 10}}>
                {
                item['type'] === "list" ? (

                    <SettingsList item={item}></SettingsList>

                ) : 
                
                item['type'] === "button" ? (

                    <SettingsButton item={item}></SettingsButton>

                ) :
                item['type'] === "switch" ? (

                    <SettingSwitch></SettingSwitch>

                ) : (
                    <TouchableHighlight style={styles.Button}>
                    <>
                        <Ionicons name={"refresh-outline"} size={RFPercentage(2)} color={ThemeColors['navyBlue']}></Ionicons>
                        <Text style={{fontSize: RFPercentage(1.8), fontFamily: "MerriweatherRegular", color: ThemeColors['navyBlue']}}>
                            Default
                        </Text>
                    </>
                    </TouchableHighlight>
                )}
            </View>
        </View>
    );
}

const SettingScreen = () => {

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
            <ImageBackground source={require('../../assets/images/background/spot_background_red.png')} resizeMode='cover' style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%", height: "100%"}} imageStyle={{ opacity: 0.15 }}>
                <View style={styles.Container}>
                    
                    <View style={styles.Panel}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: "100%", height: "100%", borderRadius: 25}}>
                            <View style={{flex: 1, width: "100%", height: "100%", alignItems: "center"}}>
                                <Text style={{fontSize: RFPercentage(2.5), fontFamily: "MerriweatherBold", color: ThemeColors['black'], marginVertical: 5}}>
                                    UI
                                </Text>
                                {info['settings']['ui'].map((element, _) => (
                                    <Item key={element['title']} item={element}></Item>
                                ))}
                                <Text style={{fontSize: RFPercentage(2.5), fontFamily: "MerriweatherBold", color: ThemeColors['black'], marginVertical: 5}}>
                                    System
                                </Text>
                                {info['settings']['system'].map((element, _) => (
                                    <Item key={element['title']} item={element}></Item>
                                ))}
                                <Text style={{fontSize: RFPercentage(2.5), fontFamily: "MerriweatherBold", color: ThemeColors['black'], marginVertical: 5}}>
                                    Model
                                </Text>
                                {info['settings']['model'].map((element, _) => (
                                    <Item key={element['title']} item={element}></Item>
                                ))}
                                <Text style={{fontSize: RFPercentage(2.5), fontFamily: "MerriweatherBold", color: ThemeColors['black'], marginVertical: 5}}>
                                    Premium
                                </Text>
                                {info['settings']['premium'].map((element, _) => (
                                    <Item key={element['title']} item={element}></Item>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "100%",
        height: "100%",
        padding: 10,
        alignItems: "flex-end"
    },
    Panel: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(100, 100, 100, 0.15)",
        padding: 10,
        borderRadius: 30,
        alignItems: "center"
    },
    Items: {
        width: "100%",
        height: height*0.1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: ThemeColors['white'],
        padding: 5,
        borderRadius: 25,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: ThemeColors['aquamarine'],
        elevation: 5
    },
    Button: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: ThemeColors['white'],
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: ThemeColors['aquamarine'],
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
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: ThemeColors['border'],
    },
    itemText: {
      fontSize: RFPercentage(1.8),
      fontFamily: "MerriweatherBold", 
      color: ThemeColors['black'],
      lineHeight: 24
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
    selectBox: {
      width: "100%",
      height: "100%",
      backgroundColor: ThemeColors['border'],
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 2,
      borderColor: ThemeColors['aquamarine'],
      paddingHorizontal: 20
    },
    selectedText: {
      fontSize: RFPercentage(1.8),
      fontFamily: "MerriweatherRegular", 
      color: ThemeColors['navyBlue']
    },
});