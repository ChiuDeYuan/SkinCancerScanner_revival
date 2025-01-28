import { View, Text, StyleSheet, Button } from 'react-native';

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Intro Screen</Text>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});