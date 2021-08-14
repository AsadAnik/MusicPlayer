import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Color from '../misc/Color';

// Component..
const AudioListItem = ({ title, duration, onOptionPress }) => {

    // to get song names first letter..
    const getThumbnailText = (filename) => filename[0];

    // to convert into standard time..
    const convertTime = (minutes) => {
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

    // Returning statement..
    return (
        <>
            <View style={styles.container}>
                {/* Icon and Title side.. */}
                <View style={styles.leftContainer}>
                    <View style={styles.thumbnail}>
                        <Text style={styles.thumbnailText}>{getThumbnailText(title)}</Text>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={styles.title}>{title}</Text>
                        <Text style={styles.timeText}>{convertTime(duration)}</Text>
                    </View>
                </View>

                {/* Options Dot side.. */}
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={onOptionPress}>
                        <Entypo
                            name="dots-three-vertical"
                            size={20}
                            color={Color.FONT_MEDIUM}
                            style={{padding: 10}}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.separator} />
        </>
    );
};

// Screens Dimention..
const { width } = Dimensions.get('window');

// Stylesheet..
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
        // backgroundColor: 'red'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        backgroundColor: Color.FONT_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50 / 2,
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.FONT
    },
    titleContainer: {
        width: width - 180,
        paddingLeft: 10
    },
    title: {
        fontSize: 16,
        color: Color.FONT,
    },
    timeText: {
        fontSize: 14,
        color: Color.FONT_LIGHT
    },
    separator: {
        width: width - 80,
        backgroundColor: '#333',
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    }
});

export default AudioListItem;