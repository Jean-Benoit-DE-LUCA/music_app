const add_music_playlist = {

    init: function() {

        add_music_playlist.eventClickAddToPlaylist();
    },

    eventClickAddToPlaylist: function() {

        const addButton = (document.getElementsByClassName('form--add--music--playlist--submit--button')[0] as HTMLButtonElement);

        if (addButton !== undefined) {

            addButton.addEventListener('click', add_music_playlist.handleEventClickAddToPlaylist);
        }
    },

    handleEventClickAddToPlaylist: async function(e: Event) {

        e.preventDefault();
        
        const inputTitleHidden = (document.getElementsByClassName('hidden--music--generate--title')[0] as HTMLInputElement);
        const inputUrlHidden = (document.getElementsByClassName('hidden--music--generate--url')[0] as HTMLInputElement);
        const inputVideoIdHidden = (document.getElementsByClassName('hidden--music--generate--video--id')[0] as HTMLInputElement);
        const selectPlaylistId = (document.getElementsByClassName('form--add--music--playlist--select')[0] as HTMLSelectElement);
        const jwt = (document.getElementsByClassName('hidden--jwt')[0] as HTMLInputElement);

        const response = await fetch('http://localhost:8000/api/music/addmusicplaylist', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN' : jwt.value
            },
            body: JSON.stringify({
                music_name: inputTitleHidden.value,
                music_link: inputUrlHidden.value,
                music_video_id: inputVideoIdHidden.value,
                playlist_id: selectPlaylistId.value
            })
        });

        const responseData = await response.json();

        const divError = (document.getElementsByClassName('error--div')[0] as HTMLDivElement);
        const spanError = (divError.getElementsByClassName('error--div--span')[0] as HTMLSpanElement);

        if (responseData.hasOwnProperty('success')) {

            divError.classList.add('active');
            spanError.textContent = responseData.success;

            setTimeout(() => {

                divError.classList.remove('active');
                spanError.textContent = '';
            }, 2500);
        }

        if (responseData.hasOwnProperty('error')) {

            divError.classList.add('active_error');
            spanError.textContent = responseData.error;

            setTimeout(() => {

                divError.classList.remove('active_error');
                spanError.textContent = '';
            }, 2500);
        }
    }
};

window.addEventListener('DOMContentLoaded', add_music_playlist.init);