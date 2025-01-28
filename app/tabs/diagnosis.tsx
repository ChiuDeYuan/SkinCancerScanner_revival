import { View, Text, StyleSheet, Button } from 'react-native';

const DiagnosisScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Diagnosis Screen</Text>
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