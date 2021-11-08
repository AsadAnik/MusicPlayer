import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Screen from '../components/Screen';
import Color from '../misc/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from "../components/PlayerButton";
import { AudioContext } from '../context/AudioProvider';

const { width } = Dimensions.get('window');

// Player component..
const Player = () => {
    // using Context data..
    const context = useContext(AudioContext);
    const { currentIndex, currentAudio, isPlaying, playbackPosition, playbackDuration } = context.audioListData;

    // console.log('From Player: ', playbackPosition, playbackDuration);

    // calculate and manages seekbar..
    const calculateSeekBar = () => {
        if (playbackPosition !== null && playbackDuration !== null){
            return playbackPosition / playbackDuration;
        }
        return 0;
    };

    // returning statement..
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{`${currentIndex + 1} / ${context.totalAudioCount}`}</Text>

                <View style={styles.midBannerContainer}>
                    <MaterialCommunityIcons
                        name="music-circle"
                        size={300}
                        color={isPlaying ? Color.ACTIVE_BG : Color.FONT_MEDIUM}
                        style={isPlaying && styles.activePlay}
                    />
                </View>

                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>{currentAudio.filename}</Text>

                    <Slider
                        style={{ width: width, height: 40 }}
                        value={calculateSeekBar()}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={Color.FONT_MEDIUM}
                        maximumTrackTintColor={Color.ACTIVE_BG}
                    />

                    <View style={styles.audioControllers}>
                        <PlayerButton iconType={'PREV'} />
                        <PlayerButton iconType={isPlaying ? 'PLAY' : 'PAUSE'} style={{marginHorizontal: 15}} />
                        <PlayerButton iconType={'NEXT'} />
                    </View>
                </View>
            </View>
        </Screen>
    );
};

// Stylesheet..
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    audioCount: {
        textAlign: 'right',
        padding: 15,
        color: Color.FONT_LIGHT
    },
    midBannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    audioTitle: {
        fontSize: 16,
        color: Color.FONT,
        padding: 15
    },
    audioControllers: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
    }
});

export default Player;
