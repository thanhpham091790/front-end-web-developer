const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd  = document.querySelector('.rwd');
const fwd  = document.querySelector('.fwd');

const timerWrapper  = document.querySelector('.timer');
const timer  = document.querySelector('.timer span');
const timerBar  = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';
 
console.log(media);

play.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
media.addEventListener('timeupdate', setTime);
timerWrapper.addEventListener('click', updateTime);

let intervalRwd;
let intervalFwd;
function mediaBackward(){
    clearInterval(intervalFwd);
    fwd.classList.remove('active');
    if(rwd.classList.contains('active')){
        rwd.classList.remove('active');
        clearInterval(intervalRwd);
        media.play();
    }else{
        rwd.classList.add('active');
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}
function mediaForward(){
    clearInterval(intervalRwd);
    rwd.classList.remove('active');

    if(fwd.classList.contains('active')){
        fwd.classList.remove('active');
        clearInterval(intervalFwd);
        media.play();
    }else{
        fwd.classList.add('active');
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }

}

function windBackward(){
    if(media.currentTime <= 3){
        // rwd.classList.remove('active');
        // clearInterval(intervalRwd);
        stopMedia();
    }else{
        media.currentTime -= 3;
    }
}
function windForward(){
    if(media.currentTime >= media.duration-3){
        // fwd.classList.remove('active');
        // clearInterval(intervalFwd);
        stopMedia();
    }else{
        media.currentTime += 3;
    }
}

function setTime(){
    const hours = Math.floor(media.currentTime/360);
    const minutes = Math.floor((media.currentTime-hours*60)/60);
    const seconds = Math.floor(media.currentTime - minutes*60);

    const hourValue = hours.toString().padStart(2, '0');
    const minuteValue = minutes.toString().padStart(2, '0');
    const secondValue = seconds.toString().padStart(2, '0');

    const mediaTime = `${hourValue}:${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;

    const barLength = timerWrapper.clientWidth*(media.currentTime/media.duration);
    timerBar.style.width = `${barLength}px`;
}
function updateTime(e){
    rwd.classList.remove('acitve');
    fwd.classList.remove('active');
    clearInterval(intervalFwd);

    let timerBox = timerWrapper.getBoundingClientRect();
    media.currentTime = media.duration*(e.clientX-timerBox.x)/timerBox.width;
}


function stopMedia(){
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon','P');

    rwd.classList.remove('acitve');
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    clearInterval(intervalRwd);
}
function playPauseMedia(){
    rwd.classList.remove('acitve');
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    clearInterval(intervalRwd);

    if(media.paused){
        play.setAttribute('data-icon','u');
        media.play();
    }else{
        play.setAttribute('data-icon','P');
        media.pause();
    }
}
