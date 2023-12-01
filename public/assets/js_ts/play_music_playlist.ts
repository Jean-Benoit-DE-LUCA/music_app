const play_music_playlist = {

    init: function () {

        play_music_playlist.eventClickPlayButton();
        play_music_playlist.observeClassChangeImg();
    },

    observeClassChangeImg: function() {

        let observer = new MutationObserver((mutations) => {

            mutations.forEach((mutation) => {

                if (mutation.type == 'attributes' && mutation.attributeName == 'class') {

                    if ((mutation.target as HTMLImageElement).classList.contains('active')) {

                        mutation.target.parentElement?.classList.add('active');
                    }

                    else if (!(mutation.target as HTMLImageElement).classList.contains('active')) {

                        mutation.target.parentElement?.classList.remove('active');
                    }
                }
            });
        });

        const imgElements = (document.getElementsByClassName('playlist--list--song--img--play') as HTMLCollectionOf<HTMLImageElement>);

        for (let i = 0; i < imgElements.length; i++) {

            observer.observe(imgElements[i], {attributes: true});
        }
    },

    eventClickPlayButton: function() {

        const playButtons = (document.getElementsByClassName('playlist--list--song--img--play') as HTMLCollectionOf<HTMLImageElement>);

        for (let i = 0; i < playButtons.length; i++) {

            playButtons[i].addEventListener('click', play_music_playlist.handleEventClickPlayButton);
        }
    },

    handleEventClickPlayButton: function(e: Event) {

        let playerYtId = document.getElementById('playerYt') as HTMLIFrameElement;

        e.preventDefault();
        
        const imgElem = e.currentTarget as HTMLImageElement;

        const playButtons = (document.getElementsByClassName('playlist--list--song--img--play') as HTMLCollectionOf<HTMLImageElement>);

        for (let i = 0; i < playButtons.length; i++) {

            if (playButtons[i] !== imgElem) {

                playButtons[i].classList.remove('active');
                playButtons[i].src = '/assets/pictures/play-img.svg';
            }
        }

        imgElem.classList.toggle('active');

        const videoId = (imgElem.parentElement?.getElementsByClassName('input--music--video--id--hidden')[0] as HTMLInputElement);

        if (!playerYtId.src.includes(videoId.value)) {

            playerYtId.src = `https://www.youtube.com/embed/${videoId.value}?enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8000&widgetid=1`;

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
    var firstScriptTag = document.getElementsByTagName('script')[0] as HTMLScriptElement;
    (firstScriptTag.parentNode as HTMLScriptElement).insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    var playerYt: any;
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

    let intervalCheckEnd = setInterval(() => {

        const playerLoader = (document.getElementsByClassName('player--init--loader')[0] as HTMLDivElement);
        const spanPlayerLoader = (document.getElementsByClassName('player--init--loader--span')[0] as HTMLSpanElement);

        try {

            if (playerLoader.classList.contains('active')) {

                playerLoader.classList.remove('active');

                spanPlayerLoader.textContent = 'Music player ready!';
                playerLoader.classList.add('success');
            }

            setTimeout(() => {
                playerLoader.classList.remove('active');
                playerLoader.classList.remove('success');
            }, 2500);

            if (playerYt.getPlayerState() == 0) {

                const inputsHiddenVideoId = (document.getElementsByClassName('input--music--video--id--hidden') as HTMLCollectionOf<HTMLInputElement>);

                const imgElements = (document.getElementsByClassName('playlist--list--song--img--play') as HTMLCollectionOf<HTMLImageElement>);

                let newArr: Array<string> = [];

                for (let i = 0; i < inputsHiddenVideoId.length; i++) {

                    newArr.push(inputsHiddenVideoId[i].value);
                }


                for (let i = 0; i < newArr.length; i++) {
                    
                    if (newArr[i] == playerYt.getVideoData()['video_id']) {

                        if (newArr[i+1] == undefined) {

                            for (let i = 0; i < imgElements.length; i++) {
                                
                                imgElements[i].classList.remove('active');
                                imgElements[i].src = '/assets/pictures/play-img.svg';
                            }

                            playerYt.loadVideoById(newArr[0]);
                            stopVideo();

                            break;
                        }
                    
                        // LOAD NEXT VIDEO ID //

                        else {

                            playerYt.loadVideoById(newArr[i+1]);
                            setTimeout(() => {
                                playerYt.playVideo();

                                for (let ind = 0; ind < inputsHiddenVideoId.length; ind++) {

                                    if (inputsHiddenVideoId[ind].value == newArr[i+1]) {
                                        
                                        const imgElemFound = (inputsHiddenVideoId[ind].parentElement?.getElementsByClassName('playlist--list--song--img--play')[0] as HTMLImageElement);

                                        imgElemFound.parentElement?.classList.add('active');
                                        (imgElemFound as HTMLImageElement).src = '/assets/pictures/pause-img.svg';
                                    }
                                }
                            }, 500);

                            // REMOVE ACTIVE PAUSED IMG //

                            for (let ind = 0; ind < imgElements.length; ind++) {

                                if (imgElements[ind].classList.contains('active')) {

                                    imgElements[ind].classList.add('active');
                                    imgElements[ind].src = '/assets/pictures/pause-img.svg';

                                    imgElements[ind].classList.remove('active');
                                    imgElements[ind].src = '/assets/pictures/play-img.svg';
                                }
                            }
                            
                        }

                        break;
                    }
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

