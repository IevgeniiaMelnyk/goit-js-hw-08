import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const player = new Player('vimeo-player');

const VP_CURRENT_TIME = "videoplayer-current-time"

player.on('timeupdate', throttle(timeUpdate, 1000));

function timeUpdate(timeupdate) {
    const currenTime = JSON.stringify(timeupdate.seconds);
    localStorage.setItem(VP_CURRENT_TIME, currenTime);
};

const time = localStorage.getItem(VP_CURRENT_TIME);

player.setCurrentTime(time);