import React from 'react';
import { Text, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';

class AudioList extends React.Component {
    static contextType = AudioContext;

    // LayoutProvider..
    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case 'audio':
                dim.with = Dimensions.get('window').width;
                dim.height = 70;
                break;

            default:
                dim.width = 0;
                dim.height = 0;
        }
    });

    rowRenderer = (type, item) => {
        return <Text>{item.filename}</Text>;
    };

    // Render method..
    render() {
        // console.log(this.context);
        return (
            <AudioContext.Consumer>
                {({ dataProvider }) => {
                    return (
                        <RecyclerListView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ margin: 3 }}
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                        />
                    );
                }}
            </AudioContext.Consumer>
        );
    }
}


export default AudioList;