import {StyleSheet, Dimensions} from "react-native";
import Color from "./Color";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
