var delete_playlist = {
    init: function () {
        delete_playlist.eventClickDeleteDivElement();
    },
    deletePlaylistNumber: null,
    eventClickDeleteDivElement: function () {
        var deleteDivElements = document.getElementsByClassName('list--playlists--user--ul--li--div--img--delete');
        for (var i = 0; i < deleteDivElements.length; i++) {
            deleteDivElements[i].addEventListener('click', delete_playlist.handleEventClickDeleteDivElement);
        }
    },
    handleEventClickDeleteDivElement: function (e) {
        var _a, _b;
        delete_playlist.deletePlaylistNumber = e.currentTarget.parentElement.getAttribute('data-playlist_id');
        var playlist_id = (_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-playlist_id');
        var playlist_name = (_b = e.currentTarget.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute('data-playlist_name');
        var divError = document.getElementsByClassName('error--div error--div--edit')[0];
        var spanError = document.getElementsByClassName('error--div--span')[0];
        var divErrorConfirm = document.getElementsByClassName('confirm--box--yes--no')[0];
        spanError.innerHTML = "Are you sure to remove playlist <strong>".concat(playlist_name, "</strong>");
        divError.classList.add('active_error');
        divErrorConfirm.classList.add('active');
    },
};
window.addEventListener('DOMContentLoaded', delete_playlist.init);
