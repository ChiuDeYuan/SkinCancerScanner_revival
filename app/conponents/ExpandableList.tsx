import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Modal,
    FlatList,
    Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');
const cardWidth = width*0.8;
const cardHeight = height*0.75;

const info = require('../constants/information_basic.json');
const ThemeColors = require('../constants/colors.json');

const ExpandableList = ({nowCard, setFinishQuestion, sendAnswer, addAnswer}:{nowCard: number ; setFinishQuestion: (f: boolean)=>void ; sendAnswer: boolean ; addAnswer: (a: any)=>void}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    
    const options = info['diagnosis'][nowCard]['choices'];
  
    const handleSelectItem = (index: number) => {
      console.log(index);
      setSelectedItem(index);
      setIsModalVisible(false);
      setFinishQuestion(true);
    };

    useEffect(()=>{
      if(sendAnswer && selectedItem != null){
        addAnswer(selectedItem);
        setSelectedItem(null);
      }
    }, [sendAnswer])
  
    return (
      <View style={styles.container}>
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
  
  export default ExpandableList

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectBox: {
      width: cardWidth-100,
      height: 40,
      backgroundColor: ThemeColors['white'],
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 1,
      borderColor: ThemeColors['border'],
      paddingHorizontal: 20
    },
    selectedText: {
      fontSize: RFPercentage(1.8),
      fontFamily: "MerriweatherBold", 
      color: ThemeColors['navyBlue']
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    modalContent: {
      width: cardWidth-10,
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
  });