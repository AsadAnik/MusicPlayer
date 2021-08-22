// Play Audio..
const play = async (playbackObj, uri) => {
    try {
        const status = await playbackObj.loadAsync(
            { uri },
            { shouldPlay: true }
        );
        return status;

    } catch (error){
        console.log(`Error inside play helper method ${error.message}`);
    }
};

// Pause Audio..
const pause = async (playbackObj) => {
    try {
        const status = await playbackObj.setStatusAsync({ shouldPlay: false });
        return status;

    } catch (error){
        console.log(`Error inside pause helper method ${error.message}`);
    }
};

// Resume Audio..
const resume = async (playbackObj) => {
    try {
        const status = await playbackObj.playAsync();
        return status;

    } catch (error){
        console.log(`Error inside resume helper method ${error.message}`);
    }
};

// Play Another Audio..
const playNext = async (playbackObj, uri) => {
    try {
        await playbackObj.stopAsync();
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri);

    } catch (error){
        console.log(`Error inside playNext helper method ${error.message}`);
    }
};

export {
    play,
    pause,
    resume,
    playNext
};
