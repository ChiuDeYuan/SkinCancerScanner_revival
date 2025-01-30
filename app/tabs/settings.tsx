import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState, useContext } from 'react';
import { save, get } from '../tools/storage';
import DarkModeContext from '../settings/darkmode-context';

const SettingScreen = () => {
    const {isEnabled, toggleSwitch} = useContext(DarkModeContext);
    console.log(isEnabled);
    console.log(toggleSwitch);
    toggleSwitch();
    console.log(isEnabled);

    return (
        <View style={styles.container}>
            <Text>Dark mode</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled === 'dark' ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onChange={toggleSwitch}
                value={isEnabled === 'dark'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingScreen;