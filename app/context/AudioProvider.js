import React, { Component, createContext } from 'react';
import { Alert, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

// React Context..
export const AudioContext = createContext();


// Component..
class AudioProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        };
    }

    // Lifecycle..
    componentDidMount() {
        this.getPermission();
    }

    // Permission Alert Method..
    permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files!", [{
            text: 'I\'m ready',
            onPress: () => this.getPermission()
        }, {
            text: 'Cancel',
            onPress: () => this.permissionAlert()
        }]);
    };


    // Get Files method..
    getAudioFiles = async () => {
        const { dataProvider, audioFiles } = this.state;

        let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });

        // get all of audios without limitation..
        media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio', first: media.totalCount });

        // console.log(media.assets);
        this.setState({ 
            ...this.state, 
            dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), 
            audioFiles: [...audioFiles, ...media.assets]
        });
    };

    // Get Permission method..
    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            // get all  the audio files..
            this.getAudioFiles();
        }

        if (!permission.granted && !permission.canAskAgain) {
            // display error when not any permission..
            this.setState({ ...this.state, permissionError: true });
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

            if (status === 'denied' && canAskAgain) {
                // display alert to must allow permission..
                this.permissionAlert();
            }

            if (status === 'granted') {
                // all the audio files..
                this.getAudioFiles();
            }

            if (status === 'denied' && !canAskAgain) {
                // display error to user..
                this.setState({ ...this.state, permissionError: true });
            }
        }
    };

    // render method..
    render() {
        const { permissionError, audioFiles, dataProvider } = this.state;

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
            return <Text>Loading...</Text>;

        } else {
            // Otherwise finally AudioProvider..
            return (
                <AudioContext.Provider value={{ audioFiles, dataProvider }}>
                    {this.props.children}
                </AudioContext.Provider>
            );
        }
    }
}

export default AudioProvider;