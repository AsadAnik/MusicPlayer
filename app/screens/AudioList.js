import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionsModal from '../components/OptionsModal';
import { Audio } from 'expo-av';
import { play, pause, resume } from '../misc/AudioControllers';

// Component..
class AudioList extends React.PureComponent {
    // static of context instance..
    static contextType = AudioContext;

    // Constructor method..
    constructor(props) {
        super(props);

        this.state = {
            optionsModalVisibility: false,
            playbackObj: null,
            soundObj: null,
            currentAudio: {}
        };

        this.currentItem = {};
    }

    handleAudioPress = async(audio) => {
        // play music first time..
        if (this.state.soundObj === null){
            console.log('Pressed to Play!');
            const playbackObj = new Audio.Sound();
            const status = await play(playbackObj, audio.uri);

            return this.setState({
                ...this.state,
                playbackObj,
                soundObj: status,
                currentAudio: audio
            });
        }

        // pause music..
        if (this.state.soundObj.isPlaying && this.state.soundObj.isLoaded && this.state.soundObj.shouldPlay){
            console.log('Pressed to Pause!');
            const status = await pause(this.state.playbackObj);

            return this.setState({
                ...this.state,
                soundObj: status
            });
        }

        // resume music..
        if (!this.state.soundObj.isPlaying && !this.state.soundObj.shouldPlay && this.state.currentAudio.id === audio.id){
            console.log('Pressed to Resume!');
            const status = await resume(this.state.playbackObj);

            return this.setState({
                ...this.state,
                soundObj: status
            });
        }
    }


    // to render audio list..
    renderItem = ({ item }) => (
        <AudioListItem
            title={item.filename}
            duration={item.duration}
            onAudioPress={() => this.handleAudioPress(item)}
            onOptionPress={() => {
                this.currentItem = item;
                this.setState({...this.state, optionsModalVisibility: true});
            }}
        />
    );


    // Render method..
    render() {
        const listData = this.context.audioFiles;
        // console.log(listData);

        return (
            <Screen>
                <SafeAreaView style={{ flex: 1 }}>
                    {/* FlatList */}
                    <FlatList
                        data={listData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />

                    {/* Modal View */}
                    <OptionsModal
                        currentItem={this.currentItem}
                        visibility={this.state.optionsModalVisibility}
                        onClose={() => {
                            this.setState({
                                ...this.state,
                                optionsModalVisibility: false
                            });
                        }}
                        onPlayPress={() => console.log('Playing Music!')}
                        onPlayListPress={() => console.log('Opening PlayList!')}
                    />
                </SafeAreaView>
            </Screen>
        );
    }
}


export default AudioList;
