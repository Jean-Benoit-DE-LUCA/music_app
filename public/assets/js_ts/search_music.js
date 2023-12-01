var search_music = {
    init: function () {
        //search_music.eventSearchButton();
        search_music.eventClickPlayButton();
    },
    eventSearchButton: function () {
        var searchMusicButton = document.getElementById('search_music_form_submit_search');
        searchMusicButton.addEventListener("click", search_music.handleEventSearchButton);
    },
    handleEventSearchButton: function (e) {
        e.preventDefault();
        console.log(e.currentTarget);
    },
    eventClickPlayButton: function () {
        var playDiv = document.getElementsByClassName('div--iframe--wrap--wrap--wrap--play--button')[0];
        if (playDiv !== undefined) {
            playDiv.addEventListener('click', search_music.handleEventClickPlayButton);
        }
    },
    handleEventClickPlayButton: function (e) {
        var _a, _b;
        var divWrapWrap = document.getElementsByClassName('div--iframe--wrap--wrap')[0];
        divWrapWrap.classList.add('active');
        var player = document.getElementsByClassName('iframe--music--player')[0];
        if (!player.src.includes('&autoplay=1')) {
            player.src += '&autoplay=1';
        }
        var imgPlay = document.getElementsByClassName('div--iframe--wrap--wrap--wrap--play--button--img')[0];
        if (imgPlay.classList.contains('active')) {
            imgPlay.classList.remove('active');
            imgPlay.src = '/assets/pictures/play-img.svg';
        }
        else if (!imgPlay.classList.contains('active')) {
            imgPlay.classList.add('active');
            imgPlay.src = '/assets/pictures/pause-img.svg';
        }
        if (imgPlay.src.includes('/assets/pictures/pause-img.svg')) {
            (_a = player.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage('{"event": "command", "func": "' + 'playVideo' + '", "args": ""}', '*');
        }
        else if (imgPlay.src.includes('/assets/pictures/play-img.svg')) {
            (_b = player.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage('{"event": "command", "func": "' + 'pauseVideo' + '", "args": ""}', '*');
        }
    }
};
window.addEventListener("DOMContentLoaded", search_music.init);
