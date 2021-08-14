import React from 'react';
import { View, Text, StyleSheet, Modal, StatusBar, TouchableWithoutFeedback } from 'react-native';
import Color from '../misc/Color';


// Modal Component..
const OptionsModal = ({ visibility, onClose, currentItem, onPlayPress, onPlayListPress }) => {
    const { filename } = currentItem;

    return (
        <>
            {/* Hide the statusBar */}
            <StatusBar hidden />

            {/* Accual Modal */}
            <Modal visible={visibility} transparent animationType={'slide'}>
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>{filename}</Text>

                    <View style={styles.optionContainer}>
                        <TouchableWithoutFeedback onPress={onPlayPress}>
                            <Text style={styles.option}>Play</Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={onPlayListPress}>
                            <Text style={styles.option}>Add to Playlist</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                {/* close Modal when press on modalBG outside of options */}
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBG} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};


// Stylesheet..
const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: Color.FONT_MEDIUM
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.FONT,
        paddingVertical: 10,
        letterSpacing: 1
    },
    modalBG: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Color.MODAL_BG,
    }
});

export default OptionsModal;