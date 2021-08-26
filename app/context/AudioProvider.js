import React, {createContext, useEffect, useState} from "react";
import * as MediaLibrary from 'expo-media-library';
import {Alert, Text, View, ActivityIndicator, StyleSheet} from "react-native";

// Create Context..
export const  AudioContext = createContext();

// Component..
const AudioProvider = (props) => {
    // Hooks..
    const [permissionError, setPermissionError] = useState(false);
    const [audioFiles, setAudioFiles] = useState([]);
    const [audioListData, setAudioListData] = useState({
        playbackObj: null,
        soundObj: null,
        currentAudio: {},
        isPlaying: false,
        currentIndex: null,
        playbackPosition: null,
        playbackDuration: null,
    });
    const [totalAudioCount, setTotalAudioCount] = useState(0);

    // lifecycle hook..
    useEffect(() => {
        getPermission();
    }, []);

    // Update the State data..
    const updateState = (prevState, nextState) => {
        setAudioListData({...prevState, ...nextState});
    };


    // Permission Alert Method..
    const permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files!", [{
            text: 'I\'m ready',
            onPress: () => getPermission()
        }, {
            text: 'Cancel',
            onPress: () => permissionAlert()
        }]);
    };

    // Get Files method..
    const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });

        // get all of audios without limitation..
        media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: media.totalCount });

        // console.log(media.assets);
        setAudioFiles(media.assets);
        setTotalAudioCount(media.totalCount);
    };

    // Get Permission method..
    const getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            // get all  the audio files..
            getAudioFiles();
        }

        if (!permission.granted && !permission.canAskAgain) {
            // display error when not any permission..
            setPermissionError(true);
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

            if (status === 'denied' && canAskAgain) {
                // display alert to must allow permission..
                permissionAlert();
            }

            if (status === 'granted') {
                // all the audio files..
                getAudioFiles();
            }

            if (status === 'denied' && !canAskAgain) {
                // display error to user..
                setPermissionError(true);
            }
        }
    };

    // permission error show..
    if (permissionError) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: '25', textAlign: 'center', color: 'red' }}>It's look like you haven't accept the permission.</Text>
            </View>
        );
    }

    // no audio load then it shows Loading...
    if (audioFiles.length === 0 && !permissionError) {
        return <ActivityIndicator style={styles.loading} size={'large'} color={'blue'} />;

    } else {
        // Otherwise finally AudioProvider..
        return (
            <AudioContext.Provider value={{ audioFiles, audioListData, updateState, totalAudioCount }}>
                {props.children}
            </AudioContext.Provider>
        );
    }
};


// StyleSheet..
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        position: 'absolute',
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    }
});

export default AudioProvider;
