import {songsList} from "../data/songs.js";
import PlayInfo from "./play-info.js";
import TrackBar from "./track-bar.js";

const Playlist = (() => {

    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);


    const playlistElement = document.querySelector((".playlist"));
    
    function init() {
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })

    }
    

    function toggleIcon (index) {
        if(index === currentlyPlayingIndex) {
            if(currentSong.paused) {
                return "fa-play";
            } else {
                return "fa-pause";
            }
        } else {
            return "fa-play";
        }
    }


    function playNext() {
        if(songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++;
            currentSong.src = songs[currentlyPlayingIndex].url;
            currentSong.play();
            toggleIcon();
            render();
            PlayInfo.setState({
                songsLength: songs.length,
                isPlaying: !currentSong.paused,
                image: songs[currentlyPlayingIndex].cover
            })
        }
    }

    const listeners = () => {

        playlistElement.addEventListener("click", (event) => {
            if(event.target && event.target.matches(".fa")){
                const song = event.target.closest('.playlist__song');
                const index = [...playlistElement.children].indexOf(song);
                handlePlayPauseClick(index);
                render();
            };
        });

        currentSong.addEventListener("ended", () => {
            playNext();
        })

        currentSong.addEventListener("timeupdate", () => {
            TrackBar.setState(currentSong);
        })


    }

    function handlePlayPauseClick(index = currentlyPlayingIndex) {

        if(index ===  currentlyPlayingIndex){
            if(currentSong.paused){
                currentSong.play();
            } else {
                currentSong.pause();
            }
        } else {
            currentlyPlayingIndex = index;
            currentSong.src = songs[currentlyPlayingIndex].url;
            currentSong.play();
        }

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused,
            image: songs[currentlyPlayingIndex].cover
        })

        render();
    }


    const render = () => {
        const markup = songs.map((song, index) => {
            const {id, url, time, title, artist} = song;
            return `
          <li class="playlist__song ${index === currentlyPlayingIndex ? "playlist__song--active" : ""}">
            <div class="play-pause">
                <i class="fa ${toggleIcon(index)} pp-icon"></i>
            </div>
            <div class="playlist__song-details">
                <span class="playlist__song-name">${title}</span>
                <br>
                    <span class="playlist__song-artist">${artist}</span>
            </div>
            <div class="playlist__song-duration">${time}</div>
        </li>
         `})

        playlistElement.innerHTML = markup.join("");


    }

    function getInitialCover(){
        return songs[0].cover;
    }

    return {
        init,
        handlePlayPauseClick,
        getInitialCover
    }

})();

export default Playlist;