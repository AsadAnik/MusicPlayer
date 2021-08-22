import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionsModal from '../components/OptionsModal';
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/AudioControllers';

// Component..
class AudioList extends React.PureComponent {
    // static of context instance..
    static contextType = AudioContext;

    // Constructor method..
    constructor(props) {
        super(props);

        this.state = { optionsModalVisibility: false };
        this.currentItem = {};
    }

    handleAudioPress = async(audio) => {
        // data from context..
        const { playbackObj, soundObj, currentAudio } = this.context.audioListData;
        const { audioFiles } = this.context;
        const { updateState } = this.context;

        // play music first time..
        if (soundObj === null){
            console.log('Pressed to Play!');
            const playbackObj = new Audio.Sound();
            const status = await play(playbackObj, audio.uri);
            const index = audioFiles.indexOf(audio);

            return updateState(this.context.audioListData, {
                playbackObj,
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentIndex: index
            });
        }

        // pause music..
        if (soundObj.isPlaying && soundObj.isLoaded && soundObj.shouldPlay && currentAudio.id === audio.id){
            console.log('Pressed to Pause!');
            const status = await pause(playbackObj);

            return updateState(this.context.audioListData, {
                soundObj: status,
                isPlaying: false
            });
        }

        // resume music..
        if (!soundObj.isPlaying && !soundObj.shouldPlay && currentAudio.id === audio.id){
            console.log('Pressed to Resume!');
            const status = await resume(playbackObj);

            return updateState(this.context.audioListData, {
                soundObj: status,
                isPlaying: true
            });
        }

        // select & play next music..
        if (soundObj.isLoaded && currentAudio.id !== audio.id){
            const status = await playNext(playbackObj, audio.uri);
            const index = audioFiles.indexOf(audio);

            return updateState(this.context.audioListData, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentIndex: index
            });
        }

    }


    // to render audio list..
    renderItem = ({ item, index }) => (
        <AudioListItem
            title={item.filename}
            duration={item.duration}
            activeListItem={this.context.audioListData.currentIndex === index}
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
