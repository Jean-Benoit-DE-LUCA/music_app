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
var add_music_playlist = {
    init: function () {
        add_music_playlist.eventClickAddToPlaylist();
    },
    eventClickAddToPlaylist: function () {
        var addButton = document.getElementsByClassName('form--add--music--playlist--submit--button')[0];
        if (addButton !== undefined) {
            addButton.addEventListener('click', add_music_playlist.handleEventClickAddToPlaylist);
        }
    },
    handleEventClickAddToPlaylist: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var inputTitleHidden, inputUrlHidden, inputVideoIdHidden, selectPlaylistId, jwt, response, responseData, divError, spanError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        inputTitleHidden = document.getElementsByClassName('hidden--music--generate--title')[0];
                        inputUrlHidden = document.getElementsByClassName('hidden--music--generate--url')[0];
                        inputVideoIdHidden = document.getElementsByClassName('hidden--music--generate--video--id')[0];
                        selectPlaylistId = document.getElementsByClassName('form--add--music--playlist--select')[0];
                        jwt = document.getElementsByClassName('hidden--jwt')[0];
                        return [4 /*yield*/, fetch('http://localhost:8000/api/music/addmusicplaylist', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'X-CSRF-TOKEN': jwt.value
                                },
                                body: JSON.stringify({
                                    music_name: inputTitleHidden.value,
                                    music_link: inputUrlHidden.value,
                                    music_video_id: inputVideoIdHidden.value,
                                    playlist_id: selectPlaylistId.value
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _a.sent();
                        divError = document.getElementsByClassName('error--div')[0];
                        spanError = divError.getElementsByClassName('error--div--span')[0];
                        if (responseData.hasOwnProperty('success')) {
                            divError.classList.add('active');
                            spanError.textContent = responseData.success;
                            setTimeout(function () {
                                divError.classList.remove('active');
                                spanError.textContent = '';
                            }, 2500);
                        }
                        if (responseData.hasOwnProperty('error')) {
                            divError.classList.add('active_error');
                            spanError.textContent = responseData.error;
                            setTimeout(function () {
                                divError.classList.remove('active_error');
                                spanError.textContent = '';
                            }, 2500);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
};
window.addEventListener('DOMContentLoaded', add_music_playlist.init);
