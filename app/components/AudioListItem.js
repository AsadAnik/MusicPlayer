import React, {Component} from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Color from '../misc/Color';
import { styles } from '../misc/Styles';


// Component..
class AudioListItem extends Component{
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


    // render method..
    render(){
        const { title, duration, onOptionPress } = this.props;


        console.log('Rendered');

        // Returning statement..
        return (
            <>
                <View style={styles.container}>
                    {/* Icon and Title side.. */}
                    <View style={styles.leftContainer}>
                        <View style={styles.thumbnail}>
                            <Text style={styles.thumbnailText}>{this.getThumbnailText(title)}</Text>
                        </View>

                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>{title}</Text>
                            <Text style={styles.timeText}>{this.convertTime(duration)}</Text>
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
    }
}



export default AudioListItem;
