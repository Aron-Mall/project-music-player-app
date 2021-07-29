import Playlist from "./playlist.js";

const PlayInfo = (() => {

    const state = {
        songsLength: 0,
        isPlaying: false,
        image : ""
    }

    const playerCountElement = document.querySelector('.player__count');
    const playButton = document.querySelector('.player__trigger');
    const imageElement = document.querySelector('.player__image');



    function init(){
        render();
        listeners();
    }



    function render() {
        playerCountElement.innerHTML = state.songsLength;
        playButton.innerHTML = state.isPlaying ? "Pause" : "Play";
        imageElement.src = state.image;
    }

    function setState(obj) {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        state.image = obj.image || Playlist.getInitialCover();
        render();
    }

    function listeners(){
        playButton.addEventListener("click", () => {
            Playlist.handlePlayPauseClick();
        })
    }


    return {
        init,
        setState
    }
})();


export default PlayInfo;