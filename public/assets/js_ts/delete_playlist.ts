const delete_playlist = {

    init: function() {

        delete_playlist.eventClickDeleteDivElement();
    },

    deletePlaylistNumber: null,

    eventClickDeleteDivElement: function() {

        const deleteDivElements = (document.getElementsByClassName('list--playlists--user--ul--li--div--img--delete') as HTMLCollectionOf<HTMLDivElement>);

        for (let i = 0; i < deleteDivElements.length; i++) {

            deleteDivElements[i].addEventListener('click', delete_playlist.handleEventClickDeleteDivElement);
        }
    },

    handleEventClickDeleteDivElement: function(e: Event) {

        delete_playlist.deletePlaylistNumber = (e as any).currentTarget.parentElement.getAttribute('data-playlist_id');

        const playlist_id = (e.currentTarget as HTMLDivElement).parentElement?.getAttribute('data-playlist_id');
        const playlist_name = (e.currentTarget as HTMLDivElement).parentElement?.getAttribute('data-playlist_name');

        const divError = (document.getElementsByClassName('error--div error--div--edit')[0] as HTMLDivElement);
        const spanError = (document.getElementsByClassName('error--div--span')[0] as HTMLSpanElement);
        const divErrorConfirm = (document.getElementsByClassName('confirm--box--yes--no')[0] as HTMLDivElement);

        spanError.innerHTML = `Are you sure to remove playlist <strong>${playlist_name}</strong>`;

        divError.classList.add('active_error');
        divErrorConfirm.classList.add('active');
    },
};

window.addEventListener('DOMContentLoaded', delete_playlist.init);