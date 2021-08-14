import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Color from '../misc/Color';

// Component..
const Screen = ({ children }) => {
    return (
        <View style={styles.container}>{ children }</View>
    );
};


// Stylesheet..
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.APP_BG,
        paddingTop: StatusBar.currentHeight
    }
});

export default Screen;