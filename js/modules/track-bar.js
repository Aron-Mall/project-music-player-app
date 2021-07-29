const TrackBar = (() => {

    const state = {
        currentTime: 0,
        totalTime: 2,
        fillWidth: 0
    }

    const trackbarFillElement = document.querySelector('.track-bar__fill')


    function init() {
        render()
    }

    const render = () => {
        trackbarFillElement.style.width = `${state.fillWidth}%`;
    }

    const setState = (audioObj) => {
        state.currentTime = audioObj.currentTime;
        state.totalTime = audioObj.duration;
        state.fillWidth = (audioObj.currentTime / audioObj.duration) * 100
        render();
    }


    return {
        init,
        setState
    }
})()

export default TrackBar;