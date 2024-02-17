var play_music_playlist = {
    init: function () {
        play_music_playlist.eventClickPlayButton();
        play_music_playlist.observeClassChangeImg();
    },
    observeClassChangeImg: function () {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var _a, _b;
                if (mutation.type == 'attributes' && mutation.attributeName == 'class') {
                    if (mutation.target.classList.contains('active')) {
                        (_a = mutation.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('active');
                    }
                    else if (!mutation.target.classList.contains('active')) {
                        (_b = mutation.target.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('active');
                    }
                }
            });
        });
        var imgElements = document.getElementsByClassName('playlist--list--song--img--play');
        for (var i = 0; i < imgElements.length; i++) {
            observer.observe(imgElements[i], { attributes: true });
        }
    },
    eventClickPlayButton: function () {
        var playButtons = document.getElementsByClassName('playlist--list--song--img--play');
        for (var i = 0; i < playButtons.length; i++) {
            playButtons[i].addEventListener('click', play_music_playlist.handleEventClickPlayButton);
        }
    },
    handleEventClickPlayButton: function (e) {
        var _a;
        var playerYtId = document.getElementById('playerYt');
        e.preventDefault();
        var imgElem = e.currentTarget;
        var playButtons = document.getElementsByClassName('playlist--list--song--img--play');
        for (var i = 0; i < playButtons.length; i++) {
            if (playButtons[i] !== imgElem) {
                playButtons[i].classList.remove('active');
                playButtons[i].src = '/assets/pictures/play-img.svg';
            }
        }
        imgElem.classList.toggle('active');
        var videoId = (_a = imgElem.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('input--music--video--id--hidden')[0];
        if (!playerYtId.src.includes(videoId.value)) {
            playerYtId.src = "https://www.youtube.com/embed/".concat(videoId.value, "?enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8000&widgetid=1");
            playerYt.loadVideoById(videoId.value);
        }
        if (imgElem.classList.contains('active')) {
            imgElem.src = '/assets/pictures/pause-img.svg';
            playerYt.playVideo();
        }
        else if (!imgElem.classList.contains('active')) {
            imgElem.src = '/assets/pictures/play-img.svg';
            playerYt.pauseVideo();
        }
    }
};
// YOUTUBE API //
if (window.location.pathname.match(/^\/music\/playlist\/[0-9]+/)) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var playerYt;
    function onYouTubeIframeAPIReady() {
        playerYt = new YT.Player('playerYt', {
            height: '0',
            width: '0',
            videoId: '',
            events: {
                'onReady': onPlayerReady,
                //'onStateChange': onPlayerStateChange
            }
        });
    }
    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }
    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    function onPlayerStateChange(event) {
        console.log(event);
    }
    function stopVideo() {
        playerYt.stopVideo();
    }
    var intervalCheckEnd = setInterval(function () {
        var playerLoader = document.getElementsByClassName('player--init--loader')[0];
        var spanPlayerLoader = document.getElementsByClassName('player--init--loader--span')[0];
        try {
            if (playerLoader.classList.contains('active')) {
                playerLoader.classList.remove('active');
                spanPlayerLoader.textContent = 'Music player ready!';
                playerLoader.classList.add('success');
            }
            setTimeout(function () {
                playerLoader.classList.remove('active');
                playerLoader.classList.remove('success');
            }, 2500);
            if (playerYt.getPlayerState() == 0) {
                var inputsHiddenVideoId_1 = document.getElementsByClassName('input--music--video--id--hidden');
                var imgElements = document.getElementsByClassName('playlist--list--song--img--play');
                var newArr_1 = [];
                for (var i = 0; i < inputsHiddenVideoId_1.length; i++) {
                    newArr_1.push(inputsHiddenVideoId_1[i].value);
                }
                var _loop_1 = function (i) {
                    if (newArr_1[i] == playerYt.getVideoData()['video_id']) {
                        if (newArr_1[i + 1] == undefined) {
                            for (var i_1 = 0; i_1 < imgElements.length; i_1++) {
                                imgElements[i_1].classList.remove('active');
                                imgElements[i_1].src = '/assets/pictures/play-img.svg';
                            }
                            playerYt.loadVideoById(newArr_1[0]);
                            stopVideo();
                            return "break";
                        }
                        // LOAD NEXT VIDEO ID //
                        else {
                            playerYt.loadVideoById(newArr_1[i + 1]);
                            setTimeout(function () {
                                var _a, _b;
                                playerYt.playVideo();
                                for (var ind = 0; ind < inputsHiddenVideoId_1.length; ind++) {
                                    if (inputsHiddenVideoId_1[ind].value == newArr_1[i + 1]) {
                                        var imgElemFound = (_a = inputsHiddenVideoId_1[ind].parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('playlist--list--song--img--play')[0];
                                        (_b = imgElemFound.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('active');
                                        imgElemFound.src = '/assets/pictures/pause-img.svg';
                                    }
                                }
                            }, 500);
                            // REMOVE ACTIVE PAUSED IMG //
                            for (var ind = 0; ind < imgElements.length; ind++) {
                                if (imgElements[ind].classList.contains('active')) {
                                    imgElements[ind].classList.add('active');
                                    imgElements[ind].src = '/assets/pictures/pause-img.svg';
                                    imgElements[ind].classList.remove('active');
                                    imgElements[ind].src = '/assets/pictures/play-img.svg';
                                }
                            }
                        }
                        return "break";
                    }
                };
                for (var i = 0; i < newArr_1.length; i++) {
                    var state_1 = _loop_1(i);
                    if (state_1 === "break")
                        break;
                }
            }
        }
        catch (error) {
            if (!playerLoader.classList.contains('active')) {
                playerLoader.classList.add('active');
            }
        }
    }, 1000);
}
//
window.addEventListener('DOMContentLoaded', play_music_playlist.init);
