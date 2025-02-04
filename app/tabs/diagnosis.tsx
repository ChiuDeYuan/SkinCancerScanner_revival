import { View, Text, StyleSheet } from 'react-native';
import { Dimensions, TouchableHighlight } from 'react-native';

const FlaskTest = () => {
  fetch('http://116.241.64.125:5000/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

const DiagnosisScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Diagnosis Screen</Text>
      </View>

      <View style={styles.container}>
        <View style={circleStyle.circle}>
          <TouchableHighlight
          style = {{
            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
            width: Dimensions.get('window').width * 0.45,
            height: Dimensions.get('window').width * 0.45,
            backgroundColor:'#ffffff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          underlayColor = '#ccc'
          onPress = { () => FlaskTest() }>
            <Text> Start!! </Text>
          </TouchableHighlight>

        </View>

      </View>
    </View>
  );
};

export default DiagnosisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const circleStyle = StyleSheet.create({
  circle:{
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    backgroundColor:'#10ff10',
    justifyContent: 'center',
    alignItems: 'center'
  }
})