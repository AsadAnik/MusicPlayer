import React, {useContext, useState} from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { AudioContext } from '../context/AudioProvider.js';
import Screen from '../components/Screen';
import OptionsModal from "../components/OptionsModal";
import AudioListItem from "../components/AudioListItem.js";


// component..
const AudioList = () => {
    // use context..
    const tracks = useContext(AudioContext);
    const { audioFiles } = tracks;

    const [optionsModalVisibility, setOptionsModalVisibility] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    // to render audio list..
    const renderItem = ({ item }) => (
        <AudioListItem
            title={item.filename}
            duration={item.duration}
            onOptionPress={() => {
                setCurrentItem(item);
                setOptionsModalVisibility(true);
            }}
        />
    );

    // return statement..
    return (
        <Screen>
            <SafeAreaView style={{ flex: 1 }}>
                {/* FlatList */}
                <FlatList
                    data={audioFiles}
                    initialNumToRender={7}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

                {/* Modal View */}
                <OptionsModal
                    currentItem={currentItem}
                    visibility={optionsModalVisibility}
                    onClose={() => {
                        setOptionsModalVisibility(false)
                    }}
                    onPlayPress={() => console.log('Playing Music!')}
                    onPlayListPress={() => console.log('Opening PlayList!')}
                />
            </SafeAreaView>
        </Screen>
    );
};

export default AudioList;
