import { View, Text, StyleSheet, Button } from 'react-native';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>History Screen</Text>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});