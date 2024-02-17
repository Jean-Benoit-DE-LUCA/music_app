var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var edit_playlist = {
    init: function () {
        edit_playlist.setHeightSectionPlaylist();
        edit_playlist.eventDragDivSong();
        edit_playlist.eventDeleteSongPlaylist();
        edit_playlist.yesConfirm();
        edit_playlist.noConfirm();
    },
    idSongClicked: null,
    idSongClickedDelete: null,
    idSongClickedDeleteConfirm: null,
    protocolDomainName: 'http://localhost:8000',
    setHeightSectionPlaylist: function () {
        var oldSectionPlaylist = document.getElementsByClassName('old--playlist--order')[0];
        if (oldSectionPlaylist !== undefined) {
            var matchScreen = window.matchMedia('(min-width: 1000px)');
            matchScreen.addEventListener('change', edit_playlist.handleChangeScreenWidth);
            if (matchScreen.matches) {
                document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 4.5) + 'rem');
            }
            else {
                document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 3.5) + 'rem');
            }
        }
    },
    handleChangeScreenWidth: function (e) {
        var oldSectionPlaylist = document.getElementsByClassName('old--playlist--order')[0];
        if (e.matches) {
            document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 4.5) + 'rem');
        }
        else {
            document.documentElement.style.setProperty('--heightSection', (oldSectionPlaylist.children.length * 3.5) + 'rem');
        }
    },
    eventDragDivSong: function () {
        var songsCollection = document.getElementsByClassName('block--div--song');
        var oldSectionPlaylist = document.getElementsByClassName('old--playlist--order')[0];
        var headerNewSectionPlaylist = document.getElementById('header--new--playlist--order');
        var headingNewSectionPlaylist = document.getElementById('new--playlist--order--heading');
        var newSectionPlaylist = document.getElementsByClassName('new--playlist--order')[0];
        if (oldSectionPlaylist !== undefined) {
            oldSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            oldSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);
            headerNewSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            headerNewSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);
            headingNewSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            headingNewSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);
            newSectionPlaylist.addEventListener('drop', edit_playlist.handleEventDragDropDesktop);
            newSectionPlaylist.addEventListener('dragover', edit_playlist.handleEventDragOverDesktop);
            for (var i = 0; i < songsCollection.length; i++) {
                songsCollection[i].addEventListener('touchstart', edit_playlist.handleEventTouchStartDiv);
                songsCollection[i].addEventListener('touchmove', edit_playlist.handleEventDragDivSong);
                songsCollection[i].addEventListener('touchend', edit_playlist.handleEventDragDivSongEnd);
                songsCollection[i].addEventListener('dragstart', edit_playlist.handleEventDragDivSongDesktop);
            }
        }
    },
    handleEventTouchStartDiv: function (e) {
        edit_playlist.idSongClickedDeleteConfirm = e.currentTarget.id.replace('block--div--song--', '');
    },
    handleEventDragDivSong: function (e) {
        var oldSectionPlaylist = document.getElementsByClassName('old--playlist--order')[0];
        var newSectionPlaylist = document.getElementsByClassName('new--playlist--order')[0];
        var divSongBlock = e.currentTarget;
        divSongBlock.style.position = 'absolute';
        divSongBlock.style.left = e.targetTouches[0].pageX + 'px';
        divSongBlock.style.top = e.targetTouches[0].pageY + 'px';
    },
    handleEventDragDivSongEnd: function (e) {
        edit_playlist.idSongClicked = e.currentTarget.id;
        var oldSectionPlaylist = document.getElementsByClassName('old--playlist--order')[0];
        var headerNewSectionPlaylist = document.getElementById('header--new--playlist--order');
        var newSectionPlaylist = document.getElementsByClassName('new--playlist--order')[0];
        var divSongBlock = e.currentTarget;
        if (Number(divSongBlock.style.top.replace('px', '')) > Number(newSectionPlaylist.offsetTop) ||
            Number(divSongBlock.style.top.replace('px', '')) > Number(headerNewSectionPlaylist.offsetTop)) {
            divSongBlock.style.position = 'static';
            newSectionPlaylist.append(divSongBlock);
        }
        else if (Number(divSongBlock.style.top.replace('px', '')) < Number(headerNewSectionPlaylist.offsetTop)) {
            divSongBlock.style.position = 'static';
            oldSectionPlaylist.append(divSongBlock);
        }
    },
    handleEventDragDivSongDesktop: function (e) {
        var _a;
        (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text', e.target.id);
    },
    handleEventDragDropDesktop: function (e) {
        var _a;
        e.preventDefault();
        var data = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text');
        if (e.target.id == 'old--playlist--order' || e.target.id == 'new--playlist--order') {
            e.target.append(document.getElementById(data));
        }
        else if (e.target.id == 'header--new--playlist--order' || e.target.id == 'new--playlist--order--heading') {
            var newSectionPlaylist = document.getElementsByClassName('new--playlist--order')[0];
            newSectionPlaylist.append(document.getElementById(data));
        }
    },
    handleEventDragOverDesktop: function (e) {
        e.preventDefault();
    },
    eventDeleteSongPlaylist: function () {
        var imgCrossElements = document.getElementsByClassName('block--div--song--cross');
        for (var i = 0; i < imgCrossElements.length; i++) {
            imgCrossElements[i].addEventListener('mousedown', edit_playlist.handleEventDeleteSongPlaylist);
        }
    },
    handleEventDeleteSongPlaylist: function (e) {
        edit_playlist.idSongClickedDelete = e.currentTarget.parentElement.getElementsByClassName('hidden--song--id')[0].value;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        var flagOld = false;
        var indexChild = 0;
        var oldSectionPlaylist = document.getElementsByClassName('old--playlist--order')[0];
        for (var i = 0; i < oldSectionPlaylist.children.length; i++) {
            if (oldSectionPlaylist.children[i] == e.currentTarget.parentElement) {
                flagOld = true;
                indexChild = i;
            }
        }
        var flagNew = false;
        var indexChildNew = 0;
        var newSectionPlaylist = document.getElementsByClassName('new--playlist--order')[0];
        for (var i = 0; i < newSectionPlaylist.children.length; i++) {
            if (newSectionPlaylist.children[i] == e.currentTarget.parentElement) {
                flagNew = true;
                indexChildNew = i;
            }
        }
        var divError = document.getElementsByClassName('error--div')[0];
        var spanError = divError.getElementsByClassName('error--div--span')[0];
        var divBoxConfirm = document.getElementsByClassName('confirm--box--yes--no')[0];
        if (flagOld) {
            var elementClicked = void 0;
            try {
                elementClicked = document.getElementById(edit_playlist.idSongClicked);
                oldSectionPlaylist.insertBefore(elementClicked, oldSectionPlaylist.children[indexChild]);
                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + document.getElementsByClassName('hidden--name--playlist')[0].value + '</strong>';
                edit_playlist.idSongClicked = null;
            }
            catch (error) {
                elementClicked = document.getElementById(e.currentTarget.parentElement.id);
                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + document.getElementsByClassName('hidden--name--playlist')[0].value + '</strong>';
            }
        }
        else if (flagNew) {
            var elementClicked = void 0;
            try {
                elementClicked = document.getElementById(edit_playlist.idSongClicked);
                newSectionPlaylist.insertBefore(elementClicked, newSectionPlaylist.children[indexChildNew]);
                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + document.getElementsByClassName('hidden--name--playlist')[0].value + '</strong>';
                edit_playlist.idSongClicked = null;
            }
            catch (error) {
                elementClicked = document.getElementById(e.currentTarget.parentElement.id);
                divError.classList.add('active_error');
                divBoxConfirm.classList.add('active');
                spanError.innerHTML = 'Are you sure to remove ' + elementClicked.getElementsByClassName('block--div--song--span')[0].textContent + ' from playlist ' + '<strong>' + document.getElementsByClassName('hidden--name--playlist')[0].value + '</strong>';
            }
        }
    },
    yesConfirm: function () {
        var yesConfirmSpan = document.getElementsByClassName('yes--confirm')[0];
        if (yesConfirmSpan !== undefined) {
            yesConfirmSpan.addEventListener('click', edit_playlist.handleYesConfirm);
        }
    },
    handleYesConfirm: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, response, responseData, divError_1, spanError, divBoxConfirm, liElements, i, playlist_id, music_id, response, responseData, divError_2, spanError, divBoxConfirm, divBoxToRemove, hiddenTotalSongs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = document.getElementsByClassName('hidden--jwt')[0];
                        if (!(window.location.href.replace(edit_playlist.protocolDomainName, '') == '/music/playlist')) return [3 /*break*/, 3];
                        console.log(window.location.href.replace(edit_playlist.protocolDomainName, ''));
                        return [4 /*yield*/, fetch("/api/music/playlist/delete/".concat(delete_playlist.deletePlaylistNumber), {
                                method: 'DELETE',
                                headers: {
                                    'Content-type': 'application/json',
                                    'X-CSRF-TOKEN': jwt.value
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _a.sent();
                        divError_1 = document.getElementsByClassName('error--div')[0];
                        spanError = divError_1.getElementsByClassName('error--div--span')[0];
                        divBoxConfirm = document.getElementsByClassName('confirm--box--yes--no')[0];
                        if (responseData.hasOwnProperty('flag')) {
                            if (responseData.flag) {
                                divError_1.classList.remove('active_error');
                                divError_1.classList.add('active');
                                divBoxConfirm.classList.remove('active');
                                spanError.textContent = 'Playlist successfully removed';
                                liElements = document.getElementsByClassName('list--playlists--user--ul--li');
                                for (i = 0; i < liElements.length; i++) {
                                    if (liElements[i].getAttribute('data-playlist_id') == delete_playlist.deletePlaylistNumber) {
                                        liElements[i].remove();
                                    }
                                }
                                setTimeout(function () {
                                    divError_1.classList.remove('active');
                                }, 1500);
                            }
                            else if (!responseData.flag) {
                                divBoxConfirm.classList.remove('active');
                                spanError.textContent = 'Authentication error, please sign in again';
                                setTimeout(function () {
                                    divError_1.classList.remove('active_error');
                                }, 1500);
                            }
                        }
                        return [3 /*break*/, 6];
                    case 3:
                        playlist_id = document.getElementsByClassName('hidden--id--playlist')[0];
                        music_id = edit_playlist.idSongClickedDeleteConfirm;
                        return [4 /*yield*/, fetch("/api/music/playlist/".concat(playlist_id.value, "/delete/").concat(music_id), {
                                method: 'DELETE',
                                headers: {
                                    'Content-type': 'application/json',
                                    'X-CSRF-TOKEN': jwt.value
                                }
                            })];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 5:
                        responseData = _a.sent();
                        divError_2 = document.getElementsByClassName('error--div')[0];
                        spanError = divError_2.getElementsByClassName('error--div--span')[0];
                        if (responseData.hasOwnProperty('flag')) {
                            if (responseData.flag) {
                                divBoxConfirm = document.getElementsByClassName('confirm--box--yes--no')[0];
                                divError_2.classList.remove('active_error');
                                divError_2.classList.add('active');
                                divBoxConfirm.classList.remove('active');
                                spanError.textContent = 'Song successfully removed from playlist';
                                divBoxToRemove = (document.getElementById("block--div--song--".concat(music_id)));
                                divBoxToRemove === null || divBoxToRemove === void 0 ? void 0 : divBoxToRemove.remove();
                                setTimeout(function () {
                                    divError_2.classList.remove('active');
                                }, 1500);
                                hiddenTotalSongs = document.getElementsByClassName('hidden--total--song')[0];
                                hiddenTotalSongs.value = (Number(hiddenTotalSongs.value) - 1).toString();
                            }
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    noConfirm: function () {
        var noConfirmSpan = document.getElementsByClassName('no--confirm')[0];
        if (noConfirmSpan !== undefined) {
            noConfirmSpan.addEventListener('click', edit_playlist.handleNoConfirm);
        }
    },
    handleNoConfirm: function (e) {
        e.currentTarget.parentElement.parentElement.classList.remove('active_error');
    }
};
window.addEventListener('DOMContentLoaded', edit_playlist.init);
