import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Color from '../misc/Color';


const PlayerButton = ({ iconType, size=40, iconColor=Color.FONT, onPress, ...otherProps }) => {
    // get icons for reusable component..
    const getIconName = (type) => {
        switch (type){
            case "PLAY":
                return 'pause-circle';
            case "PAUSE":
                return 'play-circle';
            case "NEXT":
                return 'forward';
            case "PREV":
                return 'backward';
        }
    };

    // returning statement..
     return (
         <FontAwesome
            name={getIconName(iconType)}
            onPress={onPress}
            size={size}
            color={iconColor}
            {...otherProps}
         />
     );
};

export default PlayerButton;
