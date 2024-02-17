const search_music = {

    init: function() {

        //search_music.eventSearchButton();
        search_music.eventClickPlayButton();
    },

    eventSearchButton: function() {

        const searchMusicButton = (document.getElementById('search_music_form_submit_search') as HTMLButtonElement);

        searchMusicButton.addEventListener("click", search_music.handleEventSearchButton);
    },

    handleEventSearchButton: function(e: Event) {

        e.preventDefault();
        console.log(e.currentTarget);
    },

    eventClickPlayButton: function() {

        const playDiv = (document.getElementsByClassName('div--iframe--wrap--wrap--wrap--play--button')[0] as HTMLDivElement);

        if (playDiv !== undefined) {

            playDiv.addEventListener('click', search_music.handleEventClickPlayButton);
        }
    },

    handleEventClickPlayButton: function(e: Event) {

        const divWrapWrap = (document.getElementsByClassName('div--iframe--wrap--wrap')[0] as HTMLDivElement);
        divWrapWrap.classList.add('active');
        
        const player = (document.getElementsByClassName('iframe--music--player')[0] as HTMLIFrameElement);

        if (!player.src.includes('&autoplay=1')) {

            player.src += '&autoplay=1';
        }

        const imgPlay = (document.getElementsByClassName('div--iframe--wrap--wrap--wrap--play--button--img')[0] as HTMLImageElement);

        if (imgPlay.classList.contains('active')) {

            imgPlay.classList.remove('active');
            imgPlay.src = '/assets/pictures/play-img.svg';
        }
        else if (!imgPlay.classList.contains('active')) {

            imgPlay.classList.add('active');
            imgPlay.src = '/assets/pictures/pause-img.svg';
        }

        if (imgPlay.src.includes('/assets/pictures/pause-img.svg')) {

            player.contentWindow?.postMessage('{"event": "command", "func": "' + 'playVideo' + '", "args": ""}', '*');
        }

        else if (imgPlay.src.includes('/assets/pictures/play-img.svg')) {

            player.contentWindow?.postMessage('{"event": "command", "func": "' + 'pauseVideo' + '", "args": ""}', '*');
        }

    }
}

window.addEventListener("DOMContentLoaded", search_music.init);
