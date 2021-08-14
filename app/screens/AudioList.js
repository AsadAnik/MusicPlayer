import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionsModal from '../components/OptionsModal';


// Component..
class AudioList extends React.PureComponent {
    // static of context instance..
    static contextType = AudioContext;

    // Constructor method..
    constructor(props) {
        super(props);

        this.state = {
            optionsModalVisibility: false,
        };

        this.currentItem = {};
    }

    // to render audio list..
    renderItem = ({ item }) => (
        <AudioListItem
            title={item.filename}
            duration={item.duration}
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