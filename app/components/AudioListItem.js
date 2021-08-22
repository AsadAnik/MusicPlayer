import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Color from '../misc/Color';
import { styles } from '../misc/Styles';
import { AudioContext } from '../context/AudioProvider';


// Component..
class AudioListItem extends Component {

    // context for testing one thing..
    static contextType = AudioContext;

    // Constructor..
    constructor(props) {
        super(props);
    }

    /**
     * To Solve slowdown applications list rendering re-rendering issue..
     **/
    shouldComponentUpdate() {
        return false;
    }

    getThumbnailText = (filename) => filename[0];

    // Convert time into human readable format..
    convertTime = (minutes) => {
        if (minutes) {
            const hrs = minutes / 60;
            const minute = hrs.toString().split('.')[0];
            const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
            const sec = Math.ceil((60 * percent) / 100);

            if (parseInt(minute) < 10 && sec < 10) {
                return `0${minute}:0${sec}`;
            }

            if (parseInt(minute) < 10) {
                return `0${minute}:${sec}`;
            }

            if (sec < 10) {
                return `${minute}:0${sec}`;
            }

            return `${minute}:${sec}`;
        }
    }

    // rendering lists music icons..
    renderPlayPauseIcon = (isPlaying) => {
        if (!isPlaying) return ( <Entypo name="controller-play" size={24} color={Color.ACTIVE_FONT} /> );
        return ( <Entypo name="controller-paus" size={24} color={Color.ACTIVE_FONT} /> );
    };


    // render method..
    render() {
        const { title, duration, onOptionPress, onAudioPress, activeListItem } = this.props;
        const { isPlaying } = this.context.audioListData;

        // console.log('Rendered');

        // Returning statement..
        return (
            <>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={onAudioPress}>
                        {/* Icon and Title side.. */}
                        <View style={styles.leftContainer}>
                            <View style={[styles.thumbnail, { backgroundColor: !activeListItem ? Color.FONT_LIGHT : Color.ACTIVE_BG }]}>
                                <Text style={styles.thumbnailText}>
                                    { activeListItem ? this.renderPlayPauseIcon(isPlaying) : this.getThumbnailText(title) }
                                </Text>
                            </View>

                            <View style={styles.titleContainer}>
                                <Text numberOfLines={1} style={[styles.title, { color: !activeListItem ? Color.FONT : 'purple' }]}>{title}</Text>
                                <Text style={styles.timeText}>{this.convertTime(duration)}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* Options Dot side.. */}
                    <View style={styles.rightContainer}>
                        <TouchableOpacity onPress={onOptionPress}>
                            <Entypo
                                name="dots-three-vertical"
                                size={20}
                                color={Color.FONT_MEDIUM}
                                style={{ padding: 10 }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.separator} />
            </>
        );
    }
}



export default AudioListItem;
